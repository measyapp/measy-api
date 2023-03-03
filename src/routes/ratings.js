import express from "express"
import authUtils from "../utils/auth"
import avaliacoesController from "../controllers/ratings"

const router = express.Router()

router.get("/", authUtils.verifyJWT, avaliacoesController.index)
router.post("/", authUtils.verifyJWT, avaliacoesController.create)
router.get("/:id", authUtils.verifyJWT, avaliacoesController.read)
router.get("/byMetric/:id", authUtils.verifyJWT, avaliacoesController.readByMetrics)
router.put("/:id", authUtils.verifyJWT, avaliacoesController.update)
router.delete("/:id", authUtils.verifyJWT, avaliacoesController.remove)

export default router