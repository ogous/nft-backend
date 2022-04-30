import { Schema } from 'mongoose'
import { IAsset } from '../interfaces/assetInterface'

const assetSchema = new Schema<IAsset>({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  endTime: { type: Date, required: true },
  category: { type: String, required: true },
  creator: { type: String, required: true },
  lastSale: {
    user: {
      type: String,
    },
    price: {
      type: Number,
    },
    eventTime: {
      type: Date,
    },
  },
})

export { assetSchema }
