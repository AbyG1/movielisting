import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const register = async (req,res) => {

    try{
        const { username, password, role} = req.body

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({username, password: hashedPassword, role})
        await newUser.save()

    res.status(201).json({message:`User registered with username ${username}`})

    } catch(err) {
        res.status(500).json({message: 'something went wrong'})
    }
    
}

const login = async (req,res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username})

        if(!user){
            return res.status(404).json({message: `user not found`})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
           return res.status(400).json({message: `Invalid credentails`}) 
        }


        const token = jwt.sign({id: user._id,role: user.role}, process.env.JWT_SECRET,{expiresIn:"1h"})

        res.status(200).json({token})
    } catch(err){
       res.status(500).json({message: err.message})
    }
 

}


export {
    register,login
}