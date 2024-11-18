const prisma = require('../prisma/client');
const { z } = require('zod');
const { criarTarefaValidator } = require('../validators/tarefaValidator');

const criarTarefa = async (req, res) => {
  try {
    // Verifica o conteúdo do corpo da requisição para diagnóstico
    console.log(req.body); // Verifique os dados que estão chegando na requisição

    // Validando os dados com o Zod
    const { titulo, descricao, dataEntrega, usuarioId, categoriaId } = criarTarefaValidator.parse(req.body);

    // Caso a dataEntrega esteja presente, converte para um objeto Date
    const dataEntregaFormatada = dataEntrega ? new Date(dataEntrega) : null;

    // Cria a tarefa no banco de dados
    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao,
        dataEntrega: dataEntregaFormatada,
        usuarioId,
        categoriaId
      }
    });

    // Retorna a tarefa criada
    res.status(201).json(tarefa);
  } catch (error) {
    console.error(error); // Log para entender o erro
    res.status(400).json({ error: error.message });
  }
};

const listarTarefas = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany();
    return res.status(200).json(tarefas);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

const atualizarTarefa = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, dataEntrega, categoriaId, usuarioId } = req.body;

  try {
    const tarefa = await prisma.tarefa.update({
      where: { id: parseInt(id) },
      data: { titulo, descricao, dataEntrega, categoriaId, usuarioId },
    });

    return res.status(200).json(tarefa);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao atualizar tarefa' });
  }
};

const deletarTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.tarefa.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao deletar tarefa' });
  }
};

module.exports = { criarTarefa, listarTarefas, atualizarTarefa, deletarTarefa };
