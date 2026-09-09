# Animemos Nuestro Metro

Animemos Nuestro Metro es una aplicación web para apoyar la comunidad del Metro de Medellín mediante canales de comunicación, reportes de situaciones, interacción con música y comentarios, acceso a recursos de la comunidad y acompañamiento emocional a través de un asistende virtual de IA.

La plataforma está organizada en dos partes: un backend con API REST en Node.js y Express, y un frontend en React con Bootstrap para consumir esa API.

## Descripción

Animemos Nuestro Metro busca ofrecer un espacio seguro y cercano para que usuarios, familiares y trabajadores del metro puedan comunicar necesidades, registrar reportes, participar en comunidad y encontrar recursos de apoyo.

La aplicación permite:

- registrar usuarios y trabajadores,
- gestionar autenticación con tokens JWT,
- publicar y consultar música y comentarios,
- registrar reportes de situaciones familiares o del personal del metro,
- enviar algunos reportes por correo,
- interactuar con un asistende basado en Groq.

## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Registro e inicio de sesión de trabajadores con código de acceso.
- Envío y consulta de reportes por parte de trabajadores y usuarios.
- Consulta de reportes de situaciones para el equipo del metro.
- Registro de comentarios y música de la comunidad.
- Chat con un asistende virtual para acompañamiento emocional.
- Integración con Supabase para almacenamiento de reportes de alguien.
- Envío de reportes por correo con Nodemailer.

## Tecnologías utilizadas

- React
- Bootstrap
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- Supabase
- @supabase/supabase-js
- Nodemailer
- JWT
- bcryptjs
- dotenv
- npm
- Groq SDK

## Estructura del proyecto

La aplicación está dividida en dos proyectos principales:

```text
animemos nuestro metro/
└── animemos-metro/
    ├── backend/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── middleware/
    │   └── server.js
    ├── frontend/
    │   └── src/
    └── README.md
```

### Backend

El backend está en la carpeta `backend/` y contiene la API de Express, la conexión a MongoDB, las rutas de autenticación, trabajadores, música, comentarios, reportes y el asistende IA.

### Frontend

El frontend está en la carpeta `frontend/` y contiene la interfaz principal en React con Bootstrap. Los componentes principales viven en `frontend/src/components/` y el contexto de autenticación en `frontend/src/context/`.

## Requisitos

Antes de ejecutar el proyecto, necesitas:

- Node.js y npm instalados.
- Acceso a un proyecto de MongoDB Atlas o una base MongoDB configurada.
- Cuenta de correo para envío de reportes por correo electrónico.
- Una cuenta o proyecto de Supabase con las tablas necesarias para `someone_reports`.
- Una clave API de Groq para el asistende virtual.
- Git para clonar el repositorio.

## Instalación

Desde la raíz del repositorio:

```bash
git clone https://github.com/sheylis11/PPI.git
cd PPI
cd "animemos nuestro metro/animemos-metro"
```

Instala las dependencias del backend:

```bash
cd backend
npm install
```

Instala las dependencias del frontend:

```bash
cd ../frontend
npm install
```

## Variables de entorno

El proyecto usa un archivo `.env` dentro de la carpeta `backend` para configurar la API.

No escribas claves reales ni secretos dentro de este README. Usa solo nombres de variables y ejemplos.

Ejemplo de configuración:

```env
PORT=4000
MONGODB_URI=tu_valor
JWT_SECRET=tu_valor
EMAIL_USER=tu_valor
EMAIL_PASS=tu_valor
EMAIL_TO=tu_valor
WORKER_ACCESS_CODE=tu_valor
SUPABASE_URL=tu_valor
SUPABASE_SERVICE_ROLE_KEY=tu_valor
GROQ_API_KEY=tu_valor
```

El frontend también puede usar variables de entorno según el despliegue, por ejemplo:

```env
REACT_APP_API_URL=http://localhost:4000/api
REACT_APP_WHATSAPP_NUMBER=573045217695
```

## Ejecución

### Backend

El backend se inicia con:

```bash
cd backend
npm start
```

El servidor queda disponible en:

```text
http://localhost:4000
```

### Frontend

El frontend se inicia con:

```bash
cd frontend
npm start
```

La aplicación se expone en el puerto 3000 por react-scripts.

## Uso

1. Inicia el backend y luego el frontend.
2. Abre la interfaz en el navegador.
3. Registra o inicia sesión como usuario o trabajador.
4. Usa la sección de música y comentarios para interactuar con la comunidad.
5. Desde la sección de trabajadores puedes enviar reportes.
6. Desde la sección de familiares puedes enviar reportes de terceros.
7. Usa el asistende virtual desde la interfaz para conversar con la aplicación.

## Autores

Los nombres que aparecen en la lista autorizada de trabajadores del proyecto son:

- Roxelys De los Ángeles Bravo Castro
- Sheyla Tirado Aguiar
- Dana Gomez Gomez

## Licencia

Este proyecto se entrega con fines educativos y de práctica académica.
