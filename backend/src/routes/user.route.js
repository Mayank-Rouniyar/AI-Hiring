import Router from "express"
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controller/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
const router=Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",verifyJWT,logoutUser)
router.post("/refreshAccessToken",refreshAccessToken)
export default router