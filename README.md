# Animemos Nuestro Metro — App funcional (React + Bootstrap + Node/Express + MongoDB)

Dos partes que corren juntas:

- **backend/** → API real en Node/Express + MongoDB (registro de usuarios y trabajadores,
  reportes con envío de correo real, música, comentarios, asistente de IA).
- **frontend/** → App en React + Bootstrap que consume esa API.

La base de datos usa **MongoDB Atlas**, así que los datos no se borran al reiniciar el
servidor y quedan guardados en internet de verdad.

## 1. Crea tu base de datos (MongoDB Atlas — gratis)

1. Entra a https://www.mongodb.com/cloud/atlas/register y crea una cuenta gratis.
2. Crea un cluster gratuito (plan **M0**).
3. En "Database Access", crea un usuario con contraseña (guárdala).
4. En "Network Access", agrega la IP `0.0.0.0/0` ("Allow access from anywhere") — así tu
   backend en Render podrá conectarse sin problema.
5. En "Database" → "Connect" → "Drivers", copia el string de conexión. Se ve así:
   `mongodb+srv://usuario:<password>@cluster0.xxxxx.mongodb.net/`
   Reemplaza `<password>` por la contraseña real y agrégale el nombre de la base al final:
   `mongodb+srv://usuario:tuclave@cluster0.xxxxx.mongodb.net/animemos-metro`

## 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Abre `.env` y llena:

- `MONGODB_URI`: el string de conexión que copiaste de Atlas.
- `JWT_SECRET`: cualquier cadena larga inventada por ti.
- `EMAIL_USER` / `EMAIL_PASS`: la cuenta de Gmail que **enviará** los reportes.
  Necesitas una **"Contraseña de aplicación"** de Gmail:
  1. Ve a tu cuenta de Google → Seguridad.
  2. Activa la verificación en 2 pasos.
  3. Busca "Contraseñas de aplicaciones" y genera una para "Correo".
  4. Pega esa contraseña de 16 caracteres en `EMAIL_PASS` (NO tu contraseña normal).
- `EMAIL_TO`: déjalo en `AyudaMetroMedellin@gmail.com` — ahí llegan los reportes.
- `WORKER_ACCESS_CODE`: el código único que va a compartir todo el personal del Metro para
  entrar (en vez de que cada uno cree su propia contraseña). Cámbialo por algo que solo tu
  equipo conozca, ej: `Metro2026*`. El trabajador entra con su nombre + su correo normal +
  este código.
- `ANTHROPIC_API_KEY`: crea tu API key en https://console.anthropic.com/ para que el
  asistente de IA responda de verdad. Si la dejas vacía, el chat le avisa al usuario que no
  está disponible en vez de inventar respuestas falsas.

### Agregar o quitar trabajadores autorizados

Solo las personas cuyo número de documento esté en `backend/allowedEmployees.js` pueden
registrarse como trabajadoras/es del Metro (así nadie externo se puede hacer pasar por
personal). Ya quedaron cargadas las 3 que me diste. Para agregar a alguien más, abre ese
archivo y copia una línea, cambiando los datos:

```js
{ name: 'Nombre completo', idType: 'Tipo de documento', idNumber: '123456789' },
```

Guarda el archivo y reinicia el backend (o vuelve a desplegarlo en Render si ya está en línea).

Pobla la base de datos con algunas canciones y comentarios iniciales (opcional, solo una vez):

```bash
npm run seed
```

Levanta el servidor:

```bash
npm start
```

Debe quedar corriendo en `http://localhost:4000`.

## 3. Frontend

En otra terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Se abre en `http://localhost:3000`, ya consumiendo la API real.

## 4. Publicarlo en internet (para que cualquiera lo use, no solo tú)

**Backend en Render (gratis):**
1. Sube el proyecto a GitHub (en Visual Studio: panel de Control de código fuente → Publish to GitHub).
2. En render.com → New → Web Service → conecta tu repo → Root Directory: `backend`.
3. Build Command: `npm install` — Start Command: `npm start`.
4. En "Environment", agrega las mismas variables de tu `.env` (MONGODB_URI, JWT_SECRET,
   EMAIL_USER, EMAIL_PASS, EMAIL_TO, ANTHROPIC_API_KEY).
5. Render te da una URL pública, ej: `https://animemos-metro-backend.onrender.com`.

**Frontend en Vercel (gratis):**
1. En vercel.com → Add New → Project → conecta el mismo repo → Root Directory: `frontend`.
2. En "Environment Variables" agrega `REACT_APP_API_URL` = tu URL de Render + `/api`
   (ej: `https://animemos-metro-backend.onrender.com/api`) y `REACT_APP_WHATSAPP_NUMBER` = `573045217695`.
3. Deploy. Vercel te da una URL pública, ej: `https://animemos-metro.vercel.app`.

Nota: el plan gratis de Render "duerme" el backend tras 15 min sin uso — la primera petición
después tarda 30-50 segundos en despertar. Es normal en el plan gratuito.

## Qué es real y qué necesitas configurar

| Función | Estado |
|---|---|
| Base de datos | Real y persistente, en MongoDB Atlas |
| Registro/login de usuarios | Real, contraseña encriptada, sesión con token |
| Registro/login de trabajadores del Metro | Real, cada trabajador con su propia cuenta y contraseña, más su código de empleado |
| Formulario de reporte del trabajador | Real: se guarda en MongoDB **y** se envía por correo a `AyudaMetroMedellin@gmail.com` (necesitas configurar `EMAIL_USER`/`EMAIL_PASS`) |
| Pedir canciones y darles "corazón" | Real, guardado en MongoDB |
| Comentarios de la comunidad | Real, guardado en MongoDB |
| Botones "Habla con alguien" / "Pide ayuda ahora" / "Habla con un profesional" | Abren tu WhatsApp: +57 304 5217695 |
| Línea "Emergencia 123" | Marca directo al 123 (se dejó así por ser la línea real de emergencias) |
| Asistente de IA | Real, usa la API de Anthropic — necesitas tu propia `ANTHROPIC_API_KEY`. Redirige a la línea 123 o al WhatsApp si detecta una crisis, y aclara que no reemplaza ayuda profesional |

## Notas importantes

- Nunca subas tu archivo `.env` (con contraseñas reales) a un repositorio público — el
  `.gitignore` ya lo excluye.
- Con el tiempo, si el proyecto crece mucho, puedes pasar del plan gratuito M0 de Atlas y del
  plan gratuito de Render a planes pagos para más capacidad y sin "dormir" el servidor.
