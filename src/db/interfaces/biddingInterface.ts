enum BiddingCategory {
  art = 'art',
  celebrities = 'celebrities',
  gaming = 'gaming',
  sport = 'sport',
  music = 'music',
  crypto = 'crypto',
}

interface IBidding {
  imageUrl: string
  title: string
  endTime: Date
  lastPrice: number
  category: BiddingCategory
  user: string
}

export { IBidding }
