import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const uploadToCloudinary = async (file) => {
   // Configuration(permit to be upload images to cloudinary)
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });
  try {
    //upload the file on cloudinary
    const result = await cloudinary.uploader.upload(file);

    // Remove the local file after successful upload
    fs.unlinkSync(file);

    return result.secure_url;

  } catch (error) {
    fs.unlinkSync(file);
    console.log(error);
  }
};
   
export default uploadToCloudinary;