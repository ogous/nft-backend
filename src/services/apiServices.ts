import Asset, { IAsset } from '../db/models/assetModel'
import { storage } from '../db/index'
import { AssetCategory } from '../objects/asset'

export default class ApiService {
  public async upload(file: Express.Multer.File) {
    // try {
    const blob = storage.file(file.originalname)

    // const blobStream = blob.createReadStream()
    await blob.save(file.buffer, { public: true })

    return blob.publicUrl()
    // } catch (e) {
    //   if (e instanceof Error) console.log('Mr. Anderson', e.message, e.name, e.stack)
    // }
  }

  public async create(data: IAsset, file: Express.Multer.File) {
    try {
      if (!file) throw new Error('Image not found')
      const imageUrl = await this.upload(file)
      if (!imageUrl) throw new Error('Image could not uploaded')

      const asset = new Asset({ ...data, imageUrl })
      await asset.save()
    } catch (err) {
      if (err instanceof Error) {
        console.error('Mr. Anderson', err.message, err.name, err.stack)
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
    const response = await Asset.findOne({ _id: id }, 'endTime lastSale').exec()
    const NOW = new Date().getTime()
    if (response?.endTime) {
      const FUTURE = new Date(response.endTime).getTime()
      if (FUTURE - NOW < 0) throw new Error('Asset bidding is ended!')
    }
    if (response?.lastSale && response.lastSale.price > price)
      throw new Error(`Item's price is higher make a more higher bid.`)

    await response?.updateOne({
      lastSale: {
        user,
        price,
        eventTime: new Date(),
      },
    })
  }
}
