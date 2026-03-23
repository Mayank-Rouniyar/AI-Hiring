import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser=asyncHandler(async(req,res)=>{
    if(!req.body)
    {
       throw new ApiError(400,"Body is required")
    }
    const{name,email,username,password}=req.body
    const {role}=req.body
    if(!name?.trim()||!email?.trim()||!username?.trim()||!password?.trim()||!role?.trim())
    {
       throw new ApiError(401,"All fields are required to register")
    }
    const existedUser=await User.findOne({
      $or:[{email},{username}]
    })
    if(existedUser)
    {
      throw new ApiError(409,"User Already existed can't register")
    }
    const user=await User.create({
     name:name,
     email:email,
     username:username,
     password:password,
     role:role||"Candidate"
    })
    const createdUser=await User.findById(user._id).select(
      "-password -refreshToken"
    )
    if(!createdUser)
    {
      throw new ApiError(500,"Something went wrong while creating the user")
    }
    return res
    .status(201)
    .json(new ApiResponse(201,createdUser,"User successfully registered"))
})
export{
    registerUser
}