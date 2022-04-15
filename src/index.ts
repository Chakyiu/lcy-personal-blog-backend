import { createServer } from '@config/express'
import { AddressInfo } from 'net'
import http from 'http'
import { logger } from '@config/logger'
import db_connection from '@config/db.config'

const host = process.env.NODE_HOST || '0.0.0.0'
const port = process.env.NODE_PORT || '5000'

async function startServer() {
  const app = createServer()
  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo
    logger.info(`Server ready at http://${addressInfo.address}:${addressInfo.port}`)
  })

  db_connection()
    .then(() => logger.info('connected to Mongo'))
    .catch((err) => logger.error(`Failed to connect to Mongo: ${err}`))

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
