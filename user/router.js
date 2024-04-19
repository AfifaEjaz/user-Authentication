import express from "express"
const router = express.Router()
import { registeration, login, updatePass, getUser, resetPasswordEmail, resetPass} from "./controller.js"
import checkUserAuth from "../middlewares/auth-middleware.js"


router.use("/updatePassword", checkUserAuth)
router.use("/loggedUser", checkUserAuth)

//Public Routes 
router.post("/signup", registeration)
router.post("/login", login)
router.post("/resetPasswordEmail", resetPasswordEmail)


//Protected Routes
router.post("/updatePassword", updatePass)
router.post("/resetPassword/:id/:token", resetPass)

router.get("/loggedUser", getUser)



export default router