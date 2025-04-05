<?php

namespace App\Repositories;

use App\Database\Connection;
use PDO;

class PacienteRepository
{
    protected $pdo;

    public function __construct()
    {
        $this->pdo = (new Connection())->getPDO();
    }

    public function getAll()
    {
        $stmt = $this->pdo->query("SELECT * FROM pacientes");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function find($id)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM pacientes WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $stmt = $this->pdo->prepare("INSERT INTO pacientes (
            tipo_documento_id,
            numero_documento,
            nombre1,
            nombre2,
            apellido1,
            apellido2,
            genero_id,
            departamento_id,
            municipio_id,
            correo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    return $stmt->execute([
        $data['tipo_documento_id'],
        $data['numero_documento'],
        $data['nombre1'],
        $data['nombre2'],
        $data['apellido1'],
        $data['apellido2'],
        $data['genero_id'],
        $data['departamento_id'],
        $data['municipio_id'],
        $data['correo']
    ]);
    }

    public function update($id, $data)
    {
        $stmt = $this->pdo->prepare("
        UPDATE pacientes SET
            tipo_documento_id = ?,
            nombre1 = ?,
            nombre2 = ?,
            apellido1 = ?,
            apellido2 = ?,
            genero_id = ?,
            departamento_id = ?,
            municipio_id = ?,
            correo = ?
        WHERE id = ?
    ");

    return $stmt->execute([
        $data['tipo_documento_id'],
        $data['nombre1'],
        $data['nombre2'],
        $data['apellido1'],
        $data['apellido2'],
        $data['genero_id'],
        $data['departamento_id'],
        $data['municipio_id'],
        $data['correo'],
        $id
    ]);
    }

    public function delete($id)
    {
        $stmt = $this->pdo->prepare("DELETE FROM pacientes WHERE id = ?");
        return $stmt->execute([$id]);
    }
}