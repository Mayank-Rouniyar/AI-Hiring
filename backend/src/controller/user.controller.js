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
const loginUser=asyncHandler(async(req,res)=>{
 const {email,username,password}=req.body
  if(!password)
  {
    throw new ApiError(401,"Password field is must")
  }
  if(!email&&!username)
  {
    throw new ApiError(401,"Username or password is required")
  }
  const user=await User.findOne({
    $or:[{username},{email}]
  }).select("+password")
  if(!user)
  {
    throw new ApiError(404,"User not found")
  }
  const checkPassword=await user.isPasswordCorrect(password)
  if(!checkPassword)
  {
    throw new ApiError(401,"It's wrong password")
  }
  const accessToken=user.generateAccessToken()
  const refreshToken=user.generateRefreshToken()
  console.log("Refresh Token is",refreshToken)
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  
  const safeUser={
    _id:user._id,
    name:user.name,
    username:user.username,
    email:user.email,
    role:user.role
  }
  const options={
        httpOnly:true,
        secure:true,
        sameSite:"Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 
    }
  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(new ApiResponse(200,{safeUser,accessToken},"User logged in successfully"))
})
const logoutUser=asyncHandler(async(req,res)=>{
   const userId=req.user?._id
   if(!userId)
   {
    throw new ApiError(401,"The given user is undefined or null or empty")
   }
   await User.findByIdAndUpdate(userId,
    { $set:
      {
      refreshToken: undefined
      }
    },
      {
      new : true
      })
      const options={
      httpOnly:true,
      secure:true
      }
   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)
   .json(new ApiResponse(200,{},"User Successfully Logged Out"))
})
export{
    registerUser,
    loginUser,
    logoutUser
}