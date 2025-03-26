import userReview from "../models/reviewModel.js";

import { Aggregate } from "mongoose";
import review from "../models/reviewModel.js";

import mongoose from "mongoose";


const addReview = async(req,res) => {

    try{

     
        const user_id = req.user.id
       
        const movie_id = req.params.id
        
        const {rating, review } = req.body
        
        const newReview = new userReview({user_id, movie_id,rating, review})

        if(!rating){
            return res.json({message:'rating is required'})
                
        }
        
        await newReview.save()

        res.status(201).json({message:"Reviw added"})

                
    } catch(err) {

        res.status(500).json({message:`error ${err.message}`})
    }

}


//view all reviews in the collection
const viewAllReviews = async(req,res) => {

    try{
        const reviews = await userReview.find({})
        res.status(200).json({reviews})
    } catch(error) {
        res.status(500).json({message:error.message})
    }

}


const getIndividualMovieReviews = async (req,res) => {

        try{
        
          const movieId = new mongoose.Types.ObjectId(req.params.id)
         
          const reviews =  await review.aggregate([

            {
                $facet: {
                    reviwCount : [{$count : "total"}],
                    data:[
                        {
                            $match : { movie_id: movieId}
                        },   
                        
                     
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
                    ]
                }

            }

               
        ])

            if(reviews.length === 0){
               return res.status(404).json({message:'No reviews found'})
            }

            res.status(200).json(reviews)
    

        } catch(err){
            res.status(500).json({message:err.message})
        }




}


const getReviewsByUser = async(req,res) => {

    try{
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
            }
            
        
        ])
    
        if(review.length === 0){
            return res.status(404).json({message:"No reviews found"})
        }
    
        res.status(200).json(reviews)
        


    } catch (err){

        res.status(500).json(err.message)

    }

}




export { addReview,viewAllReviews,getIndividualMovieReviews,getReviewsByUser}

