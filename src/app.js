import express from 'express'
import bodyParser from 'body-parser'
import { pureLogger, logger } from './loaders'
import { format, transports } from 'winston'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(pureLogger)

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

process.on('uncaughtException', err => {
	logger.error('Faced with uncaughtException')
})

export default app
