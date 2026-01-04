import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"
const connectDB=async ()=>{
    try{
        const connection_instance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    }
    catch(error)
        {
         console.log("Mongo DB Connection failed \n",error)
         process.exit(1)
    } 
}
export default connectDB