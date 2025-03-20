import express from 'express'
import { getMovies,getOneMovie,addMovie,deleteMovie } from '../controllers/movieController.js'

const router = express.Router()





router.post('/movie', addMovie)
router.delete('/movie/:id', deleteMovie)




router.get('/movies',getMovies)
router.get('/movie/:id',getOneMovie)

export default router