import express from "express";
import { criarpontosController,
            resgatarPontosPorCodigoController,
            statsClientePontuandoController,
            statsClienteComprasController,
            statsClientepontoresController
 } from "../controllers/ponto.controller.js";

const router = express.Router();

router.post("/", criarpontosController);

router.get("/codigo/:codigo", resgatarPontosPorCodigoController);

router.get("/estatisticas", statsClientePontuandoController);

router.get("/estatisticas/compras", statsClienteComprasController);

router.get("/estatisticas/pontos-resgatados", statsClientepontoresController);

export default router;
