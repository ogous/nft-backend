import Asset, { IAsset } from '../db/models/assetModel'
import { storage } from '../db/index'
import { AssetCategory } from '../objects/asset'
import { assert } from 'console'
export default class ApiService {
  public async create(data: IAsset) {
    try {
      const asset = new Asset(data)
      await asset.save()
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
  }): Promise<IAsset[] | undefined> {
    try {
      if (category && !Object.values(AssetCategory).find((cat) => cat === category)) {
        throw new Error('Unknown category')
      }
      const filter: { category?: string } = {}

      if (category) {
        filter.category = category
      }

      const response = await Asset.find(filter).skip(offset).limit(limit).exec()

      return response
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }

  public async makeBid({ id, user, price }: { id: string; user: string; price: number }) {
    try {
      const response = await Asset.findOne({ _id: id }, 'endTime lastSale').exec()
      const NOW = new Date().getTime()
      if (response?.endTime) {
        const FUTURE = new Date(response.endTime).getTime()

        if (FUTURE - NOW < 0) return new Error('Asset bidding is ended!')
      }
      if (response?.lastSale) {
        const FUTURE = new Date(response.lastSale.eventTime).getTime()

        if (FUTURE - NOW < 0) return new Error('There is a new sale operation, please try again')
        if (response.lastSale.price > price)
          return new Error('There is a higher price sale operation, please try again')
      }

      response?.updateOne({
        lastSale: {
          user,
          price,
          eventTime: new Date(),
        },
      })

      return response
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
      }
    }
  }
}
