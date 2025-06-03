# 🛠️ Backend - Sistema de Gestión de Colaboradores

Este es el backend del sistema de gestión de nuevos colaboradores. Está construido con **Node.js**, **Express**, y utiliza **PostgreSQL** como base de datos. Permite gestionar usuarios, solicitudes de acceso y asignación de computadores.

---

## Estructura del Proyecto

```
backend/
├── controllers/           # Lógica de negocio para cada módulo
├── models/                # Definición de modelos Sequelize
├── routes/                # Rutas API REST
├── services/              # Servicios externos (si aplica)
├── config/                # Configuración de la base de datos
├── app.ts                 # Punto de entrada principal
└── ...
```

---

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

## Configuración

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/new-collaborators-backend.git
   cd new-collaborators-backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz con el siguiente contenido:

   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_NAME=new_collaborators_db
   ```

4. Corre las migraciones o crea manualmente las tablas según el esquema definido en los modelos.

5. Inicia el servidor:
   ```bash
   npm run dev
   ```

---

## Endpoints Principales

### Usuarios
- `GET    /api/users`
- `POST   /api/users`
- `PUT    /api/users/:id`
- `DELETE /api/users/:id`

### Solicitudes de Acceso
- `GET    /api/access-requests`
- `POST   /api/access-requests`
- `PUT    /api/access-requests/:id/status`

### Asignación de Computadores
- `GET    /api/computers/available`
- `GET    /api/computers/assignments`
- `POST   /api/computers/assign`

