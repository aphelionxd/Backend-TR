// Importando o Zod
const { z } = require('zod');

// Definindo o validador com Zod
const criarTarefaValidator = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().optional(),
  dataEntrega: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Data de entrega inválida',
  }).optional(),
  usuarioId: z.number().int(),
  categoriaId: z.number().int(),
});

// Controlador para criar tarefa
const criarTarefa = async (req, res) => {
  try {
    // Validando os dados da requisição com o validador
    const { titulo, descricao, dataEntrega, usuarioId, categoriaId } = criarTarefaValidator.parse(req.body);

    // Se a dataEntrega foi fornecida, converte para um objeto Date
    const dataEntregaFormatada = dataEntrega ? new Date(dataEntrega) : null;

    // Criando a tarefa no banco de dados usando Prisma
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
    // Caso ocorra algum erro (como erro de validação), retorna o erro
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
