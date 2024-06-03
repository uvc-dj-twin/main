const fs = require('fs');
const { parse } = require('csv-parse');
const { InfluxDB, Point } = require('@influxdata/influxdb-client');

// InfluxDB 설정
const influxUrl = `http://${process.env.INFLUXDB_HOST}:${process.env.INFLUXDB_PORT}`;
const influx = new InfluxDB({ url: influxUrl, token: process.env.INFLUXDB_TOKEN });
const writeApi = influx.getWriteApi('test', 'test', 'us'); // Precision를 마이크로초로 설정
const queryApi = influx.getQueryApi('test');

// csv 파일 읽기
const readCSV = async (filePath) => {
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
const saveDB = (csvData) => {
  try {
    // 현재 시간 설정
    const baseTime = new Date();
    baseTime.setMilliseconds(0);

    csvData.data.forEach((entry, index) => {
      const timestamp = baseTime.getTime() * 1000 + index * 500
      const point = new Point('current')
        .tag('machine', csvData.machine)
        .intField('rpm', csvData.rpm)
        .floatField('watt', csvData.watt)
        .intField('rate', csvData.rate)
        .floatField('x', entry[0])
        .floatField('y', entry[1])
        .floatField('z', entry[2])
        .timestamp(timestamp);

      writeApi.writePoint(point);
    });

    writeApi.close().then(() => {
      console.log('Data saved to InfluxDB.');
    }).catch((e) => {
      console.error(e);
      console.log('Error saving data to InfluxDB.');
    });
  } catch (err) {
    console.error('DB 저장 중 오류 발생:', err);
  }
}

// csv 읽고 influx에 저장
const readCSVAndSaveDB = async () => {
  const csvData = await readCSV('./csv/modified_data.csv')
  console.log(csvData);
  saveDB(csvData)
}

const scheduler = {
  machineDataJob() {
    readCSVAndSaveDB();
  }
}

module.exports = scheduler;