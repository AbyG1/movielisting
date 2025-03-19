import express from "express"

const app = express()

import mongoose from "mongoose"

import movieRoutes from './routes/movieRoutes.js'

app.use(express.json())

app.use('/api',movieRoutes)


// app.get('/api/movie/:id', async (req,res) => {
//     try{
//         const {id} = req.params
//         const movie = await Movie.findById(id)
//         res.status(200).json(movie)
//     } catch {
//         res.status(500)
//     }
// })








mongoose.connect('mongodb+srv://aby:aby123@cluster0.mc1zm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log("Connected to database!")
})
.catch(() => {
    console.log("Connection failed")
})




app.listen(3030)