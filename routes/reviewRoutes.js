import express from 'express'
import verifyToken from '../middlewares/authMiddleware.js'
import authorizeRole from '../middlewares/roleMiddleware.js'
import { addReview, getIndividualMovieReviews, getReviewsByUser, viewAllReviews } from '../controllers/reviewController.js'


const router = express.Router()

router.post('/add-review/:id', verifyToken, addReview)

router.get('/getAllreviews',verifyToken,authorizeRole("admin"), viewAllReviews)

router.get('/get-reviews/:id',verifyToken,getIndividualMovieReviews)

router.get('/get-reviewsbyuser/:id',verifyToken,getReviewsByUser)

export default router