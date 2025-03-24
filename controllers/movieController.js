import Movies from "../models/movie.model.js"



const getMovies = async(req,res) => {
    try{
        const movies = await Movies.find({})
               res.status(200).json(movies)
        } catch(error){
            res.status(500).json({message: error.message})
        }
}

const getOneMovie = async(req,res) => {
    try{
        const {id} = req.params
        
        
        const movie = await Movies.findById(id)
        res.status(200).json(movie)
        
    } catch(error) {
        res.status(500).json({message: error.message})
        
    }
}



const addMovie = async(req,res) => {
    try{   
          const movies = await Movies.create(req.body)
           res.status(200).json(movies)
        } catch(error){
            res.status(500).json({message: error.message})
        }

}



const deleteMovie = async(req,res) => {

    try{
       const{id} = req.params
       const movie = await Movies.findByIdAndDelete(id);
       if(!movie){
        return res.status(404).json({message: "Movie not found"})
       }   

       res.status(200).json({message :"Movie deleted successfully"})

   
    } catch (error){
        res.status(500).json({message: "error"})
    }

}




export {getMovies,getOneMovie,addMovie,deleteMovie}