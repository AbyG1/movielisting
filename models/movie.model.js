import mongoose from "mongoose"

const MovieSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },

        year:{
            type: Number,
            required: true
        },

        director: {
            type: String,
            required: true
        }
    },

)

const Movies = mongoose.model("Movie", MovieSchema)

export default Movies