import { Schema } from 'mongoose'
import { IBidding } from '../interfaces/biddingInterface'

const biddingSchema = new Schema<IBidding>({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  endTime: { type: Date, required: true },
  lastPrice: { type: Number, required: true },
  category: { type: String, required: true },
  owner: { type: String, required: true },
  creator: { type: String, required: true },
})

export { biddingSchema }
