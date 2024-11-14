const prisma = require('../prisma/client');
const { z } = require('zod');
const { criarUsuarioValidator } = require('../validators/usuarioValidator');
console.log(process.env.DATABASE_URL);


const criarUsuario = async (req, res) => {
  try {
    const { nome, email } = criarUsuarioValidator.parse(req.body);

    const usuario = await prisma.usuario.create({
      data: { nome, email },
    });

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  
  try {
    await prisma.usuario.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao deletar usuário' });
  }
};

module.exports = { criarUsuario, listarUsuarios, deletarUsuario };
