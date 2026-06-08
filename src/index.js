const app = require('./app');

const puerto = process.env.PORT || 3000;

app.listen(puerto, () => {
  console.log('Servidor corriendo en puerto ' + puerto);
});
