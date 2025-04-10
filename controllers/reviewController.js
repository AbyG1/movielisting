import userReview from "../models/reviewModel.js";

import { Aggregate } from "mongoose";
import review from "../models/reviewModel.js";

import mongoose from "mongoose";


const addReview = async(req,res,next) => {

    try{

     
        const user_id = req.user.id
       
        const movie_id = req.params.id
        
        const {rating, review } = req.body
        
        const newReview = new userReview({user_id, movie_id,rating, review})

        if(!rating){
          
            throw new Error("Rating is required")
                
        }
        
        await newReview.save()

        res.status(201).json({message:"Reviw added"})

                
    } catch(err) {
      

        if(err.message === "Rating is required"){
            res.status(400)
        }


        next(err)
       
    }

}


//view all reviews in the collection
const viewAllReviews = async(req,res,next) => {

    try{
        const reviews = await userReview.find({})
        res.status(200).json({reviews})
    } catch(error) {
        res.status(400)
        next(err)
        // res.status(500).json({message:error.message})
    }

}


const getIndividualMovieReviews = async (req,res,next) => {

        try{
        
          const movieId = new mongoose.Types.ObjectId(req.params.id)

          const pageNumber = parseInt(req.query.page || 0)
          const numberOfReviews = parseInt(req.query.size || 10)


         
          const reviews =  await review.aggregate([

        
                {
                    $match : { movie_id: movieId}
                },
                {
                    $facet: {
                        reviewCount : [{$count : "Total Reviews of this movie"}],
                        data:[
                             
                            {
                                $lookup: {
                                    from: 'movies',  
                                    localField: 'movie_id',  
                                    foreignField: '_id',  
                                    as: 'movieDetails'  
                                }
                            },
                            {
                                $lookup : { 
                                    from:"users",
                                    localField:"user_id",
                                    foreignField:"_id",
                                    as: "userDetails"
                                
                                 }
                            }, 
                            {
                                $unwind: "$userDetails",
                            },   
                            {
                                $project : {
                                    "userDetails.password": 0,
                                    "userDetails._id": 0,
                                    "userDetails.__v":0
                                }
                            },
                            {$skip: pageNumber * numberOfReviews },
                            {$limit: numberOfReviews }
                        ]
                    }

                }

                

            

               
        ])

            if(reviews.length === 0){
               
               throw new Error('No reviews found')
            }

            res.status(200).json(reviews)
    

        } catch(err){
        
            next(err)

            if(err.message === "No reviews found"){
                res.status(404)
            }


        }


}


const getReviewsByUser = async(req,res,next) => {

    try{
        const pageNumber = parseInt(req.query.page || 0)
        const numberOfReviews = parseInt(req.query.size || 10)

        const userId = new mongoose.Types.ObjectId(req.params.id)

        const reviews = await review.aggregate([
            {
            $match: {user_id: userId},
            },
            {
                $lookup : { 
                    from:"users",
                    localField:"user_id",
                    foreignField:"_id",
                    as: "userDetails"
                
                 }
            }, 
            {
                $unwind: "$userDetails"
            },
            {
                $project : {
                    "userDetails.password": 0,
                    "userDetails._id": 0,
                    "userDetails.__v":0
                }
            },
            {$skip: pageNumber * numberOfReviews },
            {$limit: numberOfReviews }
            
        
        ])
    
        if(review.length === 0){
          
            throw new Error("No reviews found")
          
        }
    
        res.status(200).json(reviews)
        


    } catch (err){
        
        if(err.message === "No reviews found"){
            res.status(404)
        }
        next(err)

    }

}




export { addReview,viewAllReviews,getIndividualMovieReviews,getReviewsByUser}

