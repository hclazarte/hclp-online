import { forwardRef, useImperativeHandle } from 'react'
import { estilosModo } from '../config/estilosModo'

const PacientesComponent = forwardRef(
  ({ modo, paciente, setPaciente }, ref) => {
    const handleChange = (e) => {
      const { name, value } = e.target
      setPaciente((prev) => ({ ...prev, [name]: value }))
    }
    useImperativeHandle(ref, () => ({
      getPaciente: () => {
        return paciente
      }
    }))
    useImperativeHandle(ref, () => ({
      getPaciente: () => paciente,
      validatePaciente: () => validatePaciente(paciente)
    }))
    const validatePaciente = (paciente) => {
      if (!paciente.nombre?.trim()) {
        return 'El nombre es obligatorio.'
      }
      if (!paciente.apellido_paterno?.trim()) {
        return 'El apellido paterno es obligatorio.'
      }
      if (!paciente.cedula?.trim()) {
        return 'La cédula es obligatoria.'
      }
      if (!paciente.fecha_nacimiento?.trim()) {
        return 'La fecha de nacimiento es obligatoria.'
      }
      if (!paciente.tipo_sangre?.trim()) {
        return 'El tipo de sangre es obligatorio.'
      }
      if (!paciente.estado?.trim()) {
        return 'El estado es obligatorio.'
      }

      return ''
    }

    return (
      <div className='flex flex-col items-center min-h-screen overflow-auto h-screen'>
        <div className='p-6 rounded-lg shadow-md w-full max-w-lg mt-1 border bg-inf2'>
          <form className='space-y-4'>
            <input
              type='text'
              name='nombre'
              placeholder='Nombre'
              value={paciente.nombre || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='apellido_paterno'
              placeholder='Apellido Paterno'
              value={paciente.apellido_paterno || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='apellido_materno'
              placeholder='Apellido Materno'
              value={paciente.apellido_materno || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='cedula'
              placeholder='Nro. de Cédula'
              value={paciente.cedula || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <select
              name='estado_civil'
              value={paciente.estado_civil || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            >
              <option value=''>Estado Civil</option>
              <option value='soltero'>Soltero</option>
              <option value='casado'>Casado</option>
              <option value='divorciado'>Divorciado</option>
              <option value='viudo'>Viudo</option>
            </select>
            <input
              type='text'
              name='ocupacion'
              placeholder='Ocupación'
              value={paciente.ocupacion || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <select
              name='regional'
              value={paciente.regional || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            >
              <option value=''>Seleccione Regional</option>
              <option value='La Paz'>La Paz</option>
              <option value='Cochabamba'>Cochabamba</option>
              {/* Agrega más opciones según necesidad */}
            </select>
            <input
              type='text'
              name='fecha_nacimiento'
              placeholder='Fecha de Nacimiento (dd/mm/aaaa)'
              value={paciente.fecha_nacimiento || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='lugar_nacimiento'
              placeholder='Lugar de Nacimiento'
              value={paciente.lugar_nacimiento || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='direccion'
              placeholder='Dirección'
              value={paciente.direccion || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='telefono'
              placeholder='Teléfono'
              value={paciente.telefono || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='movil'
              placeholder='Móvil'
              value={paciente.movil || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <select
              name='tipo_afiliado'
              value={paciente.tipo_afiliado || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            >
              <option value=''>Tipo de Afiliado</option>
              <option value='titular'>Titular</option>
              <option value='beneficiario'>Beneficiario</option>
            </select>
            <select
              name='tipo_sangre'
              value={paciente.tipo_sangre || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            >
              <option value=''>Tipo de Sangre</option>
              <option value='orh_n'>O-</option>
              <option value='orh_p'>O+</option>
              <option value='arh_n'>A-</option>
              <option value='arh_p'>A+</option>
              <option value='brh_n'>B-</option>
              <option value='brh_p'>B+</option>
              <option value='abrh_n'>AB-</option>
              <option value='abrh_p'>AB+</option>
            </select>
            <select
              name='estado'
              value={paciente.estado || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            >
              <option value=''>Estado</option>
              <option value='alta'>Activo</option>
              <option value='baja'>Inactivo</option>
            </select>
          </form>
        </div>
      </div>
    )
  }
)

export default PacientesComponent
