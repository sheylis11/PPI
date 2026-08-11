CREATE DATABASE — eliminado. En Supabase no se crea una base de datos manualmente; ya existe una por proyecto. Solo ejecutas las tablas directamente.
INT PRIMARY KEY → SERIAL PRIMARY KEY. En PostgreSQL, SERIAL genera el ID automáticamente (autoincremento). Si usas solo INT, tendrías que insertar el ID a mano en cada fila.
contraseña VARCHAR(50) → VARCHAR(255). Las contraseñas nunca se guardan en texto plano — se almacenan como hashes (bcrypt, por ejemplo), que tienen más de 50 caracteres. Con 50 caracteres el hash no cabría y fallaría al insertar.
VARCHAR(50) en descripciones → VARCHAR(255). 50 caracteres es muy poco para descripciones reales. 255 es el estándar habitual.
Relaciones con REFERENCES. Añadí usuario_id en comentarios y recomendaciones para que tengan sentido: un comentario y una recomendación pertenecen a un usuario. El ON DELETE CASCADE significa que si borras un usuario, sus comentarios y recomendaciones se borran también automáticamente.
DEFAULT 'pendiente' en estado. Un valor por defecto útil para que no queden registros sin estado al insertarlos.


CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    contraseña VARCHAR(255) NOT NULL  -- más largo para almacenar hashes
);

CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255),
    usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE recomendaciones (
    id SERIAL PRIMARY KEY,
    descripcion VARCHAR(255),
    estado VARCHAR(50) DEFAULT 'pendiente',
    usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE
);

CREATE TABLE trabajadores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    funcion VARCHAR(50)
);
