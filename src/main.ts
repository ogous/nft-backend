import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import connectDB from './db'
import apiRouter from './routes/apiRoutes'

const server: Express = express()
const port = process.env.PORT || 8000

connectDB()

// Express configuration
server.set('port', port)
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use('/api', apiRouter)

// server.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

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
