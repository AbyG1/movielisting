import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";



const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
                folder: 'moviePosters',
                allowedFormats: ['jpeg', 'png', 'jpg'],
            }        
    
})

const upload = multer({ storage });


export default upload