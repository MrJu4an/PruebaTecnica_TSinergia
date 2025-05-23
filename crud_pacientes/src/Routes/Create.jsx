import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { routes } from '../Components/Utils/routes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { pacienteSchema } from '../validations/pacienteSchema';
import { Controller } from "react-hook-form";

const Create = () => {
    // Declaramos variables
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);
    const [generos, setGeneros] = useState([]);

    // Consultamos los datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tiposRes, deptosRes, munisRes, generosRes] = await Promise.all([
                    axios.get('/api/documentos'),
                    axios.get('/api/departamentos'),
                    axios.get('/api/municipios'),
                    axios.get('/api/generos')
                ]);
        
                setTiposDocumento(tiposRes.data);
                setDepartamentos(deptosRes.data);
                setMunicipios(munisRes.data);
                setGeneros(generosRes.data);
            } catch (error) {
                const mensaje = 'Error al cargar los datos: ' + error.message
                toast.error(mensaje);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleDepartamentoChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const filtrados = municipios.filter(m => m.departamento_id === selectedId);
        setMunicipiosFiltrados(filtrados);
    };

    // Envío del formulario
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(pacienteSchema)
    });

    const onSubmit = async (form) => {
        try {
            await axios.post('/api/pacientes', form);
            toast.success('Paciente registrado correctamente')
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                const errores = error.response.data.errors;
                
                Object.values(errores).forEach((mensajes) => {
                    mensajes.forEach((mensaje) => {
                        toast.error(mensaje);
                    });
                });
            } else {
                toast.error("Error desconocido al registrar el paciente.");
            }
        }
    };

  return (
    <div className="container mt-4">
        <h2>Crear Pacientes</h2>

        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <hr></hr>
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                &nbsp;&nbsp;&nbsp;
                                <p className="mt-3">Cargando datos del formulario...</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Tipo Documento Paciente</label>
                                        <select
                                            className="form-select"
                                            name="tipo_documento_id"
                                            {...register("tipo_documento_id")}
                                        >
                                            <option value="">Seleccione un tipo de documento</option>
                                            {tiposDocumento.map(td => (
                                                <option key={td.id} value={td.id}>{td.nombre}</option>
                                            ))}
                                        </select>
                                        {errors.tipo_documento_id && <p className="text-danger">{errors.tipo_documento_id?.message}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Documento Paciente</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="numero_documento"
                                            {...register("numero_documento")}
                                            autoComplete='off'
                                        />
                                        {errors.numero_documento && <p className="text-danger">{errors.numero_documento?.message}</p>}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Primer Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombre1"
                                            {...register("nombre1")}
                                            autoComplete='off'
                                        />
                                        {errors.nombre1 && <p className="text-danger">{errors.nombre1?.message}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Segundo Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombre2"
                                            {...register("nombre2")}
                                            autoComplete='off'
                                        />
                                        {errors.nombre2 && <p className="text-danger">{errors.nombre2?.message}</p>}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Primer Apellido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="apellido1"
                                            {...register("apellido1")}
                                            autoComplete='off'
                                        />
                                        {errors.apellido1 && <p className="text-danger">{errors.apellido1?.message}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Segundo Apellido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="apellido2"
                                            {...register("apellido2")}
                                            autoComplete='off'
                                        />
                                        {errors.apellido2 && <p className="text-danger">{errors.apellido2?.message}</p>}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Departamento</label>
                                        <Controller
                                            name="departamento_id"
                                            control={control}
                                            render={({ field }) => (
                                                <select
                                                {...field}
                                                className="form-select"
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleDepartamentoChange(e);
                                                }}
                                                >
                                                <option value="">Seleccione un departamento</option>
                                                {departamentos.map(depto => (
                                                    <option key={depto.id} value={depto.id}>{depto.nombre}</option>
                                                ))}
                                                </select>
                                            )}
                                        />
                                        {errors.departamento_id && <p className="text-danger">{errors.departamento_id.message}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Municipio</label>
                                        <select
                                            className="form-select"
                                            name="municipio_id"
                                            {...register("municipio_id")}
                                        >
                                            <option value="">Seleccione un municipio</option>
                                            {municipiosFiltrados.map(m => (
                                                <option key={m.id} value={m.id}>{m.nombre}</option>
                                            ))}
                                        </select>
                                        {errors.municipio_id && <p className="text-danger">{errors.municipio_id?.message}</p>}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Género</label>
                                        <select
                                            className="form-select"
                                            name="genero_id"
                                            {...register("genero_id")}
                                        >
                                            <option value="">Seleccione un género</option>
                                            {generos.map(g => (
                                                <option key={g.id} value={g.id}>{g.nombre}</option>
                                            ))}
                                        </select>
                                        {errors.genero_id && <p className="text-danger">{errors.genero_id?.message}</p>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="correo"
                                            {...register("correo")}
                                            autoComplete='off'
                                        />
                                        {errors.correo && <p className="text-danger">{errors.correo?.message}</p>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <button type='submit' className="btn btn-primary">Agregar</button>
                                    <Link to={routes.index} className="btn btn-secondary ms-2">Cancelar</Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create
