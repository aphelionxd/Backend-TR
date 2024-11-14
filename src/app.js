require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes/apiRoutes');

console.log("DATABASE_URL:", process.env.DATABASE_URL);


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', routes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
