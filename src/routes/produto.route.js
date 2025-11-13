import express from "express";
import { produtoIDController, 
    removerProdutoController, 
    listarProdutosController, 
    ativarProdutoController,
    desativarProdutoController,
    atualizarProdutoController,
    criarProdutoController,
    meusProdutosController
 } from "../controllers/produto.controller.js";

const router = express.Router();

router.get("/all", listarProdutosController);

router.get("/meuprod", meusProdutosController);

router.put("/ativar/:id", ativarProdutoController);

router.put("/desativar/:id", desativarProdutoController);

router.put("/", atualizarProdutoController);

router.post("/", criarProdutoController);

router.delete("/:id", removerProdutoController);

router.get("/:id", produtoIDController);

export default router;
