import express, { Express } from 'express'
import bodyParser from 'body-parser'
import connectDB from './db'
import apiRouter from './routes/apiRoutes'
import cors from 'cors'

const server: Express = express()
const port = process.env.PORT || 8000

connectDB()

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Express configuration
server.set('port', port)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(cors(corsOptions))
server.use('/api', apiRouter)

const start = async () => {
  try {
    await server.listen(port)
    console.log(`Server is running on port: ${port}`)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

start()
