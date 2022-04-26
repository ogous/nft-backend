import Bidding, { IBidding } from '../db/models/biddingModel'

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

  public async list(): Promise<IBidding[]> {
    try {
      const response = await Bidding.find().limit(10)
      return response
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
      return []
    }
  }
}
