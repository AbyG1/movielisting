

import Movies from "../models/movie.model.js"

const getMovies = async(req,res) => {
    try{
        const movies = await Movies.find({})
               res.status(200).json(movies)
        } catch(error){
                res.status(500)
        }
}

const getOneMovie = async(req,res) => {
    try{
        const {id} = req.params
        console.log(id)
        const movie = await Movies.findById(id)
        console.log(movie)
        res.status(200).json(movie)
        
    } catch(error) {
        console.log(error)
        res.status(500)
        
    }
}



const addMovie = async(req,res) => {
    try{   
          const movies = await Movies.create(req.body)
           res.status(200).json(movies)
        } catch(error){
            res.status(500)
        }

}




export {getMovies,getOneMovie,addMovie}