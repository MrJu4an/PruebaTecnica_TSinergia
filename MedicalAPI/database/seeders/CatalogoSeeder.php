<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CatalogoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Departamentos
        DB::table('departamentos')->insert([
            ['id' => 1, 'nombre' => 'Cundinamarca'],
            ['id' => 2, 'nombre' => 'Antioquia'],
            ['id' => 3, 'nombre' => 'Valle del Cauca'],
            ['id' => 4, 'nombre' => 'Santander'],
            ['id' => 5, 'nombre' => 'Boyacá'],
        ]);

        // Municipios
        DB::table('municipios')->insert([
            ['nombre' => 'Bogotá', 'departamento_id' => 1],
            ['nombre' => 'Soacha', 'departamento_id' => 1],
            ['nombre' => 'Medellín', 'departamento_id' => 2],
            ['nombre' => 'Envigado', 'departamento_id' => 2],
            ['nombre' => 'Cali', 'departamento_id' => 3],
            ['nombre' => 'Palmira', 'departamento_id' => 3],
            ['nombre' => 'Bucaramanga', 'departamento_id' => 4],
            ['nombre' => 'Floridablanca', 'departamento_id' => 4],
            ['nombre' => 'Tunja', 'departamento_id' => 5],
            ['nombre' => 'Duitama', 'departamento_id' => 5],
        ]);

        // Tipos de documento
        DB::table('tipos_documento')->insert([
            ['id' => 1, 'nombre' => 'Cédula de Ciudadanía'],
            ['id' => 2, 'nombre' => 'Tarjeta de Identidad'],
        ]);

        // Géneros básicos
        DB::table('genero')->insertOrIgnore([
            ['id' => 1, 'nombre' => 'Masculino'],
            ['id' => 2, 'nombre' => 'Femenino'],
        ]);

        // Pacientes
        foreach (range(1, 5) as $i) {
            DB::table('pacientes')->insert([
                'tipo_documento_id' => 1,
                'numero_documento'  => '10000000' . $i,
                'nombre1'           => 'Nombre' . $i,
                'nombre2'           => 'Segundo' . $i,
                'apellido1'         => 'Apellido' . $i,
                'apellido2'         => 'SegundoA' . $i,
                'genero_id'         => 1,
                'departamento_id'   => 1,
                'municipio_id'      => 1,
                'correo'            => 'paciente' . $i . '@test.com',
            ]);
        }

        // Usuario administrador
        DB::table('users')->insertOrIgnore([
            [
                'name' => 'admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('1234567890'),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
