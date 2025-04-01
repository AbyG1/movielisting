import Movies from "../models/movie.model.js"



const getMovies = async(req,res,next) => {
    try{
        const movies = await Movies.find({})
               res.status(200).json(movies)
        } catch(error){
            // res.status(500).json({message: error.message})
            res.status(400)
            next(error)
        }
}

const getOneMovie = async(req,res,next) => {
    try{
        const {id} = req.params
        
        
        const movie = await Movies.findById(id)
        res.status(200).json(movie)
        
    } catch(error) {
        // res.status(500).json({message: error.message})
        res.status(400)
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
            res.staus(400)
            next(error)
            
        }

}



const deleteMovie = async(req,res) => {

    try{
       const{id} = req.params
       const movie = await Movies.findByIdAndDelete(id);
       if(!movie){
        res.status(404)
        throw new Error("Movie not found")
    
       }   

       res.status(200).json({message :"Movie deleted successfully"})

   
    } catch (error){
        // res.status(500).json({message: "error"})
        res.status(400)
        next(error)
    }

}




export {getMovies,getOneMovie,addMovie,deleteMovie}