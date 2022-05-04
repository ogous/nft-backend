import { Router, Response, Request } from 'express'
import required from '../decorators/argumentsRequired'
import ApiService from '../services/apiServices'
import multer from 'multer'

const router: Router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
})

// @route   POST api/create
// @desc    Create a NFT Asset
// @access  Public
router.post('/create', upload.any(), async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[]
    console.log(files[0].path)
    await new ApiService().create(req.body, files[0])
    res.status(200)
  } catch (e) {
    if (e instanceof Error) res.status(500).send(e.message)
  } finally {
    res.end()
  }
})

// @route   POST api/list
// @desc    List NFT Assets
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
  required('id', 'user', 'price')(req.body)

  try {
    await new ApiService().makeBid(req.body)
    res.status(200)
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).send(e.message)
    }
  } finally {
    res.end()
  }
})

export default router
