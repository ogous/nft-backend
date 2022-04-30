enum AssetCategory {
  art = 'art',
  celebrities = 'celebrities',
  gaming = 'gaming',
  sport = 'sport',
  music = 'music',
  crypto = 'crypto',
}

interface LastSale {
  user: string
  price: number
  eventTime: Date
}

interface IAsset {
  _id?: string
  imageUrl: string
  title: string
  endTime: Date
  lastSale: LastSale
  category: AssetCategory
  creator: string
}

export { IAsset }
