import { Router, Response, Request } from 'express'
import required from '../decorators/argumentsRequired'
import ApiService from '../services/apiServices'

const router: Router = Router()

// @route   POST api/create
// @desc    Create a NFT Bidding
// @access  Public
router.post(
  '/create',
  () => {},
  async (req: Request, res: Response) => {
    required('imageUrl', 'title', 'endDate', 'lastPrice')(req.body)

    const response = await new ApiService().create(req.body)

    return response
  },
)

// @route   GET api/list
// @desc    List NFT Biddings
// @access  Public
router.post(
  '/list',
  () => {},
  async (req: Request, res: Response) => {
    const response = await new ApiService().list()

    // return response
    res.send(JSON.stringify(response) + 'helloo')
  },
)

export default router
