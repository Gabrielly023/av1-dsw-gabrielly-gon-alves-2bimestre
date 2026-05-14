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

/**
 * GET /tarefas - Lista todas as tarefas
 */
router.get("/tasks", TarefaController.criarTaskPrisma);

/**
 * DELETE /tarefas/:id - Remove uma tarefa
 */
router.delete("/tasks/:id", TarefaController.excluirTaskPrisma);

// Exporta o roteador para ser usado no app principal
export default router;
