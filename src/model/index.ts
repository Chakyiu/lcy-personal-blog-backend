import { DB_HOST, DB_PORT, db_url } from '@config/db.config'

interface IDb {
  host: string
  port: string
  url: string
}

const db: IDb = {
  host: DB_HOST,
  port: DB_PORT,
  url: db_url,
}

export default db
