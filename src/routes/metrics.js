import express from "express"
import authUtils from "../utils/auth"
import metricsController from "../controllers/metrics"

const router = express.Router()

router.get("/", authUtils.verifyAuth, metricsController.index)
router.post("/", authUtils.verifyAuth, metricsController.create)
router.get("/:id", authUtils.verifyAuth, metricsController.read)
router.put("/:id", authUtils.verifyAuth, metricsController.update)
router.delete("/:id", authUtils.verifyAuth, metricsController.remove)

export default router