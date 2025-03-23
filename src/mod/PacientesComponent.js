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
            <input
              type='text'
              name='estado_civil'
              placeholder='Estado Civil'
              value={paciente.estado_civil || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
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
              name='tipo_Paciente'
              value={paciente.tipo_Paciente || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            >
              <option value=''>Tipo Paciente</option>
              <option value='Titular'>Titular</option>
              <option value='Beneficiario'>Beneficiario</option>
            </select>
            <select
              name='tipo_sangre'
              value={paciente.tipo_sangre || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            >
              <option value=''>Tipo de Sangre</option>
              <option value='A+'>A+</option>
              <option value='O-'>O-</option>
              {/* Agrega los que necesites */}
            </select>
            <select
              name='estado'
              value={paciente.estado || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            >
              <option value=''>Estado</option>
              <option value='Activo'>Activo</option>
              <option value='Inactivo'>Inactivo</option>
            </select>
          </form>
        </div>
      </div>
    )
  }
)

export default PacientesComponent
