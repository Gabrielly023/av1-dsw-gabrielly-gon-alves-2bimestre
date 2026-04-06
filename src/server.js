import express from "express";
import { criarTarefa, obterTarefas } from "./tarefas.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá mundo!");
});

app.get("/tarefas", (req, res) => {
  const tarefas = obterTarefas();
  console.log("TESTANDO");
  res.json(tarefas);
});

app.post("/tarefas", (req, res) => {
  const { descricao } = req.body;

  if (!descricao) {
    return res.status(400).json({ erro: "Descrição é obrigatória" });
  }

  criarTarefa(descricao);
  console.log(`✓ Tarefa criada: "${descricao}"`);
  res.status(201).json({ mensagem: "Tarefa criada com sucesso!" });
});

app.patch("/tarefas/:id", (req, res) => {
  const { id } = req.params.id;

  const { descricao } = req.body;
});

app.delete("/tarefas/:id", (req, res) => {
  const { id } = req.params.id;

  tarefas.splice(id, 1);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
