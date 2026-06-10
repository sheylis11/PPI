INSERT INTO usuariodelmetro (dni_us, nombre_us, contrasena)
VALUES
(1,'Ana','123'),
(2,'Luis','123'),
(3,'Carlos','123'),
(4,'Maria','123'),
(5,'Juan','123'),
(6,'Laura','123'),
(7,'Pedro','123'),
(8,'Sara','123'),
(9,'Andres','123'),
(10,'Valentina','123');

INSERT INTO trajadoresdel_metro (Dni_tra,nombre_tra,contrasena,funcion)
VALUES
(101,'David','123','Psicologo'),
(102,'Camila','123','Orientadora'),
(103,'Mateo','123','Supervisor'),
(104,'Sofia','123','Psicologa'),
(105,'Julian','123','Seguridad'),
(106,'Laura','123','Psicologa'),
(107,'Pedro','123','Supervisor'),
(108,'Sara','123','Seguridad'),
(109,'Andres','123','Orientador'),
(110,'Valeria','123','Psicologa');

INSERT INTO comentarios (dni,nombre_com,usuario,descripcion,contrasena)
VALUES
(1,'Comentario1',1,'Muy buena iniciativa','123'),
(2,'Comentario2',2,'Excelente','123'),
(3,'Comentario3',3,'Muy util','123'),
(4,'Comentario4',4,'Buen proyecto','123'),
(5,'Comentario5',5,'Me gusta','123'),
(6,'Comentario6',6,'Muy interesante','123'),
(7,'Comentario7',7,'Excelente idea','123'),
(8,'Comentario8',8,'Muy bien','123'),
(9,'Comentario9',9,'Gran ayuda','123'),
(10,'Comentario10',10,'Perfecto','123');

INSERT INTO recomendaciones
(dni_form,dni_tra,descripcion,estado,nombre_re,fecha,dni_us)
VALUES
(1,101,'Escuchar música','Activo','Re1','2026-06-01',1),
(2,102,'Leer mensajes positivos','Activo','Re2','2026-06-01',2),
(3,103,'Participar en actividades','Activo','Re3','2026-06-01',3),
(4,104,'Hablar con un profesional','Activo','Re4','2026-06-01',4),
(5,105,'Tomar descansos','Activo','Re5','2026-06-01',5),
(6,106,'Compartir emociones','Activo','Re6','2026-06-01',6),
(7,107,'Buscar apoyo','Activo','Re7','2026-06-01',7),
(8,108,'Asistir a talleres','Activo','Re8','2026-06-01',8),
(9,109,'Practicar respiración','Activo','Re9','2026-06-01',9),
(10,110,'Realizar actividades recreativas','Activo','Re10','2026-06-01',10);

DELETE FROM comentarios
WHERE dni = '10';

DELETE FROM recomendaciones
WHERE dni_form = '10';

DELETE FROM trajadoresdel_metro
WHERE dni_tra = '110';

DELETE FROM usuariodelmetro
WHERE dni_us = '10';


UPDATE usuariodelmetro
SET nombre_us = 'Roxelys'
WHERE dni_us = '1';


UPDATE trajadoresdel_metro
SET funcion = 'Coordinador'
WHERE dni_tra = '101';


UPDATE recomendaciones
SET estado = 'Finalizado'
WHERE dni_form = '1';


UPDATE comentarios
SET descripcion = 'Comentario actualizado'
WHERE dni = '1';

SELECT * 
FROM usuariodelmetro;

SELECT * 
FROM trajadoresdel_metro;

SELECT * 
FROM comentarios;

SELECT * 
FROM comentarios;


SELECT * 
FROM recomendaciones;
