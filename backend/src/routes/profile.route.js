import Router from "express"
import { createProfile } from "../controller/profile.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
const router=Router()
router.route("/create").post(
    upload.fields([
     {
        name:"resume",
        maxCount: 1
     },
     {
        name: "profilePicture",
        maxCount: 1
     }
    ]),
    createProfile
)
export default router