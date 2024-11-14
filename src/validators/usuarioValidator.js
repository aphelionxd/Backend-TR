const { z } = require('zod');

const criarUsuarioValidator = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
});

module.exports = { criarUsuarioValidator };
