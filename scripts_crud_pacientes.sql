CREATE DATABASE db_pacientes COLLATE UTF8MB4_SPANISH_CI;
USE db_pacientes;

CREATE TABLE departamentos (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(100) NOT NULL
);

CREATE TABLE municipios (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	departamento_id INT NOT NULL, 
	nombre VARCHAR(100) NOT NULL, 
	FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);

CREATE TABLE tipos_documento (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(50) NOT NULL
);

CREATE TABLE genero (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(20) NOT NULL
);

CREATE TABLE paciente (
   id INT AUTO_INCREMENT PRIMARY KEY,
   tipo_documento_id INT NOT NULL,
   numero_documento VARCHAR(30) NOT NULL UNIQUE,
   nombre1 VARCHAR(50) NOT NULL,
   nombre2 VARCHAR(50),
   apellido1 VARCHAR(50) NOT NULL,
   apellido2 VARCHAR(50),
   genero_id INT NOT NULL,
   departamento_id INT NOT NULL,
   municipio_id INT NOT NULL,
   correo VARCHAR(100),
   FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documento(id),
   FOREIGN KEY (genero_id) REFERENCES genero(id),
   FOREIGN KEY (departamento_id) REFERENCES departamentos(id),
   FOREIGN KEY (municipio_id) REFERENCES municipios(id)
);