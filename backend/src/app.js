import express from "express"
const app=express()
app.use(express.json({limit:"16kb"}))
import profileRouter from "./routes/profile.route.js"
app.use("/api/v1/profile",profileRouter)
export  {app}