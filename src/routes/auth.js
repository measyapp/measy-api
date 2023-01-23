import express from "express"
import AuthControllers from "../controllers/auth"
import authUtils from "../utils/auth"

const router = express.Router()

router.post("/logout", AuthControllers.logout)
router.post("/login", AuthControllers.login)
router.post("/signup", AuthControllers.signup)
router.patch("/resetPassword", AuthControllers.resetPassword)
router.get("/resetPassword/:email", AuthControllers.getTokenResetPassword)


export default router