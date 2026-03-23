import express from "express"
const app=express()
app.use(express.json({limit:"16kb"}))
import userRouter from "./routes/user.route.js"
app.use("/api/v1/user",userRouter)
import profileRouter from "./routes/profile.route.js"
app.use("/api/v1/profile",profileRouter)
export  {app}