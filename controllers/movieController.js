
import Movies from "../models/movie.model.js"



const getMovies = async (req, res, next) => {
    try {

        const filter = {}

        if (req.query.year) {
            filter.year = req.query.year
        }

        if (req.query.director) {
            filter.director = {
                '$regex': req.query.director,
                '$options': 'i'
            }

        }

        let moviesQuery = Movies.find(filter)


        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(' ')
            moviesQuery = moviesQuery.sort(sortBy)
        } else {
            moviesQuery = moviesQuery.sort('name')

        }


        const movies = await moviesQuery

        if (!movies) {
            throw new Error("Movie not found")
        }

        res.status(200).json(movies)
    } catch (error) {
        if (error.message === "Movie not found") {
            res.status(404)
        }

        next(error)
    }
}

const getOneMovie = async (req, res, next) => {
    try {
        const { id } = req.params
        const movie = await Movies.findById(id)

        if (!movie) {
            throw new Error("Movie not found")
        }
        res.status(200).json(movie)

    } catch (error) {

        if (error.message === "Movie not found") {
            res.status(404)
        }

        next(error)

    }
}

const addMovie = async (req, res, next) => {
    try {
       

        const { name, year, director} = req.body

        if(!name || !year || !director){
            throw new Error("Add all details")
        }


        const movieDetails = {name, year,director}
        if (req.file) {
            movieDetails.moviPoster = req.file.path
        }


        const movies = await Movies.create(movieDetails)

       
        console.log(movies)
        
        res.status(200).json(movies)




    } catch (error) {

        if (error.message === "Add all details") {
            res.status(400)
        }

        next(error)

    }

}

const deleteMovie = async (req, res, next) => {

    try {
        const { id } = req.params
        const movie = await Movies.findByIdAndDelete(id);
        if (!movie) {

            throw new Error("Movie not found")

        }

        res.status(200).json({ message: "Movie deleted successfully" })


    } catch (error) {
        if (error.message === "Movie not found") {
            res.status(404)
        }

        next(error)
    }

}

const updateMovie = async (req, res, next) => {
    try {
        const { id } = req.params

        const movie = await Movies.findByIdAndUpdate(id, req.body)

        if (!movie) {

            throw new Error("Movie not found")

        }

        const updatedMovie = await Movies.findById(id)

        res.status(200).json({ updatedMovie })



    } catch (error) {
        if (error.msg = "Movie not found") {
            res.status(404)
        }
        next(error)
    }
}

const getMovieByName = async (req, res, next) => {

    try {
        if (Object.keys(req.query).length === 0) {

            throw new Error("No Queries passed")
        }


        const movie = await Movies.find({ name: { '$regex': `^${req.query.name}`, $options: 'i' } })

        if (movie.length === 0) {
            throw new Error("Movie not found")
        }

        res.status(200).json({ movie })


    } catch (error) {

        if (error.message === "No Queries passed") {
            res.status(400)
        }

        if (error.message === "Movie not found") {
            res.status(404)
        }

        next(error)
    }


}

const filterMoviebyRatings = async (req, res, next) => {

    try {

   
    
        const rating = Number(req.query.rating)
        if (Object.keys(req.query).length === 0) {

            throw new Error("No Queries passed")
        }
        
       
        const movies = await Movies.aggregate([{
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "movie_id",
                as: "user_reviews"
            },
        },
        {
            $addFields: {
                avg_rating: {
                    $round: [
                        {$ifNull:[{$avg: "$user_reviews.rating"},0]},1]
            }
        }

    },
    {

             $match: { avg_rating : {
                                $gte: rating,
                                $lt: rating + 1 
              } 
        
    },

     },
    {
        $sort: { avg_rating: -1 } 
    } ])
      

       if(movies.length === 0){
         return res.status(404).json({message:`NO movies found with rating - ${rating}`})
       }

        res.status(200).json(movies)


    } catch (error) {
        if(error.message === "No Queries passed"){
            res.status(400)
        }
        next(error)

    }



}






export { getMovies, getOneMovie, addMovie, deleteMovie, updateMovie, getMovieByName, filterMoviebyRatings }