// ========================================
// CONTROLLER - CAMADA DE CONTROLE
// ========================================
// Esta camada é responsável por:
// - Receber as requisições HTTP
// - Validar os dados recebidos
// - Chamar os métodos do Model
// - Retornar as respostas adequadas

import * as TarefaModel from "../models/tarefaModel.js";

function validarId(parametroId) {
  const idNumero = Number(parametroId);

  if (!Number.isInteger(idNumero) || idNumero <= 0) {
    return null;
  }

  return idNumero;
}

function validarTextoOpcional(valor, nomeCampo) {
  if (valor === undefined) {
    return null;
  }

  if (valor === null) {
    return null;
  }

  if (typeof valor !== "string") {
    throw new Error(`${nomeCampo} deve ser uma string`);
  }

  return valor;
}

function validarBooleanoOpcional(valor, nomeCampo) {
  if (valor === undefined) {
    return null;
  }

  if (typeof valor !== "boolean") {
    throw new Error(`${nomeCampo} deve ser booleano`);
  }

  return valor;
}

function validarCategoriaIdOpcional(valor) {
  if (valor === undefined || valor === null) {
    return valor ?? null;
  }

  if (!Number.isInteger(valor)) {
    throw new Error("categoryId deve ser um número inteiro");
  }

  return valor;
}

// ========================================
// CONTROLLERS USANDO PRISMA
// ========================================

/**
 * Lista todas as tasks
 * @route GET /tasks
 */
export async function listar(req, res) {
  try {
    const tasks = await TarefaModel.listar();

    return res.json({
      total: tasks.length,
      tasks
    });
  } catch (error) {
    console.error("Erro ao listar tasks:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao listar tasks", detalhes: error.message });
  }
}

/**
 * Busca uma task pelo id usando Prisma
 * @route GET /tasks/:id
 */
export async function buscarPorId(req, res) {
  try {
    const idNumero = validarId(req.params.id);

    if (idNumero === null) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const task = await TarefaModel.buscarPorId(idNumero);

    if (!task) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    return res.json(task);
  } catch (error) {
    console.error("Erro ao buscar task por ID:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao buscar task", detalhes: error.message });
  }
}

/**
 * Cria uma nova task usando Prisma
 * @route POST /tasks
 */
export async function criar(req, res) {
  try {
    const { title, description, completed, categoryId } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ erro: "Título é obrigatório" });
    }

    validarTextoOpcional(description, "Descrição");
    validarBooleanoOpcional(completed, "completed");
    validarCategoriaIdOpcional(categoryId);

    const taskCriada = await TarefaModel.criar({
      title,
      description,
      completed,
      categoryId
    });

    return res.status(201).json({
      mensagem: "Task criada com sucesso!",
      task: taskCriada
    });
  } catch (error) {
    console.error("Erro ao criar task:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao criar task", detalhes: error.message });
  }
}

/**
 * Atualiza uma task usando Prisma
 * @route PUT /tasks/:id
 */
export async function atualizar(req, res) {
  try {
    const idNumero = validarId(req.params.id);

    if (idNumero === null) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const { title, description, completed, categoryId } = req.body;

    if (
      title === undefined &&
      description === undefined &&
      completed === undefined &&
      categoryId === undefined
    ) {
      return res.status(400).json({
        erro: "Envie ao menos um campo para atualização"
      });
    }

    if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
      return res.status(400).json({ erro: "Título deve ser uma string não vazia" });
    }

    validarTextoOpcional(description, "Descrição");
    validarBooleanoOpcional(completed, "completed");
    validarCategoriaIdOpcional(categoryId);

    const taskAtualizada = await TarefaModel.atualizar(idNumero, {
      title,
      description,
      completed,
      categoryId
    });

    if (!taskAtualizada) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    return res.json({
      mensagem: "Task atualizada com sucesso!",
      task: taskAtualizada
    });
  } catch (error) {
    console.error("Erro ao atualizar task:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao atualizar task", detalhes: error.message });
  }
}

/**
 * Remove uma task pelo id usando Prisma
 * @route DELETE /tasks/:id
 */
export async function excluir(req, res) {
  try {
    const idNumero = validarId(req.params.id);

    if (idNumero === null) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const taskRemovida = await TarefaModel.excluir(idNumero);

    if (!taskRemovida) {
      return res.status(404).json({ erro: "Task não encontrada" });
    }

    return res.json({
      mensagem: "Task excluída com sucesso!",
      task: taskRemovida
    });
  } catch (error) {
    console.error("Erro ao excluir task:", error);
    return res
      .status(500)
      .json({ erro: "Erro ao excluir task", detalhes: error.message });
  }
}