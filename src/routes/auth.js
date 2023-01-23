import express from "express"
import AuthControllers from "../controllers/auth"
import authUtils from "../utils/auth"
import { verify } from "jsonwebtoken"

const router = express.Router()

router.post("/logout",authUtils.verifyHeader, AuthControllers.logout)
router.post("/login",authUtils.verifyHeader, AuthControllers.login)
router.post("/signup",authUtils.verifyHeader, AuthControllers.signup)
router.patch("/resetPassword",authUtils.verifyHeader, AuthControllers.resetPassword)
router.get("/resetPassword/:email",authUtils.verifyHeader, AuthControllers.getTokenResetPassword)


export default router