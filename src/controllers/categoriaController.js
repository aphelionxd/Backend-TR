const prisma = require('../prisma/client');
const { z } = require('zod');
const { criarCategoriaValidator } = require('../validators/categoriaValidator');

const criarCategoria = async (req, res) => {
  try {
    const { nome } = criarCategoriaValidator.parse(req.body);

    const categoria = await prisma.categoria.create({
      data: { nome },
    });

    return res.status(201).json(categoria);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const listarCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

module.exports = { criarCategoria, listarCategorias };
