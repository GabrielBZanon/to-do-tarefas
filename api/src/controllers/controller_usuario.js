const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cadastrarUsuario = async (req, res) => {
  const { nome, email } = req.body;

  try {
    const novoUsuario = await prisma.usuario.create({
      data: { nome, email },
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao cadastrar usuário', detalhes: error.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: { tarefas: true }
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários', detalhes: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  try {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nome, email }
    });
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar usuário', detalhes: error.message });
  }
};

const excluirUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.usuario.delete({
      where: { id: Number(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao excluir usuário', detalhes: error.message });
  }
};


module.exports = {
  cadastrarUsuario,
  listarUsuarios,
  atualizarUsuario,
  excluirUsuario
};
