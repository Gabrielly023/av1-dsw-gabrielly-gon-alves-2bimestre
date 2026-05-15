// ========================================
// ROUTES - CAMADA DE ROTAS
// ========================================
// Esta camada é responsável por:
// - Definir as rotas da aplicação
// - Mapear URLs para os controllers correspondentes
// - Organizar as rotas por recurso/entidade

import express from "express";
import * as TarefaController from "../controllers/tarefaController.js";

// Cria um roteador do Express
const router = express.Router();

// ========================================
// DEFINIÇÃO DAS ROTAS DE TAREFAS
// ========================================

router.get("/tasks", TarefaController.listar);

router.get("/tasks/:id", TarefaController.buscarPorId);

router.post("/tasks", TarefaController.criar);

router.put("/tasks/:id", TarefaController.atualizar);

router.delete("/tasks/:id", TarefaController.excluir);

// Exporta o roteador para ser usado no app principal
export default router;
