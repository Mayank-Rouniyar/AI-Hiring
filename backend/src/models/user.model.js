import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Candidate","Recruiter"],
        required:true
    }
},
{
    timestamps:true,
})
userSchema.pre("save",async (next)=>{
   if(this.isModified("password"))
   {
      this.password=bcrypt.hash(password,10)
      next()
   }
})
userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        name:this.name,
        email:this.email,
        username:this.username,
        role:this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.refreshAccessToken=function(){
    return jwt.sign({
        _id:this._id,
    },
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
}
)
}
export const User=mongoose.model("User".userSchema)