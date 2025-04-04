import jwt from 'jsonwebtoken'
import 'dotenv/config'


const verifyToken = (req,res,next) => {

    let token
    let authHeader = req.headers.Authorization || req.headers.authorization

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]

        if(!token){
            res.status(401)
            throw new Error("No token, authorization denied")
   
        }
       
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode
      
            next()


        } catch(err){
            // res.status(400).json({message: "Token is not valid"})
            if(err.name === "TokenExpiredError"){
              
                res.status(403)
                throw new Error("Access token expired, Please refresh your token")
                

            }
        
            res.status(400)
            next(err)
         
        }
    } else {
        return res.status(401).json({message: "No token, authorization denied"})

    }
}


export default verifyToken
