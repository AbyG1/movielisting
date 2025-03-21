import express from 'express'
import { getMovies,getOneMovie,addMovie,deleteMovie } from '../controllers/movieController.js'
import verifyToken from '../middlewares/authMiddleware.js'
import authorizeRole from '../middlewares/roleMiddleware.js'

const router = express.Router()





router.post('/movie',verifyToken, authorizeRole("admin"), addMovie)
router.delete('/movie/:id',verifyToken, authorizeRole("admin"), deleteMovie)




router.get('/movies', verifyToken, authorizeRole("admin","user"), getMovies)
router.get('/movie/:id', verifyToken, authorizeRole("admin","user"), getOneMovie)

export default router