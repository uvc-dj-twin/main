const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const influxUrl = `http://${process.env.INFLUXDB_HOST}:${process.env.INFLUXDB_PORT}`;
const influx = new InfluxDB({ url: influxUrl, token: process.env.INFLUXDB_TOKEN });

const dao = {
  countTodayPredict(params) {
    const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);
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
    return new Promise((resolve, reject) => {
      const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);
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
      const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);
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

  countPredict(params) {
    return new Promise(async (resolve, reject) => {
      const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);

      const fluxQuery = `
        from(bucket: "test")
        |> range(start: ${params.startDate}, stop: ${params.endDate})
        |> filter(fn: (r) => r._measurement == "${params.measurement}")
        |> filter(fn: (r) => r.serial_no == "${params.serialNo}")
        |> filter(fn: (r) => r._field == "code")
        |> filter(fn: (r) => r._value == ${params.code})
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

  countFailPredict(params) {
    return new Promise(async (resolve, reject) => {
      const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);

      const fluxQuery = `
        from(bucket: "test")
        |> range(start: ${params.startDate}, stop: ${params.endDate})
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

  predictList(params) {
    return new Promise(async (resolve, reject) => {
      const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);

      
      try {
        // 조회 시간 설정
        const kstOffset = 9 * 60 * 60 * 1000; // KST (UTC+9)
  
        const startKST = new Date(params.startDate);
        const startUTC = new Date(startKST.getTime() - kstOffset);
  
        const endKST = new Date(params.endDate);
        const endUTC = new Date(endKST.getTime() - kstOffset);
  
        const start = startUTC.toISOString();
        const end = endUTC.toISOString();
  
        let fluxQuery = `
          from(bucket: "test")
          |> range(start: ${start}, stop: ${end})
          |> filter(fn: (r) => r._measurement == "${params.measurement}")
          |> filter(fn: (r) => r.serial_no == "${params.serialNo}")
          |> filter(fn: (r) => r._field == "code")
        `;
        
        const rows = await queryApi.collectRows(fluxQuery, (values, tableMeta) => {
          return tableMeta.toObject(values);
        });
        resolve(rows);
      } catch (err) {
        console.log(`sensorDao.detailsData error: ${err.message}`);
        reject(err);
      }

    })
  },

  nearestPredict(params) {
    return new Promise(async (resolve, reject) => {
      const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);

      // 조회 오차 범위 설정
      const offset = 10;

      const startTime = new Date(params.time.getTime() - offset)
      const endTime = new Date(params.time.getTime() + offset)

      const start = startTime.toISOString();
      const end = endTime.toISOString();
      const time = params.time.toISOString();

      let fluxQuery = `
        from(bucket: "test")
        |> range(start: ${start}, stop: ${end})
        |> filter(fn: (r) => r._measurement == "${params.measurement}")
        |> filter(fn: (r) => r.serial_no == "${params.serialNo}")
        |> filter(fn: (r) => r._field == "start_time")
        |> limit(n: 1)
      `;

      let nextCalled = false;
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          nextCalled = true;
          resolve(o);
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
    })
  },

  detailsData(params) {
    return new Promise(async (resolve, reject) => {
      const queryApi = influx.getQueryApi(process.env.INFLUXDB_ORG);

      let fluxQuery = `
        from(bucket: "test")
        |> range(start: ${params.startTime}, stop: ${params.endTime})
        |> filter(fn: (r) => r._measurement == "${params.measurement}")
        |> filter(fn: (r) => r.serial_no == "${params.serialNo}")
        |> filter(fn: (r) => r._field == "${params.field}")
      `;

      try {
        const rows = await queryApi.collectRows(fluxQuery, (values, tableMeta) => {
          return tableMeta.toObject(values);
        });
        resolve(rows);
      } catch (err) {
        console.log(`sensorDao.detailsData error: ${err.message}`);
        reject(err);
      }

    })
  }
}

module.exports = dao;
