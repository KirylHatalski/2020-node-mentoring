import express from 'express';
import { pureLogger, logger } from './loaders'
import { format, transports } from 'winston'

const app = express()

app.use(pureLogger);

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

process.on('uncaughtException', err => {
	logger.error('Faced with uncaughtException');
})

export default app;