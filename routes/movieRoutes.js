import express from 'express'
import { getMovies,getOneMovie,addMovie } from '../controllers/movieController.js'

const router = express.Router()

router.get('/movies',getMovies)

router.get('/movie/:id',getOneMovie)

router.post('/movie', addMovie)


export default router