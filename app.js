import express from "express"

import mongoose from "mongoose"

import cookieParser from "cookie-parser"

import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'
import movieReview from './routes/reviewRoutes.js'
import requestResponseLogger from "./middlewares/loggerMiddleware.js"



import 'dotenv/config'
import { connectionString } from "./config/db.js"


import errorHandler from "./middlewares/errorhandlers.js"

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cookieParser())


app.use(requestResponseLogger)

app.use('/api',movieRoutes)

app.use('/api/auth',authRoutes)

app.use('/api/movie-review',movieReview)

app.use(errorHandler);


mongoose.connect(connectionString)
.then(() => {
    console.log("Connected to database!")
})
.catch(() => {
    console.log("Connection failed")
})


app.listen(3030)