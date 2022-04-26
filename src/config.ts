require('dotenv').config()

const DBConnectionInfo = {
  uri: process.env.DB ?? 'mongodb://localhost:27017/myapp',
}

const Server = {
  port: process.env.PORT || 8000,
  client: process.env.CLIENT,
}
export { Server, DBConnectionInfo }
