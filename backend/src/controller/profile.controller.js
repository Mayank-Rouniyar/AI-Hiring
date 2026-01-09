import mongoose from "mongoose"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Profile } from "../models/profile.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
const createProfile=asyncHandler(async(req,res)=>{
    const {name,location,primaryRole,otherRoles,aboutMe,experience,college,desiredSalary,currentSalary,links}=req.body
    if(!name||!location||primaryRole||desiredSalary)
    {
        throw new ApiError(401,"Fill all the required parameter")
    }
    let resumepath=null
    if(req.files&&Array.isArray(req.files.resume)&&req.files.resume.length>0)
    {
        resumepath=req.files.resume[0].path
    }
    else
    {
        throw new ApiError(401,"Resume is required")
    }
    let profilepath=null
    if(req.files&&Array.isArray(req.files.profilePicture)&&req.files.profilePicture.length>0)
    {
        profilepath=req.files.profilePicture[0].path
    }
    let resume={url:""}
    if(resumepath)
    {
        resume=await uploadOnCloudinary(resumepath)
    }
    let profilePicture={url:" "}
    if(profilepath)
    {
        profilePicture=await uploadOnCloudinary(profilepath)
    }
    const profile=await Profile.create({
        name,
        location,
        primaryRole,
        otherRoles:otherRoles||[""],
        aboutMe:aboutMe||"",
        experience:experience||"",
        college:college||"",
        desiredSalary,
        currentSalary:currentSalary||0,
        links:links||[""],
        profilePicture:profilePicture.url||"",
        resume:resume.url,
        email,
        contactNo,
    })
    if(!profile)
    {
        throw new ApiError(500,"Some error occured while creating this profile")
    }
    return res.status(200).json(
        new ApiResponse(200,profile,"Profile created successfully")
    )
})
export{
    createProfile
}