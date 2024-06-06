const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const influxUrl = `http://${process.env.INFLUXDB_HOST}:${process.env.INFLUXDB_PORT}`;
const influx = new InfluxDB({ url: influxUrl, token: process.env.INFLUXDB_TOKEN });
const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);

const dao = {
  countTodayPredict(params) {
    return new Promise((resolve, reject) => {
      // 조회 시간 설정
      const now = new Date();
      const kstOffset = 9 * 60 * 60 * 1000; // KST (UTC+9)

      // 한국 시간으로 오늘의 시작 시간 (00:00:00 KST)
      const startKST = new Date(now);
      startKST.setUTCHours(0, 0, 0, 0);
      const startUTC = new Date(startKST.getTime() - kstOffset);

      // 한국 시간으로 오늘의 끝 시간 (23:59:59.999 KST)
      const endKST = new Date(now);
      endKST.setUTCHours(23, 59, 59, 999);
      const endUTC = new Date(endKST.getTime() - kstOffset);

      const start = startUTC.toISOString();
      const end = endUTC.toISOString();

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
          reject(err);
        },
        complete() {
          console.log('Query completed');
          if (!nextCalled) {
            resolve(0);
          }
        }
      });
    });
  },

  countTodayFailPredict(params) {
    console.log(params);
    return new Promise((resolve, reject) => {
      // 조회 시간 설정
      const now = new Date();
      const kstOffset = 9 * 60 * 60 * 1000; // KST (UTC+9)

      // 한국 시간으로 오늘의 시작 시간 (00:00:00 KST)
      const startKST = new Date(now);
      startKST.setUTCHours(0, 0, 0, 0);
      const startUTC = new Date(startKST.getTime() - kstOffset);

      // 한국 시간으로 오늘의 끝 시간 (23:59:59.999 KST)
      const endKST = new Date(now);
      endKST.setUTCHours(23, 59, 59, 999);
      const endUTC = new Date(endKST.getTime() - kstOffset);

      const start = startUTC.toISOString();
      const end = endUTC.toISOString();

      const fluxQuery = `
        from(bucket: "test")
          |> range(start: ${start}, stop: ${end})
          |> filter(fn: (r) => r._measurement == "${params.measurement}")
          |> filter(fn: (r) => r.serial_no == "${params.serialNo}")
          |> filter(fn: (r) => r._field == "code")
          |> filter(fn: (r) => r._value != 0)
          |> count()
      `;

      let nextCalled = false;
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          console.log(o);
          nextCalled = true;
          resolve(o._value);
        },
        error(err) {
          console.error(`Error running InfluxDB query: ${err.message}`);
          reject(err);
        },
        complete() {
          console.log('Query completed');
          if (!nextCalled) {
            resolve(0);
          }
        }
      });

    });
  },

  lastPredict(params) {
    return new Promise((resolve, reject) => {
      // 조회 시간 설정
      const now = new Date();
      const kstOffset = 9 * 60 * 60 * 1000; // KST (UTC+9)

      // 한국 시간으로 오늘의 시작 시간 (00:00:00 KST)
      const startKST = new Date(now);
      startKST.setUTCHours(0, 0, 0, 0);
      const startUTC = new Date(startKST.getTime() - kstOffset);

      // 한국 시간으로 오늘의 끝 시간 (23:59:59.999 KST)
      const endKST = new Date(now);
      endKST.setUTCHours(23, 59, 59, 999);
      const endUTC = new Date(endKST.getTime() - kstOffset);

      const start = startUTC.toISOString();
      const end = endUTC.toISOString();

      const fluxQuery = `
        from(bucket: "test")
          |> range(start: -30d, stop: ${end})
          |> filter(fn: (r) => r._measurement == "${params.measurement}")
          |> sort(columns: ["_time"], desc: true)
          |> limit(n: 1)
      `;

      let nextCalled = false;
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          nextCalled = true;
          resolve({ time: o._time, code: o._value });
        },
        error(err) {
          console.error(`Error running InfluxDB query: ${err.message}`);
          reject(err);
        },
        complete() {
          console.log('Query completed');
          if (!nextCalled) {
            resolve(null);
          }
        }
      });

    });
  },
}

module.exports = dao;
