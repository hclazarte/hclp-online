import { estilosModo } from '../config/estilosModo'

const MedicosComponent = ({ modo }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-md w-full max-w-lg mt-1 border bg-inf2 overflow-auto h-screen`}
    >
      <form className='space-y-4'>
        <input
          type='text'
          placeholder='Nombre'
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        />
        <input
          type='text'
          placeholder='Apellido Paterno'
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        />
        <input
          type='text'
          placeholder='Apellido Materno'
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        />
        <select
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        >
          <option>Regional</option>
        </select>
        <input
          type='text'
          placeholder='Dirección'
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        />
        <select
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        >
          <option>Especialidad</option>
        </select>
        <input
          type='text'
          placeholder='Teléfono Domicilio'
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        />
        <input
          type='text'
          placeholder='Teléfono Oficina'
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        />
        <input
          type='text'
          placeholder='Teléfono Celular'
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        />
        <input
          type='email'
          placeholder='E-mail'
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        />
        <select
          className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`}
          disabled={modo === 'navegacion'}
        >
          <option>Estado</option>
        </select>
      </form>
    </div>
  )
}

export default MedicosComponent
