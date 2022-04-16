import { createServer } from '@config/express'
import { AddressInfo } from 'net'
import http from 'http'
import { logger } from '@config/logger'
import mongoose from 'mongoose'
import db from '@model'

const host = process.env.NODE_HOST || '0.0.0.0'
const port = process.env.NODE_PORT || '5005'

async function startServer() {
  mongoose
    .connect(db.url)
    .then(() => logger.info(`Connected to ${db.host}:${db.port}`))
    .catch((err) => {
      logger.error(`Cannot connect to database: ${err}`)
      process.exit()
    })

  const app = createServer()
  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo
    logger.info(`Server ready at http://${addressInfo.address}:${addressInfo.port}`)
  })

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2']
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      logger.info(`process.once ${type}`)

      server.close(() => {
        logger.debug('HTTP server closed')
      })
    })
  })
}

startServer()
