import logger from "../utils/logger.js";



const requestResponseLogger = (req, res, next) => {
    logger.info({
      message: "Incoming Request",
      method: req.method,
      url: req.url,
      query: req.query,
    });


    res.on("finish", () => {
        logger.info({
            message: "Response send",
            method: req.method,
            url: res.url,
            statusCode: res.statusCode,
        })

    })
    

  next()
}

export default requestResponseLogger


