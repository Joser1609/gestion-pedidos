const express = require('express');
const {
  ESTADOS_VALIDOS,
  pedidoPublico,
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarEstado
} = require('../models/pedido');

const router = express.Router();

function validarNuevoPedido(body) {
  const errores = [];

  if (!body.cliente || !body.cliente.nombre || !body.cliente.email) {
    errores.push('Falta nombre o email del cliente');
  }

  if (!body.productos || body.productos.length === 0) {
    errores.push('Debe agregar al menos un producto');
  } else {
    for (let i = 0; i < body.productos.length; i++) {
      const p = body.productos[i];
      if (!p.nombre || !p.cantidad || p.cantidad < 1) {
        errores.push('Producto ' + (i + 1) + ': revise nombre y cantidad');
      }
    }
  }

  if (!body.direccionEnvio || !body.direccionEnvio.calle || !body.direccionEnvio.ciudad) {
    errores.push('Falta la direccion de envio');
  }

  return errores;
}

router.post('/', (req, res) => {
  const errores = validarNuevoPedido(req.body);
  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  const pedido = crearPedido(req.body);
  res.status(201).json(pedidoPublico(pedido));
});

router.get('/', (req, res) => {
  const lista = obtenerPedidos({
    estado: req.query.estado,
    cliente: req.query.cliente,
    fecha: req.query.fecha,
    ordenarPor: req.query.ordenarPor,
    direccion: req.query.direccion
  });

  res.json({
    total: lista.length,
    pedidos: lista.map(pedidoPublico)
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = obtenerPedidoPorId(id);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  res.json(pedidoPublico(pedido));
});

router.patch('/:id/estado', (req, res) => {
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ errores: ['Debe enviar el estado'] });
  }

  if (!ESTADOS_VALIDOS.includes(estado)) {
    return res.status(400).json({
      errores: ['Estado no valido. Use: ' + ESTADOS_VALIDOS.join(', ')]
    });
  }

  const pedido = actualizarEstado(parseInt(req.params.id), estado);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  res.json(pedidoPublico(pedido));
});

module.exports = router;
