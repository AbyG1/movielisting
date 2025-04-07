import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const register = async (req,res,next) => {

    try{
        const { username, password, role} = req.body
  

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({username, password: hashedPassword, role})
        await newUser.save()

       
    res.status(201).json({message:`User registered with username ${username}`})

    } catch(err) {
        res.status(400)
        next(err)
        // res.status(500).json({message: 'something went wrong'})
    }
    
}

const login = async (req,res,next) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username})
        if(!user){
             res.status(404)
             throw new Error(`user not found`)
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(401)
             throw new Error(`Invalid credentails`) 
        }

   
        const accessToken = jwt.sign({id: user._id,role: user.role}, process.env.JWT_SECRET,{expiresIn:"1m"})
     

        const refreshToken = jwt.sign({id: user._id,role: user.role}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:"5d"})

        res.status(200).cookie('jwt',refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000}).json({accessToken})
    } catch(err){
        res.status(400)
        next(err)
    //    res.status(500).json({message: err.message})
    }
 

}


const handleRefreshToken = async(req, res, next) => {
    try{

        const cookies = req.cookies

        if(!cookies?.jwt){
            res.status(401)
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
            res.status(401)
            throw new Error('User not found')
        }

        const newAccessToken = jwt.sign({id: user._id,role: user.role}, process.env.JWT_SECRET,{expiresIn:"20m"})

        res.status(200).json({accessToken: newAccessToken})




    })


    } catch (err){
        res.status(500)
        next(err)
    }
    

    

}




export {
    register, login, handleRefreshToken
}