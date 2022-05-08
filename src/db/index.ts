import { connect } from 'mongoose'
import { DBConnectionInfo } from '../config'
import { Storage, StorageOptions } from '@google-cloud/storage'
const connectDB = async () => {
  try {
    const mongoURI = DBConnectionInfo.uri

    await connect(mongoURI)
    console.log(mongoURI)
  } catch (err) {
    if (err instanceof Error) {
      console.log(DBConnectionInfo.uri)
      console.error(err.message)
    }
    // Exit process with failure
    process.exit(1)
  }
}

class StorageService {
  public storage: Storage

  constructor() {
    const config: StorageOptions = {
      projectId: 'dev-edu-347906',
      keyFilename: '/secrets/storage-sa',
    }

    this.storage = new Storage(config)
  }
}

const storage = new StorageService().storage.bucket('nft-market')

export { connectDB, storage }
