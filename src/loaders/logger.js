import { readFile } from 'fs'
import path from 'path'
import { createLogger, format, transports } from 'winston'

const pureLogger = (req, res, next) => {
   console.log(`${req.originalUrl}: ${res.statusCode}`);
   next();
 };

const logger = createLogger({
  levels: { error: 0, warn: 1, info: 2, sequelize: 3, debug: 4 },
  format: format.json(),
  transports: [
    new transports.File({ filename: '../logs/common.log' }),
    new transports.File({
          filename: '../logs/crashes.log',
          level: 'error',
          handleExceptions: true,
          humanReadableUnhandledException: true,
        })
  ],
});

const loggingHandler = (serviceName, callback) => (req, res) => {
  logger.info(`${serviceName}.handler.begun`);
  callback(req, res)
    .then(data => {
      logger.info(`${serviceName}.handler.success`);
      res.send(data)
    })
    .catch(err =>  {
      logger.info(`${serviceName}.handler.failed`);
      res.send(res.status().send(err));
    })
};

export { pureLogger, logger, loggingHandler }