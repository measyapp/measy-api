import express from "express"
import authUtils from "../utils/auth"
import indicacoesController from "../controllers/indicacoes"

const router = express.Router()

router.get("/", authUtils.verifyJWT, indicacoesController.index)
router.post("/", authUtils.verifyJWT, indicacoesController.create)
router.post("/indicacao", authUtils.verifyJWT, indicacoesController.indicateMetric)
router.get("/:id", authUtils.verifyJWT, indicacoesController.read)
router.put("/:id", authUtils.verifyJWT, indicacoesController.update)
router.delete("/:id", authUtils.verifyJWT, indicacoesController.remove)

export default router