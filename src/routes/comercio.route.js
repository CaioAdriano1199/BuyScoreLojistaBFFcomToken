import express from "express";
import {
  buscarComercioPorIdController,
  criarComercioController,
  listarTodosComerciosController,
  top5ComerciosPorSetorController,
  top5SetoresPrincipaisController,
    top5CadaSetorController,
    top5MultiplosSetoresController,
    buscarmeucomercioController,
    atualizarComercioController
} from "../controllers/comercio.controller.js";

const router = express.Router();

router.get("/:id", buscarComercioPorIdController);

router.post("/", criarComercioController);

router.put("/", atualizarComercioController);

router.get("/", buscarmeucomercioController);

router.get("/all", listarTodosComerciosController);

router.get("/top5/setor/:seguimento", top5ComerciosPorSetorController);

router.get("/top5/setores-principais", top5SetoresPrincipaisController);

router.get("/top5/cada-setor", top5CadaSetorController);

router.get("/top5/multiplos-setores", top5MultiplosSetoresController);

export default router;
