const express = require('express');
const pedidosRouter = require('./routes/pedidos');

const app = express();

app.use(express.json());

app.use('/pedidos', pedidosRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
