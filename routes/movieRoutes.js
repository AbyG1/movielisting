import express from 'express'
import { getMovies,getOneMovie,addMovie,deleteMovie,updateMovie,getMovieByName, filterMoviebyRatings} from '../controllers/movieController.js'
import verifyToken from '../middlewares/authMiddleware.js'
import authorizeRole from '../middlewares/roleMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'



const router = express.Router()


router.post('/movie',verifyToken, upload.single("moviePoster"), authorizeRole("admin"), addMovie)
router.delete('/movie/:id',verifyToken, authorizeRole("admin"), deleteMovie)



router.get('/movies', verifyToken, getMovies)
router.get('/movie/:id', verifyToken, getOneMovie)
router.put('/update-movie/:id', verifyToken, updateMovie)
router.get('/searchMovie', verifyToken,getMovieByName)
router.get('/movie-rating',verifyToken,filterMoviebyRatings)

export default router
