import { statusCodes } from "../constants.js";


function errorHandler(err, req, res, next) {


  const statusCode = res.statusCode ? res.statusCode : 500
 
  console.log(statusCode)


  switch(statusCode){
    case statusCodes.VALIDATION_ERROR:
        res.json({
          title: "Validation error",
          message: err.message,
          stackTrace:err.stack
        })
      break      
    case statusCodes.UNAUTHORIZED: 
      res.json({
        title: "Unauthorized error",
        message: err.message,
        stackTrace:err.stack
      })
      break
    case statusCodes.FORBIDDEN: 
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace:err.stack
      })
    break
    case statusCodes.NOT_FOUND: 
      res.json({
        title: "Not found error",
        message: err.message,
        stackTrace:err.stack
      })
    break
    case statusCodes.INTERNAL_SERVER_ERROR: 
      res.json({
        title: "Internal server error",
        message: err.message,
        stackTrace:err.stack
      })
    break
    
    
    }

  }

    
  

  

export default errorHandler  