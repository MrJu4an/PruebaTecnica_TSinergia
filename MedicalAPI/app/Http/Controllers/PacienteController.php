<?php

namespace App\Http\Controllers;

use App\Http\Requests\PacienteRequest;
use App\Repositories\PacienteRepository;

class PacienteController extends Controller
{
    protected $repo;

    public function __construct()
    {
        $this->repo = new PacienteRepository();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json($this->repo->getAll());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PacienteRequest $request)
    {
        $this->repo->create($request->validated());
        return response()->json(['message' => 'Paciente creado'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json($this->repo->find($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PacienteRequest $request, string $id)
    {
        $paciente = $this->repo->find($id);

        if (!$paciente) {
            return response()->json(['message' => 'Paciente no encontrado'], 404);
        }

        $this->repo->update($id, $request->validated());

        return response()->json(['message' => 'Paciente actualizado con éxito']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->repo->delete($id);
        return response()->json(['message' => 'Paciente eliminado']);
    }
}
