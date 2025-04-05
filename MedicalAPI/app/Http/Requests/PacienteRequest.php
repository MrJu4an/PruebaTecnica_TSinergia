<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PacienteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        $pacienteId = $this->route('pacientes');

        if ($this->isMethod('POST')) {
            // Creación
            return [
                'tipo_documento_id' => 'required|exists:tipos_documento,id',
                'numero_documento'  => 'required|unique:pacientes,numero_documento',
                'nombre1'           => 'required|string',
                'nombre2'           => 'nullable|string',
                'apellido1'         => 'required|string',
                'apellido2'         => 'nullable|string',
                'genero_id'         => 'required|exists:genero,id',
                'departamento_id'   => 'required|exists:departamentos,id',
                'municipio_id'      => 'required|exists:municipios,id',
                'correo'            => 'nullable|email|unique:pacientes,correo',
            ];
        }
    
        // Actualización
        return [
            'tipo_documento_id' => 'required|exists:tipos_documento,id',
            'nombre1'           => 'required|string',
            'nombre2'           => 'nullable|string',
            'apellido1'         => 'required|string',
            'apellido2'         => 'nullable|string',
            'genero_id'         => 'required|exists:genero,id',
            'departamento_id'   => 'required|exists:departamentos,id',
            'municipio_id'      => 'required|exists:municipios,id',
            'correo'            => 'nullable|email',
        ];
    }

    public function messages()
    {
        
        if ($this->isMethod('POST')) {
            return [
                'tipo_documento_id.required' => 'El tipo de documento es obligatorio.',
                'tipo_documento_id.exists'   => 'El tipo de documento no es válido.',
                'numero_documento.required'  => 'El número de documento es obligatorio.',
                'numero_documento.unique'    => 'El número de documento ya está en uso.',
                'nombre1.required'           => 'El primer nombre es obligatorio.',
                'apellido1.required'         => 'El primer apellido es obligatorio.',
                'genero_id.required'         => 'El género es obligatorio.',
                'departamento_id.required'   => 'El departamento es obligatorio.',
                'municipio_id.required'      => 'El municipio es obligatorio.',
                'correo.email'               => 'El correo debe ser un email válido.',
                'correo.unique'              => 'El correo ya está en uso.',
            ];
        }
        
        return [
            'tipo_documento_id.required' => 'El tipo de documento es obligatorio.',
            'tipo_documento_id.exists'   => 'El tipo de documento no es válido.',
            'nombre1.required'           => 'El primer nombre es obligatorio.',
            'apellido1.required'         => 'El primer apellido es obligatorio.',
            'genero_id.required'         => 'El género es obligatorio.',
            'departamento_id.required'   => 'El departamento es obligatorio.',
            'municipio_id.required'      => 'El municipio es obligatorio.',
            'correo.email'               => 'El correo debe ser un email válido.',
        ];
    }

    public function wantsJson()
    {
        return true;
    }
}
