import { connect } from 'mongoose'
import { ServerApiVersion } from 'mongodb'
import { DBConnectionInfo } from '../config'

const connectDB = async () => {
  try {
    const mongoURI = DBConnectionInfo.uri

    await connect(mongoURI)
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }
    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB
