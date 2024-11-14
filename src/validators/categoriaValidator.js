const { z } = require('zod');

const criarCategoriaValidator = z.object({
  nome: z.string().min(3),
});

module.exports = { criarCategoriaValidator };
