import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,

    },
    movie_id: {
        type: Schema.Types.ObjectId,
        required: true,

    },

    rating: {
        type : Number,
        required: true,
    },
    
    review: {
        type: String,
                                                                                                                 
        
    },

})

const review = mongoose.model("Reviews", reviewSchema)


export default review
