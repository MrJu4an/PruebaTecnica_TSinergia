<?php

use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\PacienteController;
use App\Http\Controllers\TipoDocumentoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::middleware('auth:api')->group(function () {
    Route::apiResource('departamentos', DepartamentoController::class);
    Route::apiResource('municipios', MunicipioController::class);
    Route::get('municipios/{departamento_id}', [MunicipioController::class, 'getByDepartamento']);
    Route::apiResource('documentos', TipoDocumentoController::class);
    Route::apiResource('generos', GeneroController::class);
    Route::apiResource('pacientes', PacienteController::class);
});
//
Route::post('login', [UserController::class, 'login']);
