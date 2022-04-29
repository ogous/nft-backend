import { Router, Response, Request } from 'express'
import required from '../decorators/argumentsRequired'
import ApiService from '../services/apiServices'
import multer from 'multer'

const router: Router = Router()
// const upload = multer()
// const nftUpload = upload.fields([
//   { name: 'image', maxCount: 1 },
//   { name: 'title' },
//   { name: 'endTime' },
//   { name: 'lastPrice' },
//   { name: 'category' },
//   { name: 'user' },
// ])

// @route   POST api/create
// @desc    Create a NFT Bidding
// @access  Public
router.post('/create', async (req: Request, res: Response) => {
  required('title', 'endTime', 'lastPrice', 'category', 'owner')(req.body)
  try {
    await new ApiService().create(req.body)
    res.status(200)
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message)
  } finally {
    res.end()
  }
})

// @route   POST api/list
// @desc    List NFT Biddings
// @access  Public
router.post('/list', async (req: Request, res: Response) => {
  try {
    const response = await new ApiService().list(req.body)

    res.status(200).send(response)
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message)
  }
})

// @route   POST api/makeBid
// @desc    Make an new offer
// @access  Public
router.post('/makeBid', async (req: Request, res: Response) => {
  required('id', 'user', 'lastPrice')(req.body)

  try {
    await new ApiService().makeBid(req.body)
    res.status(200)
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message)
  }
})

export default router
