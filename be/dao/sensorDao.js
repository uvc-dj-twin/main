const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const influxUrl = `http://${process.env.INFLUXDB_HOST}:${process.env.INFLUXDB_PORT}`;
const influx = new InfluxDB({ url: influxUrl, token: process.env.INFLUXDB_TOKEN });
const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);

const dao = {
  countTodayPredict(params) {
    return new Promise((resolve, reject) => {
      // 조회 시간 설정
      const now = new Date();
      const startKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC를 KST로 변환
      startKST.setUTCHours(0, 0, 0, 0);
      const start = startKST.toISOString();
      const endKST = new Date(startKST);
      endKST.setUTCHours(23, 59, 59, 999);
      const end = endKST.toISOString();

      const fluxQuery = `
        from(bucket: "test")
          |> range(start: ${start}, stop: ${end})
          |> filter(fn: (r) => r._measurement == "${params.measurement}")
          |> filter(fn: (r) => r.serial_no == "${params.serialNo}")
          |> count()
      `;

      let nextCalled = false;
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          nextCalled = true;
          resolve(o._value);
        },
        error(err) {
          console.error(`Error running InfluxDB query: ${err.message}`);
          throw err;
        },
        complete() {
          console.log('Query completed');
          if (!nextCalled) {
            reject(new Error('Query failed'))
          }
        }
      });
    });
  },

  countTodayFailPredict(params) {
    return new Promise((resolve, reject) => {
      // 조회 시간 설정
      const now = new Date();
      const startKST = new Date(now.getTime() + 9 * 60 * 60 * 1000); // UTC를 KST로 변환
      startKST.setUTCHours(0, 0, 0, 0);
      const start = startKST.toISOString();
      const endKST = new Date(startKST);
      endKST.setUTCHours(23, 59, 59, 999);
      const end = endKST.toISOString();

      const fluxQuery = `
        from(bucket: "test")
          |> range(start: ${start}, stop: ${end})
          |> filter(fn: (r) => r._measurement == "${params.measurement}")
          |> filter(fn: (r) => r._field == "code")
          |> filter(fn: (r) => r.serial_no == "${params.serialNo}" and r._value != 0)
          |> count()
      `;

      let nextCalled = false;
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          nextCalled = true;
          resolve(o._value);
        },
        error(err) {
          console.error(`Error running InfluxDB query: ${err.message}`);
          throw err;
        },
        complete() {
          console.log('Query completed');
          if (!nextCalled) {
            reject(new Error('Query failed'))
          }
        }
      });
      
    });
  },
}

module.exports = dao;
