import express from "express"
import authUtils from "../utils/auth"
import colaboradoresController from "../controllers/colaboradores"

const router = express.Router()

router.get("/",authUtils.verifyJWT,colaboradoresController.index)
router.post("/", authUtils.verifyJWT ,colaboradoresController.create)
router.get("/:id", authUtils.verifyJWT ,colaboradoresController.read)
router.put("/:id", authUtils.verifyJWT ,colaboradoresController.update)
router.delete("/:id", authUtils.verifyJWT ,colaboradoresController.remove)

export default router