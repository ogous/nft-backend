import { Router, Response, Request } from 'express'
import required from '../decorators/argumentsRequired'
import ApiService from '../services/apiServices'

const router: Router = Router()

// @route   POST api/create
// @desc    Create a NFT Bidding
// @access  Public
router.post('/create', async (req: Request, res: Response) => {
  required('imageUrl', 'title', 'endTime', 'lastPrice')(req.body)
  try {
    await new ApiService().create(req.body)
    res.status(200).send('success')
  } catch (error) {
    if (error instanceof Error) res.status(400).send(error.message)
  } finally {
    res.end()
  }
})

// @route   GET api/list
// @desc    List NFT Biddings
// @access  Public
router.get('/list', async (req: Request, res: Response) => {
  const response = await new ApiService().list()

  if (!response) {
    res.status(500)
  }
  res.status(200).send(response)
})

export default router
