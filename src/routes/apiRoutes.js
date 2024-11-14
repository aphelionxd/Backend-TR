const express = require('express');
const router = express.Router();

const {
  criarUsuario,
  listarUsuarios,
  deletarUsuario,
} = require('../controllers/usuarioController');

const {
  criarTarefa,
  listarTarefas,
  atualizarTarefa,
  deletarTarefa,
} = require('../controllers/tarefaController');

const {
  criarCategoria,
  listarCategorias,
} = require('../controllers/categoriaController');

// Rotas de usuários
router.post('/usuarios', criarUsuario);
router.get('/usuarios', listarUsuarios);
router.delete('/usuarios/:id', deletarUsuario);

// Rotas de tarefas
router.post('/tarefas', criarTarefa);
router.get('/tarefas', listarTarefas);
router.put('/tarefas/:id', atualizarTarefa);
router.delete('/tarefas/:id', deletarTarefa);

// Rotas de categorias
router.post('/categorias', criarCategoria);
router.get('/categorias', listarCategorias);

module.exports = router;
