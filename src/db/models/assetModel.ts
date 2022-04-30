import { model } from 'mongoose'
import { assetSchema } from '../schemas/assetSchema'
import { IAsset } from '../interfaces/assetInterface'

const Asset = model<IAsset>('assets', assetSchema)

export { Asset as default, IAsset }
