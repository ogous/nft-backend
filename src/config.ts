require('dotenv').config()

const DBConnectionInfo = {
  uri: process.env.DB ?? 'mongodb://localhost:27017/myapp',
}

export { DBConnectionInfo }
