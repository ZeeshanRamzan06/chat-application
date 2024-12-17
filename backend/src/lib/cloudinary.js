import {v2 as cloudinary} from 'cloudinary'
import { config } from 'dotenv'

cloudinary.config(
    {
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    }
)

export default cloudinary;