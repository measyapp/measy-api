import express from "express"
import authUtils from "../utils/auth"
import ratingsController from "../controllers/ratings"

const router = express.Router()

router.get("/", authUtils.verifyAuth, ratingsController.index)

export default router