CREATE DATABASE DB_PRODUCTO;

CREATE TABLE productos (
    id_fabricante VARCHAR(10),
    id_producto VARCHAR(20),
    descripcion VARCHAR(100),
    precio DECIMAL(10,2),
    existencias INT,
    PRIMARY KEY (id_fabricante, id_producto)
);

INSERT INTO productos (id_fabricante, id_producto, descripcion, precio, existencias) VALUES
('Aci', '41001', 'Aguja', 58, 227),
('Aci', '41002', 'Micropore', 80, 150),
('Aci', '41003', 'Gasa', 112, 80),
('Aci', '41004', 'Equipo macrogoteo', 110, 50),
('Bic', '41003', 'Curas', 120, 20),
('Inc', '41089', 'Canaleta', 500, 30),
('Qsa', 'Xk47', 'Compresa', 150, 200),
('Bic', 'Xk47', 'Compresa', 200, 200);

SELECT id_producto, id_fabricante, descripcion, precio, precio * 1.10 AS IVA
FROM productos;

SELECT id_producto, SUM(existencias) AS Existencias_Totales
FROM productos
GROUP BY id_producto;

SELECT id_fabricante, AVG(precio) AS precio_promedio
FROM productos
GROUP BY id_fabricante;

SELECT id_fabricante, id_producto, descripcion, precio
FROM productos
WHERE precio = (
    SELECT MAX(precio) FROM productos
);

UPDATE productos
SET existencias = existencias + 500
WHERE id_fabricante = 'Bic'
AND id_producto = '41003';

DELETE FROM productos WHERE id_fabricante = 'Osa';