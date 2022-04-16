const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env

const db_url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`

export { DB_HOST, DB_PORT, db_url }
