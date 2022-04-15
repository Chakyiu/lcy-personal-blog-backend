import { MongoClient } from 'mongodb'
import { logger } from './logger'

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

const db_url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`

const client = new MongoClient(db_url)

async function db_connection(): Promise<null> {
  await client.connect().catch((err) => logger.error(`Cannot connect to db_client: ${err}`))

  await client.db(DB_NAME)

  return null
}

export default db_connection
