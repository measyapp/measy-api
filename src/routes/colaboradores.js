import express from "express"
import authUtils from "../utils/auth"
import colaboradoresController from "../controllers/colaboradores"

const router = express.Router()

router.get("/", authUtils.verifyAuth ,colaboradoresController.index)
router.post("/", authUtils.verifyAuth ,colaboradoresController.create)
router.get("/:id", authUtils.verifyAuth ,colaboradoresController.read)
router.put("/:id", authUtils.verifyAuth ,colaboradoresController.update)
router.delete("/:id", authUtils.verifyAuth ,colaboradoresController.remove)

export default router