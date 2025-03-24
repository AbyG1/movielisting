import reviewSchema from "../models/reviewModel.js";


const addReview = async(req,res) => {

    try{

     
        const user_id = req.user.id
        console.log(user_id)
        const movie_id = req.params.id
        console.log(movie_id)

        const {rating, review } = req.body
        
        const newReview = new reviewSchema({user_id, movie_id,rating, review})

        if(!rating){
            return res.json({message:'rating is required'})
        }
        console.log(newReview)
        await newReview.save()

        res.status(201).json({message:"Reviw added"})

    } catch(err) {

        res.status(500).json({message:`error ${err.message}`})
    }

}


const viewReviews = () => {

}


const deleteReview = () => {

}


const viewAllReviews = () => {

}



export { addReview,}