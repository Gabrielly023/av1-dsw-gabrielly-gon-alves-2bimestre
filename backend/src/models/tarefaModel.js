// ========================================
// MODEL - CAMADA DE DADOS COM PRISMA
// ========================================
// Esta camada é responsável por:
// - Realizar operações CRUD no banco de dados usando Prisma
// - Implementar a lógica de negócio

import { prisma } from "../config/prisma.js";

const taskInclude = {
  category: true
};

function tratarErroRegistroNaoEncontrado(error) {
  if (error?.code === "P2025") {
    return null;
  }

  throw error;
}

function montarDadosCriacao(dados) {
  return {
    title: dados.title.trim(),
    description:
      typeof dados.description === "string"
        ? dados.description.trim()
        : dados.description ?? null,
    completed: typeof dados.completed === "boolean" ? dados.completed : false,
    categoryId:
      dados.categoryId === undefined || dados.categoryId === null
        ? null
        : dados.categoryId
  };
}

function montarDadosAtualizacao(dados) {
  const data = {};

  if (dados.title !== undefined) {
    data.title = dados.title.trim();
  }

  if (dados.description !== undefined) {
    data.description =
      typeof dados.description === "string"
        ? dados.description.trim()
        : dados.description;
  }

  if (dados.completed !== undefined) {
    data.completed = dados.completed;
  }

  if (dados.categoryId !== undefined) {
    data.categoryId = dados.categoryId;
  }

  return data;
}

export async function listar() {
  try {
    return await prisma.task.findMany({
      include: taskInclude,
      orderBy: {
        id: "asc"
      }
    });
  } catch (error) {
    return tratarErroRegistroNaoEncontrado(error);
  }
}

export async function buscarPorId(id) {
  try {
    return await prisma.task.findUnique({
      where: {
        id
      },
      include: taskInclude
    });
  } catch (error) {
    return tratarErroRegistroNaoEncontrado(error);
  }
}

export async function criar(dados) {
  try {
    return await prisma.task.create({
      data: montarDadosCriacao(dados),
      include: taskInclude
    });
  } catch (error) {
    return tratarErroRegistroNaoEncontrado(error);
  }
}

export async function atualizar(id, dados) {
  try {
    return await prisma.task.update({
      where: {
        id
      },
      data: montarDadosAtualizacao(dados),
      include: taskInclude
    });
  } catch (error) {
    return tratarErroRegistroNaoEncontrado(error);
  }
}

export async function excluir(id) {
  try {
    return await prisma.task.delete({
      where: {
        id
      },
      include: taskInclude
    });
  } catch (error) {
    return tratarErroRegistroNaoEncontrado(error);
  }
}