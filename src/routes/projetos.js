import express from "express"
import authUtils from "../utils/auth"
import projetosController from "../controllers/projetos"

const router = express.Router()

router.get("/", authUtils.verifyJWT ,projetosController.index)
router.post("/", authUtils.verifyJWT ,projetosController.create)
router.get("/:id", authUtils.verifyJWT ,projetosController.read)
router.put("/:id", authUtils.verifyJWT ,projetosController.update)
router.delete("/:id", authUtils.verifyJWT ,projetosController.remove)

export default router