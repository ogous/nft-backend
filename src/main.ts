import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { connectDB } from './db'
import apiRouter from './routes/apiRoutes'
import cors from 'cors'
import { Server } from './config'

const server: Express = express()

connectDB()

var whitelist = [Server.client, 'http://localhost:3000']
var corsOptions = {
  origin: (origin: string | undefined, callback: (e: Error | null, state?: boolean) => void) => {
    if (process.env.NODE_ENV !== 'production' || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

server.set('port', Server.port)
server.use(cors(corsOptions))
server.use(express.json({ limit: '50mb' }))
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
server.use('/api', apiRouter)

const start = async () => {
  try {
    await server.listen(Server.port)
    console.log(`Server is running on port: ${Server.port}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()
