# Evidencias - Actividad 6 Gestion de Pedidos

**Materia:** Herramientas de Software II  
**Integrantes:** (completar nombres)  
**Repositorio:** https://github.com/Joser1609/gestion-pedidos

---

## Proceso general del proyecto

1. Se desarrollo la API REST con Node.js y Express.
2. Se probaron los endpoints manualmente con Postman.
3. Se ejecutaron pruebas automaticas con Jest (`npm test`).
4. Se subio el codigo a GitHub con pipeline CI (GitHub Actions).
5. Se dejo configurada la infraestructura AWS (buildspec.yml y CloudFormation).

---

## REQUISITO 1: Crear pedidos

**Descripcion del requisito:** Los usuarios podran ingresar informacion sobre nuevos pedidos, incluyendo detalles del cliente, productos solicitados, cantidades y direccion de envio.

**Como se cumple:** Mediante el endpoint `POST /pedidos`. El usuario envia un JSON con los datos y la API crea el pedido asignando un ID, estado "Pendiente" y fecha de creacion.

**Endpoint probado:**
- Metodo: POST
- URL: `http://localhost:3000/pedidos`

**JSON enviado:**
```json
{
  "cliente": {
    "nombre": "Juan Perez",
    "email": "juan@gmail.com"
  },
  "productos": [
    { "nombre": "Laptop", "cantidad": 1, "precio": 1200 },
    { "nombre": "Mouse", "cantidad": 2, "precio": 25 }
  ],
  "direccionEnvio": {
    "calle": "Av. 68 con Cll 100",
    "ciudad": "Bogota"
  }
}
```

**Resultado obtenido:** Codigo HTTP **201 Created**. La respuesta incluye el pedido creado con `estado: "Pendiente"` y `fechaCreacion`.

**Explicacion resumida:** Se verifico que la API permite registrar pedidos con todos los datos exigidos (cliente, productos, cantidades y direccion). El sistema responde correctamente y asigna el estado inicial y la fecha de forma automatica.

### [INSERTAR CAPTURA 1]
Captura de Postman: POST /pedidos con Body JSON y respuesta 201.

---

## REQUISITO 2: Visualizar pedidos

**Descripcion del requisito:** Los usuarios podran ver una lista de todos los pedidos, con la capacidad de filtrar y ordenar por diferentes criterios (fecha de creacion, estado).

**Como se cumple:** Mediante el endpoint `GET /pedidos` con parametros opcionales en la URL.

### 2.1 Listar todos los pedidos

**Endpoint probado:**
- Metodo: GET
- URL: `http://localhost:3000/pedidos`

**Resultado obtenido:** Codigo HTTP **200 OK** con la lista de pedidos y el total.

**Explicacion resumida:** La API devuelve todos los pedidos registrados en formato JSON.

### [INSERTAR CAPTURA 2]
Captura de Postman: GET /pedidos mostrando la lista completa.

---

### 2.2 Filtrar por estado

**Endpoint probado:**
- Metodo: GET
- URL: `http://localhost:3000/pedidos?estado=Pendiente`

**Resultado obtenido:** Codigo HTTP **200 OK** mostrando solo pedidos en estado Pendiente.

**Explicacion resumida:** El filtro por estado funciona usando el parametro `estado` en la URL. Tambien se probo con `estado=En Proceso` despues de actualizar un pedido.

### [INSERTAR CAPTURA 3]
Captura de Postman: GET /pedidos?estado=Pendiente (o En Proceso).

---

### 2.3 Ordenar por fecha de creacion

**Endpoint probado:**
- Metodo: GET
- URL: `http://localhost:3000/pedidos?ordenarPor=fechaCreacion&direccion=desc`

**Resultado obtenido:** Codigo HTTP **200 OK** con pedidos ordenados del mas reciente al mas antiguo.

**Explicacion resumida:** El ordenamiento por fecha de creacion funciona con los parametros `ordenarPor` y `direccion`.

### [INSERTAR CAPTURA 4]
Captura de Postman: GET con ordenamiento por fecha.

---

## REQUISITO 3: Actualizar el estado de los pedidos

**Descripcion del requisito:** La plataforma permitira actualizar el estado de un pedido a traves de diferentes etapas: Pendiente, En Proceso, Enviado y Entregado.

**Como se cumple:** Mediante el endpoint `PATCH /pedidos/:id/estado`.

### 3.1 Cambiar a "En Proceso"

**Endpoint probado:**
- Metodo: PATCH
- URL: `http://localhost:3000/pedidos/1/estado`
- Body: `{ "estado": "En Proceso" }`

**Resultado obtenido:** Codigo HTTP **200 OK** con el pedido actualizado.

### [INSERTAR CAPTURA 5]
Captura de Postman: PATCH cambiando estado a En Proceso.

---

### 3.2 Cambiar a "Entregado"

**Endpoint probado:**
- Metodo: PATCH
- URL: `http://localhost:3000/pedidos/1/estado`
- Body: `{ "estado": "Entregado" }`

**Resultado obtenido:** Codigo HTTP **200 OK** con `"estado": "Entregado"`.

**Explicacion resumida:** Se verifico que el pedido puede avanzar por las etapas del proceso. La API valida que solo se usen estados permitidos y rechaza valores incorrectos con codigo 400.

### [INSERTAR CAPTURA 6]
Captura de Postman: PATCH con estado Entregado.

---

## EVIDENCIA DEL PROCESO DEVOPS

### Pruebas unitarias automaticas

**Comando:** `npm test`  
**Resultado:** 8 pruebas pasando correctamente.

**Explicacion resumida:** Las pruebas automaticas validan la creacion, listado, filtrado, busqueda por ID y actualizacion de estado sin intervencion manual.

### [INSERTAR CAPTURA 7]
Captura de terminal con resultado de npm test.

---

### Integracion Continua (GitHub Actions)

**Repositorio:** https://github.com/Joser1609/gestion-pedidos/actions

**Explicacion resumida:** Cada vez que se sube codigo a GitHub, el pipeline ejecuta automaticamente las pruebas y construye la imagen Docker. Esto cumple con el requisito de CI de la actividad.

### [INSERTAR CAPTURA 8]
Captura de GitHub Actions con el workflow en verde.

---

### Control de versiones

**Repositorio:** https://github.com/Joser1609/gestion-pedidos

**Explicacion resumida:** El codigo fuente esta versionado en GitHub, incluyendo la API, pruebas, Dockerfile, buildspec.yml y plantillas de infraestructura AWS.

### [INSERTAR CAPTURA 9]
Captura del repositorio en GitHub.

---

## Tabla resumen de cumplimiento

| Requisito | Endpoint | Codigo HTTP | Cumple |
|-----------|----------|-------------|--------|
| Crear pedidos | POST /pedidos | 201 | Si |
| Visualizar pedidos | GET /pedidos | 200 | Si |
| Filtrar por estado | GET /pedidos?estado=... | 200 | Si |
| Ordenar por fecha | GET /pedidos?ordenarPor=fechaCreacion | 200 | Si |
| Actualizar estado | PATCH /pedidos/:id/estado | 200 | Si |
| CI automatico | GitHub Actions | OK | Si |
| Pruebas unitarias | npm test | 8/8 | Si |

---

## Conclusion

Con las pruebas realizadas en Postman y las pruebas automaticas se demuestra el cumplimiento de los tres requisitos de negocio del caso de estudio. Adicionalmente, el proyecto cuenta con control de versiones, pipeline de integracion continua y archivos preparados para despliegue en AWS.
