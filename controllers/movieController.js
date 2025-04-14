

import Movies from "../models/movie.model.js"
import mongoose from "mongoose"


const getMovies = async(req,res,next) => {
    try{

        const filter = {}

        if(req.query.year){
            filter.year = req.query.year
        }

        if(req.query.director){
            filter.director = { '$regex': req.query.director,
                                '$options': 'i'
                            }
            
        }

        let moviesQuery = Movies.find(filter)
        console.log(moviesQuery)

        if(req.query.sort){
            const sortBy = req.query.sort.split(",").join(' ')
            moviesQuery = moviesQuery.sort(sortBy)
        } else {
            moviesQuery = moviesQuery.sort('name')
            console.log(moviesQuery)
        }


        const movies = await moviesQuery

        if(!movies){
            throw new Error("Movie not found")
        }

               res.status(200).json(movies)
        } catch(error){
            if(error.message === "Movie not found"){
                res.status(404)
            }
            
            next(error)
        }
}

const getOneMovie = async(req,res,next) => {
    try{
        const {id} = req.params
        const movie = await Movies.findById(id)

        if(!movie){
            throw new Error("Movie not found")
        }
        res.status(200).json(movie)
        
    } catch(error) {
        
        if(error.message === "Movie not found"){
            res.status(404)
        }
       
        next(error)
        
    }
}



const addMovie = async(req,res,next) => {
    try{  
          console.log(req.file)
          const movies = await Movies.create(req.body)
          movies.moviePoster = req.file.path
          movies.save()
           res.status(200).json(movies)
        } catch(error){
            res.status(500)
            next(error)
            
        }

}



const deleteMovie = async(req,res,next) => {

    try{
       const{id} = req.params
       const movie = await Movies.findByIdAndDelete(id);
       if(!movie){
        
        throw new Error("Movie not found")
    
       }   

       res.status(200).json({message :"Movie deleted successfully"})

   
    } catch (error){
        if(error.message === "Movie not found"){
            res.status(404)
        }
        
        next(error)
    }

}


const updateMovie = async(req,res,next) => {
    try{
        const {id} = req.params
        
        const movie = await Movies.findByIdAndUpdate(id, req.body)
       
        if(!movie){
           
            throw new Error("Movie not found")
        
        }   

        const updatedMovie = await Movies.findById(id)
        
        res.status(200).json({updatedMovie})



    } catch (error) {
        if(error.msg = "Movie not found"){
            res.status(404)
        }
        next(error)
    }
}



const getMovieByName = async(req,res,next) => {

    try{
        if(Object.keys(req.query).length === 0){
           
           throw new Error("No Queries passed")
        }

    
        const movie = await Movies.find({name: {'$regex': `^${req.query.name}`, $options: 'i'}})

        if(movie.length === 0){
            throw new Error("Movie not found")
        }

        res.status(200).json({movie})
    
    
    } catch (error){

        if(error.message === "No Queries passed"){
            res.status(400)
        }

        if(error.message === "Movie not found"){
            res.status(404)
        }
       
        next(error)
    }

    
}









export {getMovies,getOneMovie,addMovie,deleteMovie,updateMovie,getMovieByName}