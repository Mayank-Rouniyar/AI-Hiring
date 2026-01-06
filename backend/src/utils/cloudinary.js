import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    
const uploadOnCloudinary=async(localfilepath)=>{
      try {
        const response=await cloudinary.uploader.upload(localfilepath,{
          resource_type:auto
        })
      } catch (error) {
        fs.unlink(localfilepath)
        console.log("An error occured while uploading file \n",error)
      }
}
export {uploadOnCloudinary}