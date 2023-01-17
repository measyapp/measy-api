import express from "express";
import colaboradoresRouter from "./colaboradores"
import projetosRouter from "./projetos"
import metricsRouter from "./metrics"
import ratingsRouter from "./ratings"
import AuthRouter from "./auth"

const router = express.Router();

router.use('/colaboradores', colaboradoresRouter)
router.use('/projetos', projetosRouter)
router.use('/metrics', metricsRouter)
router.use('/ratings', ratingsRouter)
router.use('/auth', AuthRouter)

export default router