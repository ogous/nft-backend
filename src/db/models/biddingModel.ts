import { model } from 'mongoose'
import { biddingSchema } from '../schemas/biddingSchema'
import { IBidding } from '../interfaces/biddingInterface'

const Bidding = model<IBidding>('Bidding', biddingSchema)

export { Bidding as default, IBidding }
