import express from 'express'
import verifyToken from '../middlewares/authMiddleware.js'
import authorizeRole from '../middlewares/roleMiddleware.js'
import { addReview, viewAllReviews } from '../controllers/reviewController.js'


const router = express.Router()

router.post('/add-review/:id', verifyToken, authorizeRole("admin","user"), addReview)

router.get('/getAllreviews',verifyToken,authorizeRole("admin"), viewAllReviews)




export default router