import { Schema } from 'mongoose'
import { IBidding } from '../interfaces/biddingInterface'

const biddingSchema = new Schema<IBidding>({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  endTime: { type: Date, required: true },
  lastPrice: { type: Number, required: true },
})

export { biddingSchema }
