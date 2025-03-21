import express from 'express'
import { getMovies,getOneMovie,addMovie,deleteMovie } from '../controllers/movieController.js'
import verifyToken from '../middlewares/authMiddleware.js'


const router = express.Router()





router.post('/movie',verifyToken, addMovie)
router.delete('/movie/:id',verifyToken, deleteMovie)




router.get('/movies', verifyToken, getMovies)
router.get('/movie/:id', verifyToken, getOneMovie)

export default router