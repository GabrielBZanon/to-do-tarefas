const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cadastrarTarefa = async (req, res) => {
  const { descricao, setor, prioridade, usuarioId } = req.body;

  try {
    const novaTarefa = await prisma.tarefa.create({
      data: {
        descricao,
        setor,
        prioridade,
        usuario: { connect: { id: usuarioId } },
      },
    });
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao cadastrar tarefa', detalhes: error.message });
  }
};

const listarTarefas = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      include: { usuario: true }
    });
    res.status(200).json(tarefas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar tarefas', detalhes: error.message });
  }
};

const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).json(tarefaAtualizada);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar status da tarefa', detalhes: error.message });
  }
};

const excluirTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tarefa.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao excluir tarefa', detalhes: error.message });
  }
};

module.exports = {
  cadastrarTarefa,
  listarTarefas,
  atualizarStatus,
  excluirTarefa
};
