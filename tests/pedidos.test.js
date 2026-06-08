const request = require('supertest');
const app = require('../src/app');
const { limpiarDatos } = require('../src/models/pedido');

const pedidoEjemplo = {
  cliente: { nombre: 'Juan Perez', email: 'juan@gmail.com' },
  productos: [{ nombre: 'Laptop', cantidad: 1, precio: 1200 }],
  direccionEnvio: { calle: 'Av. 68 con Cll 100', ciudad: 'Bogota' }
};

beforeEach(() => {
  limpiarDatos();
});

test('crear pedido', async () => {
  const res = await request(app).post('/pedidos').send(pedidoEjemplo);

  expect(res.status).toBe(201);
  expect(res.body.estado).toBe('Pendiente');
  expect(res.body.cliente.nombre).toBe('Juan Perez');
});

test('no permite pedido sin productos', async () => {
  const res = await request(app)
    .post('/pedidos')
    .send({ ...pedidoEjemplo, productos: [] });

  expect(res.status).toBe(400);
});

test('listar pedidos', async () => {
  await request(app).post('/pedidos').send(pedidoEjemplo);
  const res = await request(app).get('/pedidos');

  expect(res.status).toBe(200);
  expect(res.body.total).toBe(1);
});

test('filtrar por estado', async () => {
  const creado = await request(app).post('/pedidos').send(pedidoEjemplo);
  await request(app)
    .patch('/pedidos/' + creado.body.id + '/estado')
    .send({ estado: 'Enviado' });

  const res = await request(app).get('/pedidos?estado=Enviado');
  expect(res.body.total).toBe(1);
});

test('buscar pedido por id', async () => {
  const creado = await request(app).post('/pedidos').send(pedidoEjemplo);
  const res = await request(app).get('/pedidos/' + creado.body.id);

  expect(res.status).toBe(200);
  expect(res.body.id).toBe(creado.body.id);
});

test('pedido inexistente devuelve 404', async () => {
  const res = await request(app).get('/pedidos/999');
  expect(res.status).toBe(404);
});

test('cambiar estado del pedido', async () => {
  const creado = await request(app).post('/pedidos').send(pedidoEjemplo);
  const res = await request(app)
    .patch('/pedidos/' + creado.body.id + '/estado')
    .send({ estado: 'En Proceso' });

  expect(res.status).toBe(200);
  expect(res.body.estado).toBe('En Proceso');
});

test('rechaza estado incorrecto', async () => {
  const creado = await request(app).post('/pedidos').send(pedidoEjemplo);
  const res = await request(app)
    .patch('/pedidos/' + creado.body.id + '/estado')
    .send({ estado: 'Cancelado' });

  expect(res.status).toBe(400);
});
