import mongoose from "mongoose"
const applicationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    jobId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    },
    status:{
        type:String,
        enum:["Applied","Shortlisted","Rejected"],
        default:"Applied"
    },
    matchScore:{
        type:Number,
    },
},
{
    timestamps:true,
}
)
export const Application=mongoose.model("Application",applicationSchema)