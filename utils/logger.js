import winston from 'winston'

const logger = winston.createLogger({
    level: "Info",
    format: winston.format.combine( // to add dates
        winston.format.timestamp(),
        winston.format.json(),  
    ),  
    
    //to get the logs in console
    // transports: [new winston.transports.Console()]


    //to get the logs in a file
    transports: [
        new winston.transports.File({filename: "logs/error.log", level: 'error'}),
        new winston.transports.File({filename: "logs/request.log", level: "info"})
    ],

    exceptionHandlers: [
        new winston.transports.File({filename: "logs/exception.log"})
    ],
    rejectionHandlers: [
        new winston.transports.File({filename: "logs/rejections.log"})
    ]


})

export default logger

