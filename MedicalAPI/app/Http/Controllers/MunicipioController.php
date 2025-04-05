<?php

namespace App\Http\Controllers;

use App\Models\Municipio;
use Illuminate\Http\Request;

class MunicipioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $municipios = Municipio::with("departamento")->get();
        return response()->json($municipios);
    }

    public function getByDepartamento($departamento_id)
    {
        $municipios = Municipio::where('departamento_id', $departamento_id)->get();

        if ($municipios->isEmpty()) {
            return response()->json(['message' => 'No se encontraron municipios para este departamento.'], 404);
        }

        return response()->json($municipios);
    }
}
