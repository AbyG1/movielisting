import express from 'express'
import verifyToken from '../middlewares/authMiddleware.js'
import authorizeRole from '../middlewares/roleMiddleware.js'
import { addReview } from '../controllers/reviewController.js'


const router = express.Router()

router.post('/add-review/:id', verifyToken, authorizeRole("admin","user"), addReview)




export default router