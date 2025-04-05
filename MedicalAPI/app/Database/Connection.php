<?php

namespace App\Database;

use PDO;
use PDOException;

class Connection
{
    private $pdo;

    public function __construct()
    {
        try {
            $this->pdo = new PDO(
                'mysql:host=' . env('DB_HOST') . ';dbname=' . env('DB_DATABASE'), 
                env('DB_USERNAME'), 
                env('DB_PASSWORD')
            );
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }

    public function getPDO()
    {
        return $this->pdo;
    }
}