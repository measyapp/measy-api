import express from "express"
import authUtils from "../utils/auth"
import metricsController from "../controllers/metrics"

const router = express.Router()

router.get("/", authUtils.verifyJWT, metricsController.index)
router.post("/", authUtils.verifyJWT, metricsController.create)
router.get("/:id", authUtils.verifyJWT, metricsController.read)
router.put("/:id", authUtils.verifyJWT, metricsController.update)
router.delete("/:id", authUtils.verifyJWT, metricsController.remove)

export default router