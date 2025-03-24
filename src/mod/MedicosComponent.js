import { forwardRef, useImperativeHandle } from 'react'
import { estilosModo } from '../config/estilosModo'

const MedicosComponent = forwardRef(
  ({ modo, medico, setMedico }, ref) => {
    const handleChange = (e) => {
      const { name, value } = e.target
      setMedico((prev) => ({ ...prev, [name]: value }))
    }
    useImperativeHandle(ref, () => ({
      getMedico: () => {
        return medico
      }
    }))
    useImperativeHandle(ref, () => ({
      getMedico: () => medico,
      validateMedico: () => validateMedico(medico)
    }))
    const todasLasEspecialidades =
      [
        {
          id: 1,
          nombre: 'Diagnóstico Médico',
          descripcion: 'Especialista en casos médicos complejos y raros.'
        },
        {
          id: 2,
          nombre: 'Cirugía General',
          descripcion: 'Especialista en intervenciones quirúrgicas de diferentes tipos.'
        },
        {
          id: 3,
          nombre: 'Psiquiatría',
          descripcion: 'Especialista en trastornos mentales y comportamiento humano.'
        }
      ];
    const handleEspecialidadesChange = (especialidad, checked) => {
      let updated = [...(medico.especialidades || [])]
    
      if (checked) {
        // Agregar si no está
        if (!updated.some(e => e.id === especialidad.id)) {
          updated.push(especialidad)
        }
      } else {
        // Quitar si ya está
        updated = updated.filter(e => e.id !== especialidad.id)
      }
    
      setMedico({
        ...medico,
        especialidades: updated
      })
    }
    
    const handleHorarioChange = () => {

    }

    const validateMedico = (medico) => {
      if (!medico.nombre || medico.nombre.trim() === '') {
        return 'El nombre es obligatorio'
      }
      if (!medico.apellido_paterno || medico.apellido_paterno.trim() === '') {
        return 'El apellido paterno es obligatorio'
      }
      if (!medico.cedula || medico.cedula.trim() === '') {
        return 'La cédula es obligatoria'
      }
      if (!medico.registro_profesional || medico.registro_profesional.trim() === '') {
        return 'El registro profesional es obligatorio'
      }
      if (!medico.estado || !['alta', 'baja'].includes(medico.estado)) {
        return 'El estado debe ser "alta" o "baja"'
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
              value={medico.nombre || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='apellido_paterno'
              placeholder='Apellido Paterno'
              value={medico.apellido_paterno || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='apellido_materno'
              placeholder='Apellido Materno'
              value={medico.apellido_materno || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='cedula'
              placeholder='Cédula'
              value={medico.cedula || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='registro_profesional'
              placeholder='Registro Profesional'
              value={medico.registro_profesional || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='direccion'
              placeholder='Dirección'
              value={medico.direccion || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='telefono'
              placeholder='Teléfono'
              value={medico.telefono || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='telefono2'
              placeholder='Teléfono alternativo'
              value={medico.telefono2 || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='text'
              name='movil'
              placeholder='Móvil'
              value={medico.movil || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={medico.email || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            />
            <select
              name='estado'
              value={medico.estado || ''}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
              disabled={modo === 'navegacion'}
            >
              <option value=''>Estado</option>
              <option value='alta'>Activo</option>
              <option value='baja'>Inactivo</option>
            </select>

            {/* Especialidades */}
            <div className='w-full'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Especialidades</label>
              <div className='grid grid-cols-2 gap-2'>
                {todasLasEspecialidades.map((esp) => {
                  const checked = medico.especialidades?.some(
                    (e) => e.id === esp.id
                  )

                  return (
                    <label key={esp.id} className='flex items-center space-x-2'>
                      <input
                        type='checkbox'
                        value={esp.id}
                        checked={checked}
                        onChange={(e) => handleEspecialidadesChange(esp, e.target.checked)}
                        disabled={modo === 'navegacion'}
                      />
                      <span>{esp.nombre}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Horarios */}
            <div className='w-full'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Horarios</label>
                {medico.horario_medicos?.map((horario, index) => (
                  <div key={index} className='flex flex-col gap-2 mb-4'>
                    <div className='flex gap-2'>
                      <input
                        type='text'
                        name={`horario-${index}-dia`}
                        value={horario.dia || ''}
                        placeholder='Día'
                        onChange={(e) => handleHorarioChange(index, 'dia', e.target.value)}
                        className={`w-1/3 p-2 rounded-lg border ${estilosModo[modo]}`}
                        disabled={modo === 'navegacion'}
                      />
                      <input
                        type='time'
                        name={`horario-${index}-hora_inicio`}
                        value={horario.hora_inicio?.slice(11, 16) || ''}
                        placeholder='Hora Inicio'
                        onChange={(e) => handleHorarioChange(index, 'hora_inicio', e.target.value)}
                        className={`w-1/3 p-2 rounded-lg border ${estilosModo[modo]}`}
                        disabled={modo === 'navegacion'}
                      />
                      <input
                        type='time'
                        name={`horario-${index}-hora_fin`}
                        value={horario.hora_fin?.slice(11, 16) || ''}
                        placeholder='Hora Fin'
                        onChange={(e) => handleHorarioChange(index, 'hora_fin', e.target.value)}
                        className={`w-1/3 p-2 rounded-lg border ${estilosModo[modo]}`}
                        disabled={modo === 'navegacion'}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </form>
        </div>
      </div>
    )    
  }
)

export default MedicosComponent
