import userReview from "../models/reviewModel.js";


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



const deleteReview = () => {

}


const viewAllReviews = async(req,res) => {

    try{
        const reviews = await userReview.find({})
        res.status(200).json({reviews})
    } catch(error) {
        res.status(500).json({message:error.message})
    }

}



export { addReview,viewAllReviews}