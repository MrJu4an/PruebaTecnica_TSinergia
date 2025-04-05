import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { routes } from '../Components/Utils/routes';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';


const Home = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pacientes, setPacientes] = useState([]);

  // Obtenemos el Token
  useEffect(() => {
    const login = async () => {
      try {
        const response = await axios.post('/api/login', {
          // Por ahora solo quemo los datos del administrador
          email: 'admin@admin.com',       
          password: '1234567890'           
        });

        const token = response.data.access_token;
        localStorage.setItem('token', token);
      } catch (error) {
        toast.error('No se pudo iniciar sesión');
        console.error(error);
      }
    };

    login();
  }, []);

  // Obtener pacientes desde la API al cargar el componente
  useEffect(() => {
    axios.get('/api/pacientes')
      .then(res => {
        setPacientes(res.data);
      })
      .catch(err => {
        const mensaje = 'Error al obtener los pacientes:' + err.message;
        toast.error(mensaje);
      }).finally( () => {
        setLoading(false);
      });
  }, []);

  // Acción de eliminar el paciente
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: `¿Estás seguro?`,
      text: `¿Deseas eliminar el paciente con ID: ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/pacientes/${id}`);
        toast.success('Paciente eliminado correctamente')
        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 1000);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            const errores = error.response.data.errors;
            
            Object.values(errores).forEach((mensajes) => {
                mensajes.forEach((mensaje) => {
                    toast.error(mensaje);
                });
            });
        } else {
            toast.error("Error desconocido al eliminar el paciente.");
        }
      }
    }
  };

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pacientesPorPagina] = useState(4);
  const indexUltimoPaciente = currentPage * pacientesPorPagina;
  const indexPrimerPaciente = indexUltimoPaciente - pacientesPorPagina;
  const currentPacientes = pacientes.slice(indexPrimerPaciente, indexUltimoPaciente);
  const totalPaginas = Math.ceil(pacientes.length / pacientesPorPagina);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2>CRUD Pacientes</h2>
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
                                <p className="mt-3">Cargando pacientes...</p>
                            </div>
                    ) : (
                        <>
                            <div className="d-flex justify-content-start mb-3">
                                <Link to={routes.create} className="btn btn-primary">
                                    <i className="fa-solid fa-plus"></i> Crear Paciente
                                </Link>
                            </div>
                            <table className="table table-sm table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Correo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPacientes.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td>{`${p.nombre1}${p.nombre2 ? ' ' + p.nombre2 : ''}`}</td>
                                            <td>{`${p.apellido1}${p.apellido2 ? ' ' + p.apellido2 : ''}`}</td>
                                            <td>{p.correo}</td>
                                            <td>
                                                <Link to={`${routes.edit}/${p.id}`} className="btn btn-sm btn-warning me-2">
                                                  <i className="fa-solid fa-pen"></i> Editar
                                                </Link>
                                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>
                                                    <i className="fa-solid fa-trash"></i> Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {pacientes.length === 0 && (
                                        <tr>
                                            <td colSpan="5">No hay pacientes registrados</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <nav>
                              <ul className="pagination justify-content-center">
                                {Array.from({ length: totalPaginas }, (_, index) => (
                                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(index + 1)}>
                                      {index + 1}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </nav>
                        </>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home
