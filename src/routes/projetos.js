import express from "express"
import authUtils from "../utils/auth"
import projetosController from "../controllers/projetos"

const router = express.Router()

router.get("/", authUtils.verifyAuth ,projetosController.index)
router.post("/", authUtils.verifyAuth ,projetosController.create)
router.get("/:id", authUtils.verifyAuth ,projetosController.read)
router.put("/:id", authUtils.verifyAuth ,projetosController.update)
router.delete("/:id", authUtils.verifyAuth ,projetosController.remove)

export default router