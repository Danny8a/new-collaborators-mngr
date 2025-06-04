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
- Nodemailer / AWS SES (envío de correos)

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

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=collaborators_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña

# Envío de correos (AWS SES o SMTP)
EMAIL_SERVICE=ses
EMAIL_USER=notificaciones@tu-dominio.com
EMAIL_REGION=us-east-1
EMAIL_ACCESS_KEY_ID=your_aws_key
EMAIL_SECRET_ACCESS_KEY=your_aws_secret
```

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

3. Configura tu `.env` con las credenciales correctas.

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

## ✉️ Notificaciones por Correo

El sistema está preparado para enviar notificaciones automáticas por correo, por ejemplo:

- Confirmación de registro de solicitudes
- Notificación de aprobación o rechazo
- Aviso de asignación de computador

Usa **Nodemailer** y puede ser configurado con **AWS SES** o SMTP tradicional.  
La configuración se hace en el archivo `.env`.

Servicio de ejemplo:
```ts
// email.service.ts
sendEmail(to: string, subject: string, html: string): Promise<void>
```

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
