import { statusCodes } from "../constants.js";
import logger from "../utils/logger.js";


function errorHandler(err, req, res, next) {


  const statusCode = res.statusCode ? res.statusCode : 500
 

  switch(statusCode){
    case statusCodes.VALIDATION_ERROR:
            logger.error({
              message: err.message,
              stack: err.stack,
              route: req.url,
              method: req.method,
              statusCode: res.statusCode
            })    
          res.json({
                title: "Validation error",
                message: err.message,
                stackTrace:err.stack
              })
              
            break      
    case statusCodes.UNAUTHORIZED:
            logger.error({
              message: err.message,
              stack: err.stack,
              route: req.url,
              method: req.method,
              statusCode: res.statusCode
            }) 
            res.json({
              title: "Unauthorized error",
              message: err.message,
              stackTrace:err.stack  
            })
            break
    case statusCodes.FORBIDDEN:
            logger.error({
              message: err.message,
              stack: err.stack,
              route: req.url,
              method: req.method,
              statusCode: res.statusCode
            }) 
            res.json({
              title: "Forbidden",
              message: err.message,
              stackTrace:err.stack
            })
          break
    case statusCodes.NOT_FOUND:
          logger.error({
            message: err.message,
            stack: err.stack,
            route: req.url,
            method: req.method,
            statusCode: res.statusCode
          }) 
          res.json({
            title: "Not found error",
            message: err.message,
            stackTrace:err.stack
          })
        break
    case statusCodes.INTERNAL_SERVER_ERROR:
        logger.error({
          message: err.message,
          stack: err.stack,
          route: req.url,
          method: req.method,
          statusCode: res.statusCode
        }) 
        res.json({
          title: "Internal server error",
          message: err.message,
          stackTrace:err.stack
        })
    break
    
    
    }

  }

    
  

  

export default errorHandler  