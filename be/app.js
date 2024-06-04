const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
const logger = require('./lib/logger');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const schedule = require('node-schedule')
const models = require('./models/index');
const errorHandler = require('./error/ErrorHandler')
const indexRouter = require('./routes/index');
const { machineDataJob } = require('./lib/scheduler');
const webSocket = require('./lib/socket')

dotenv.config();

const { NODE_ENV } = process.env;

const app = express();
logger.info('app start');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// DB 연결 확인 및 table 생성
models.sequelize.authenticate().then(() => {
  logger.info('DB connection success');

  // sequelize sync (table 생성)
  models.sequelize.sync().then(() => {
    logger.info('Sequelize sync success');
  }).catch((err) => {
    logger.error('Sequelize sync error', err);
  });
}).catch((err) => {
  logger.error('DB Connection fail', err);
});

const job = schedule.scheduleJob('*/3 * * * * *', () => {
  machineDataJob();
})

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);

app.use(errorHandler);

webSocket(server, app);

module.exports = app;
