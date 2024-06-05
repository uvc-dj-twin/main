const fs = require('fs');
const { parse } = require('csv-parse');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const path = require('path');
const { PythonShell } = require('python-shell');
const groupService = require('../service/groupService');

// InfluxDB 설정
const influxUrl = `http://${process.env.INFLUXDB_HOST}:${process.env.INFLUXDB_PORT}`;
const influx = new InfluxDB({ url: influxUrl, token: process.env.INFLUXDB_TOKEN });
const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);

// csv 파일 읽기
const readCSV = async (filePath, baseTime) => {
  try {
    const csv = fs.readFileSync(filePath, 'utf8');
    const rows = await new Promise((resolve, reject) => {
      parse(csv, { trim: true, skip_empty_lines: true, relax_column_count: true }, (err, output) => {
        if (err) {
          return reject(err);
        }
        resolve(output);
      });
    });

    // 각 행에서 마지막 항목이 빈 문자열인 경우 제거
    const cleanedRows = rows.map(row => {
      if (row[row.length - 1] === '') {
        row.pop();
      }
      return row;
    });

    const header = cleanedRows.slice(0, 4);
    const data = cleanedRows.slice(4);

    const csvData = {
      machine: header[1][1],
      rpm: parseInt(header[1][2]),
      watt: parseFloat(header[1][3]),
      rate: parseInt(header[2][1]),
      data: data.map(row => row.map(parseFloat))
    };

    return csvData;
  } catch (err) {
    console.error('파일 처리 중 오류 발생:', err);
    return null;
  }
};

// influx에 저장
const saveDB = async (csvData, baseTime, type) => {
  const writeApi = influx.getWriteApi('test', 'test', 'us'); // Precision를 마이크로초로 설정
  try {
    const startTime = baseTime.getTime() * 1000;
    const endTime = baseTime.getTime() + (csvData.data.length - 1) * 500;
    let writePoints;
    if (type === 'currents') {
      writePoints = csvData.data.map((entry, index) => {
        const timestamp = baseTime.getTime() * 1000 + index * 500;
        const point = new Point('currents')
          .tag('serial_no', csvData.machine)
          .intField('rpm', csvData.rpm)
          .floatField('watt', csvData.watt)
          .intField('rate', csvData.rate)
          .floatField('x', entry[0])
          .floatField('y', entry[1])
          .floatField('z', entry[2])
          .timestamp(timestamp);

        return writeApi.writePoint(point);
      });
    } else if (type === 'vibrations') {
      writePoints = csvData.data.map((entry, index) => {
        const timestamp = baseTime.getTime() * 1000 + index * 250;
        const point = new Point('vibrations')
          .tag('serial_no', csvData.machine)
          .intField('rpm', csvData.rpm)
          .floatField('watt', csvData.watt)
          .intField('rate', csvData.rate)
          .floatField('x', entry[0])
          .timestamp(timestamp);

        return writeApi.writePoint(point);
      });
    }

    await Promise.all(writePoints);
    await writeApi.close();

    return {
      startTime: startTime,
      endTime: endTime,
      ...csvData
    };
  } catch (err) {
    console.error('DB 저장 중 오류 발생:', err);
  }
}

const predict = async (data, csvPath, type) => {
  let pklPath, predictPath, normPath, _measurement;
  if (type === 'currents') {
    pklPath = path.resolve(__dirname, '../python/current_xgb.pkl');
    predictPath = path.resolve(__dirname, '../python/current_predict.py');
    normPath = '';
    _measurement = 'current_predictions';
  } else if (type === 'vibrations') {
    pklPath = path.resolve(__dirname, '../python/vibration_xgb.pkl');
    predictPath = path.resolve(__dirname, '../python/vibration_predict.py');
    normPath = path.resolve(__dirname, '../python/vibration_norm.npy')
    _measurement = 'vibration_predictions';
  }
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], // get print results in real-time
    args: [path.resolve(__dirname, csvPath), '1730', '2000', '2.2', pklPath, normPath]
  };
  try {
    const result = await PythonShell.run(predictPath, options);
    const code = parseInt(result[0]);
    const writeApi = influx.getWriteApi('test', 'test', 'us'); // Precision를 마이크로초로 설정
    const point = new Point(_measurement)
      .tag('serial_no', data.machine)
      .tag('end_time', data.end_time)
      .intField('code', code)
      .timestamp(data.startTime);
    await writeApi.writePoint(point);
    await writeApi.close();
    return code;
  } catch (err) {
    console.error(err);
  }
}

const sendSocekt = async (io, type, data, result) => {
  const groups = await groupService.selectBySerialNo({ serialNo: data.machine })
  let groupIds = [];
  for (const group of groups) {
    groupIds.push(group.id);
  }
  io.to(groupIds).emit(type, { predict: result })
}

// csv 읽고 influx에 저장
const readCSVAndSaveDB = async (csvPath, type, io) => {
  // 현재 시간
  const baseTime = new Date();
  baseTime.setMilliseconds(0);

  // csv 파일 읽기
  const csvData = await readCSV(csvPath)

  // 데이터 DB에 저장
  const data = await saveDB(csvData, baseTime, type)

  // 장비 상태 예측 후 예측 결과 저장
  const result = await predict(data, csvPath, type);

  // socket
  if (io) {
    sendSocekt(io, type, csvData, result);
  }

  console.log(`${type} predict : ${result}`)
}

let curIdx = 0;
let vibIdx = 0;
const curLength = 200;
const vibLength = 200;

const currentDir = path.resolve(__dirname, '../csv/current');
const vibrationDir = path.resolve(__dirname, '../csv/vibration');

const scheduler = {
  machineDataJob() {
    const io = require('../app').get('io');

    const currentFolers = fs.readdirSync(currentDir);
    const vibrationFolders = fs.readdirSync(vibrationDir);
    currentFolers.forEach((file) => {
      const currentFile = path.resolve(currentDir, file, `current${curIdx}.csv`)
      readCSVAndSaveDB(currentFile, 'currents', io);
    });
    vibrationFolders.forEach((file) => {
      const vibrationFile = path.resolve(vibrationDir, file, `vibration${vibIdx}.csv`)
      readCSVAndSaveDB(vibrationFile, 'vibrations', io);
    });
    curIdx++; vibIdx++;
    curIdx = curIdx >= curLength ? 0 : curIdx;
    vibIdx = vibIdx >= vibLength ? 0 : vibIdx;
  }
}

module.exports = scheduler;