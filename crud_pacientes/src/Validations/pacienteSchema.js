import * as yup from 'yup';

export const pacienteSchema = yup.object().shape({
  tipo_documento_id: yup.string().required('Tipo de documento es obligatorio'),

  numero_documento: yup
    .string()
    .matches(/^\d+$/, 'Número de documento debe contener solo números')
    .min(4, 'Numero de documento debe tener al menos 4 caracteres')
    .required('Número de documento es obligatorio'),

  nombre1: yup
    .string()
    .min(3, 'El primer nombre debe tener al menos 3 caracteres')
    .required('Primer nombre es obligatorio'),

  nombre2: yup
    .string()
    .notRequired(),

  apellido1: yup
    .string()
    .min(3, 'El primer apellido debe tener al menos 3 caracteres')
    .required('Primer apellido es obligatorio'),

  apellido2: yup
    .string()
    .notRequired(),

  departamento_id: yup.string().required('Departamento es obligatorio'),
  municipio_id: yup.string().required('Municipio es obligatorio'),
  genero_id: yup.string().required('Género es obligatorio'),

  correo: yup
    .string()
    .email('Correo inválido')
    .required('Correo es obligatorio')
});