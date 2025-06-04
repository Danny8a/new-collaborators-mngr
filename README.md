# Backend - Sistema de Gestión de Nuevos Colaboradores

Este es el backend de la aplicación para la gestión de nuevos colaboradores de una empresa. Permite crear, gestionar y consultar usuarios, solicitudes de acceso y asignaciones de computadores.

## 🧱 Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- Jest (pruebas unitarias)
- Dotenv
- CORS / Helmet / Morgan

---

## 📦 Estructura del Proyecto

```
new-collaborators-api/
├── config/           # Configuración de la base de datos
├── controllers/      # Controladores de cada módulo
├── middlewares/      # Middlewares globales
├── models/           # Definición de modelos Sequelize
├── routes/           # Rutas API REST
├── services/         # Lógica de negocio
├── tests/            # Pruebas unitarias con Jest
├── types/            # Tipos de datos
├── .env              # Variables de entorno
├── app.js            # Configuración principal de Express
└── server.js         # Punto de entrada
```

---

## 🔐 Variables de Entorno (`.env`)
## Funcionalidades

### Usuarios
- Crear, listar, actualizar y eliminar usuarios
- Cada usuario tiene: nombre, correo, área, rol y estado

### Solicitudes de Acceso
- Registrar solicitudes por tipo (software, hardware, permisos)
- Selección de aplicaciones y justificación
- Cambiar estado: pendiente, aprobado, rechazado

### Asignación de Computadores
- Listar computadores disponibles
- Asignar computadores a nuevos ingresos
- Guardar historial de asignaciones

---

## Tecnologías

- **Node.js**
- **Express**
- **Sequelize** (ORM)
- **PostgreSQL**
- **CORS**, **dotenv**, **morgan**, etc.



---

## 🚀 Instalación y Ejecución

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/new-collaborators-api.git
cd new-collaborators-api
```

2. Instala las dependencias:
```bash
npm install
```
3. Corre las migraciones o crea manualmente las tablas según el esquema definido en los modelos.

4. Crea un archivo `.env` en la raíz con el siguiente contenido:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_management
DB_USER=postgres
DB_PASSWORD=tu_contraseña
```


4. Ejecuta el proyecto:
```bash
npm run dev
```

5. La API estará disponible en:
```
http://localhost:3000/
```

---

## 🛠️ Scripts útiles

```bash
npm run dev       # Inicia en modo desarrollo con nodemon
npm run start     # Inicia en modo producción
npm run test      # Ejecuta pruebas unitarias con Jest
```

---

## 🔗 Endpoints Principales

### Usuarios
- `GET /users`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

### Solicitudes de Acceso
- `GET /access-requests`
- `POST /access-requests`
- `PUT /access-requests/:id`
- `DELETE /access-requests/:id`

### Asignación de Computadores
- `GET /computers/available`
- `POST /computer-assignments`
- `GET /computer-assignments/history`

---

## 🧪 Pruebas

Las pruebas se encuentran en la carpeta `tests/`. Ejecuta:

```bash
npm test
```

Utiliza Jest con mocks para Sequelize y supertest para probar rutas.

---

## 🗂️ Base de Datos

La base de datos se compone de las siguientes tablas:

- `users`: colaboradores del sistema
- `access_requests`: solicitudes de software/permisos
- `computers`: inventario de equipos
- `computer_assignments`: asignaciones realizadas

Incluye claves foráneas y restricciones.

---

## 📥 Datos de prueba

Puedes cargar datos de ejemplo ejecutando el script `datos_prueba.sql.txt`.

---

## 🔒 Seguridad

- Helmet para proteger cabeceras HTTP
- CORS habilitado para permitir peticiones entre frontend y backend


