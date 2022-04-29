import Bidding, { IBidding } from '../db/models/biddingModel'
import { storage } from '../db/index'
import { BiddingCategory } from '../objects/bidding'
export default class ApiService {
  public async create(data: IBidding) {
    try {
      const bidding = new Bidding(data)
      await bidding.save()
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }

  public async list({
    offset,
    limit,
    category,
  }: {
    offset: number
    limit: number
    category: string
  }): Promise<IBidding[] | undefined> {
    try {
      if (category && !Object.values(BiddingCategory).find((cat) => cat === category)) {
        throw new Error('Unknown category')
      }
      const filter: { category?: string } = {}

      if (category) {
        filter.category = category
      }

      const response = await Bidding.find(filter).skip(offset).limit(limit).exec()

      return response
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }

  public async makeBid({ _id, user, lastPrice }: { _id: string; user: string; lastPrice: number }) {
    try {
      const response = await Bidding.findOne({ _id }, 'endTime').exec()
      if (response?.endTime) {
        throw new Error('Bidding is ended!')
      }

      const transaction = await Bidding.findOneAndUpdate({ _id }, { owner: user, lastPrice })

      return transaction
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }
}
