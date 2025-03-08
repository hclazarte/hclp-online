import { useState } from 'react'

const CitasComponent = () => {
  const [especialidad, setEspecialidad] = useState('Reumatólogo')
  const [showDialog, setShowDialog] = useState(false)
  const [selectedCita, setSelectedCita] = useState(null)

  const citasPorEspecialidad = {
    Reumatólogo: [
      {
        id: 1,
        nombre: 'Edward Jenner',
        dia: 'Lunes',
        fecha: '03/02/2025',
        hora: '08:15'
      },
      {
        id: 2,
        nombre: 'Edward Jenner',
        dia: 'Lunes',
        fecha: '03/02/2025',
        hora: '10:30'
      },
      {
        id: 3,
        nombre: 'Andreas Vesalio',
        dia: 'Martes',
        fecha: '04/02/2025',
        hora: '12:30'
      },
      {
        id: 4,
        nombre: 'Edward Jenner',
        dia: 'Miércoles',
        fecha: '05/02/2025',
        hora: '08:15'
      },
      {
        id: 5,
        nombre: 'Edward Jenner',
        dia: 'Miércoles',
        fecha: '05/02/2025',
        hora: '10:45'
      }
    ],
    Cardiólogo: [
      {
        id: 6,
        nombre: 'William Harvey',
        dia: 'Jueves',
        fecha: '06/02/2025',
        hora: '10:00'
      },
      {
        id: 7,
        nombre: 'William Harvey',
        dia: 'Jueves',
        fecha: '06/02/2025',
        hora: '14:00'
      },
      {
        id: 8,
        nombre: 'Rene Laennec',
        dia: 'Viernes',
        fecha: '07/02/2025',
        hora: '14:00'
      },
      {
        id: 9,
        nombre: 'Paul Dudley White',
        dia: 'Sábado',
        fecha: '08/02/2025',
        hora: '09:00'
      }
    ],
    Neurólogo: [
      {
        id: 10,
        nombre: 'Santiago Ramón y Cajal',
        dia: 'Lunes',
        fecha: '10/02/2025',
        hora: '08:30'
      },
      {
        id: 11,
        nombre: 'Santiago Ramón y Cajal',
        dia: 'Lunes',
        fecha: '10/02/2025',
        hora: '10:00'
      },
      {
        id: 12,
        nombre: 'Jean-Martin Charcot',
        dia: 'Martes',
        fecha: '11/02/2025',
        hora: '12:45'
      },
      {
        id: 13,
        nombre: 'Alois Alzheimer',
        dia: 'Miércoles',
        fecha: '12/02/2025',
        hora: '11:15'
      }
    ]
  }

  const handleSelectCita = (cita) => {
    setSelectedCita(cita)
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setSelectedCita(null)
  }

  return (
    <div className='p-6 bg-inf1 min-h-screen flex flex-col items-center overflow-auto h-screen'>
      <select
        className='w-full max-w-md p-3 border border-inf4 rounded-lg bg-white'
        value={especialidad}
        onChange={(e) => setEspecialidad(e.target.value)}
      >
        <option value='Reumatólogo'>Reumatólogo</option>
        <option value='Cardiólogo'>Cardiólogo</option>
        <option value='Neurólogo'>Neurólogo</option>
      </select>

      <div className='mt-6 grid grid-cols-2 gap-4 w-full max-w-md'>
        {citasPorEspecialidad[especialidad].map((cita) => (
          <div
            key={cita.id}
            className='p-4 bg-inf3 border border-inf4 rounded-lg text-center cursor-pointer'
            onClick={() => handleSelectCita(cita)}
          >
            <p className='font-bold text-inf6'>{cita.nombre}</p>
            <p className='text-inf6'>{cita.dia}</p>
            <p className='text-inf6'>{cita.fecha}</p>
            <p className='text-inf6'>{cita.hora}</p>
          </div>
        ))}
      </div>

      {showDialog && selectedCita && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-inf2 p-6 rounded-lg shadow-lg text-center m-6'>
            <p className='mb-4 text-lg font-semibold'>
              Agendar una cita con el Dr. {selectedCita.nombre} para el{' '}
              {selectedCita.dia} {selectedCita.fecha}
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={handleCloseDialog}
                className='px-6 py-3 bg-inf7 text-white rounded-md font-medium'
              >
                Aceptar
              </button>
              <button
                onClick={handleCloseDialog}
                className='px-6 py-3 bg-inf7 text-white rounded-md font-medium'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CitasComponent
