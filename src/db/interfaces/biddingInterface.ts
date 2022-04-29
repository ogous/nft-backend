enum BiddingCategory {
  art = 'art',
  celebrities = 'celebrities',
  gaming = 'gaming',
  sport = 'sport',
  music = 'music',
  crypto = 'crypto',
}

interface IBidding {
  _id?: string
  imageUrl: string
  title: string
  endTime: Date
  lastPrice: number
  category: BiddingCategory
  owner: string
  creator?: string
}

export { IBidding }
