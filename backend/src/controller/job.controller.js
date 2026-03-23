import mongoose from "mongoose"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
const createJob=asyncHandler=(async(req,res)=>{
 if(!req)
  {
    throw new ApiError(401,"Req is not being recieved")
  }
  const {title,organization,location,policy,salary,description,skill,founder,aboutCompany}=req.body
  
})
export {
    createJob
}
