import express from "express"
import AuthControllers from "../controllers/auth"

const router = express.Router()

router.post("/logout", AuthControllers.logout)
router.post("/login", AuthControllers.login)
router.post("/signup", AuthControllers.signup)

export default router