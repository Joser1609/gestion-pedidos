const ESTADOS_VALIDOS = ['Pendiente', 'En Proceso', 'Enviado', 'Entregado'];

let listaPedidos = [];
let contadorId = 1;

function formatearFecha(fecha) {
  const d = new Date(fecha);
  const p = (n) => String(n).padStart(2, '0');
  return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear();
}

function limpiarDatos() {
  listaPedidos = [];
  contadorId = 1;
}

function pedidoPublico(pedido) {
  if (!pedido) return pedido;
  const copia = { ...pedido };
  delete copia.fechaOrden;
  return copia;
}

function crearPedido(datos) {
  const ahora = new Date();
  const nuevo = {
    id: contadorId++,
    fechaCreacion: formatearFecha(ahora),
    estado: 'Pendiente',
    cliente: datos.cliente,
    productos: datos.productos,
    direccionEnvio: datos.direccionEnvio,
    fechaOrden: ahora.getTime()
  };

  listaPedidos.push(nuevo);
  return nuevo;
}

function obtenerPedidos(filtros) {
  let resultado = listaPedidos.slice();

  if (filtros.estado) {
    resultado = resultado.filter((p) => p.estado === filtros.estado);
  }

  if (filtros.cliente) {
    const texto = filtros.cliente.toLowerCase();
    resultado = resultado.filter((p) => p.cliente.nombre.toLowerCase().includes(texto));
  }

  if (filtros.fecha) {
    resultado = resultado.filter((p) => p.fechaCreacion.includes(filtros.fecha));
  }

  const campo = filtros.ordenarPor || 'fechaCreacion';
  const asc = filtros.direccion === 'asc';

  resultado.sort((a, b) => {
    if (campo === 'estado') {
      return asc ? a.estado.localeCompare(b.estado) : b.estado.localeCompare(a.estado);
    }
    return asc ? a.fechaOrden - b.fechaOrden : b.fechaOrden - a.fechaOrden;
  });

  return resultado;
}

function obtenerPedidoPorId(id) {
  return listaPedidos.find((p) => p.id === id);
}

function actualizarEstado(id, estado) {
  const pedido = obtenerPedidoPorId(id);
  if (!pedido) return null;

  const ahora = new Date();
  pedido.estado = estado;
  pedido.fechaActualizacion = formatearFecha(ahora);
  return pedido;
}

module.exports = {
  ESTADOS_VALIDOS,
  limpiarDatos,
  pedidoPublico,
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarEstado
};
