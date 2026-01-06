import mongoose from "mongoose"
const profileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    primaryRoles:{
        type:String,
        required:true,
    },
    otherRoles:{
        type:[String],
    },
    aboutMe:{
        type:String,
    },
    experience:{
        type:String,
    },
    college:{
        type:String,
    },
},{
    timestamps:true,
})
export const Profile=mongoose.model("Profile",profileSchema)