# Gestion de Pedidos - Actividad 6

API REST hecha con Node.js y Express para la materia Herramientas de Software II.

## Como ejecutar

```bash
npm install
npm start
```

La API queda en http://localhost:3000

## Endpoints

- `POST /pedidos` - crear pedido
- `GET /pedidos` - listar pedidos (filtros: estado, cliente, fecha; ordenar: ordenarPor, direccion)

Al crear un pedido (POST) la API agrega automaticamente `estado: "Pendiente"` y `fechaCreacion`.
- `GET /pedidos/:id` - ver un pedido
- `PATCH /pedidos/:id/estado` - cambiar estado

Estados: Pendiente, En Proceso, Enviado, Entregado

## Pruebas

```bash
npm test
```

## Repositorio

https://github.com/Joser1609/gestion-pedidos

Evidencias de pruebas: `EVIDENCIAS.md`
