import express from "express"

import mongoose from "mongoose"

import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'
import movieReview from './routes/reviewRoutes.js'



import 'dotenv/config'

const app = express()

app.use(express.json())

app.use('/api',movieRoutes)

app.use('/api/auth',authRoutes)

app.use('/api/movie-review',movieReview)


mongoose.connect('mongodb+srv://aby:aby123@cluster0.mc1zm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log("Connected to database!")
})
.catch(() => {
    console.log("Connection failed")
})


app.listen(3030)