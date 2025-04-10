import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



const register = async (req,res,next) => {

    try{
        const { username, password, role} = req.body


        if(!username || !password || !role){
           console.log("here")
            throw new Error("Enter all credentials")
        }
  

        
         
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({username, password: hashedPassword, role})
        
      
        await newUser.save()
       
       

       
    res.status(201).json({message:`User registered with username ${username}`})

    } catch(err) {

        if(err.message === "Enter all credentials"){
            res.status(401)
        }

        if(err.code === 11000 && err.keyPattern?.username){
            res.status(401).json({message: "username already exists"})
        }

        if(err.name === "ValidationError"){
            return res.status(400).json({message: err.message})
        }

        next(err)
       
    }
    
}

const login = async (req,res,next) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if(!user){
             
             throw new Error(`user not found`)
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
           
             throw new Error(`Invalid credentails`) 
        }

        const accessToken = jwt.sign({id: user._id,role: user.role}, process.env.JWT_SECRET,{expiresIn:"5m"})
     

        const refreshToken = jwt.sign({id: user._id,role: user.role}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:"5d"})

        res.status(200).cookie('jwt',refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json({accessToken})
    } catch(err){
        


        if(err.message === 'user not found'){
            res.status(404)
        }
        if(err.message === 'Invalid credentails'){
            res.status(401)
        }

        next(err)
    
    }
 

}


const handleRefreshToken = async(req, res, next) => {
    try{

        const cookies = req.cookies

        if(!cookies?.jwt){
            
            throw new Error("No Refresh token") 
        }

        const refreshToken = cookies.jwt

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, decoded) => {
            if(err){
                res.status(403)
               next("Invalid refresh token")
            }
        

        const user = await User.findById(decoded.id)
        if(!user){
           
            throw new Error('User not found')
        }

        const newAccessToken = jwt.sign({id: user._id,role: user.role}, process.env.JWT_SECRET,{expiresIn:"5m"})

        res.status(200).json({accessToken: newAccessToken})




    })


    } catch (err){

        if(err.message === "No Refresh token"){
            res.status(401)
        }

        if(err.message === "User not found"){
            res.status(401)
        }

        next(err)
    }
    

    

}




export {
    register, login, handleRefreshToken
}