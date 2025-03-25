import { useState, useEffect } from 'react'
import Spinner from './common/SpinnerCom.js'

const CitasComponent = () => {
  const [especialidadId, setEspecialidadId] = useState(1)
  const [especialidadNombre, setEspecialidadNombre] = useState('Reumatólogo')
  const [citas, setCitas] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [selectedCita, setSelectedCita] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)
  const [pacientes, setPacientes] = useState([])
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [infoMsg, setInfoMsg] = useState('')

  const ESPECIALIDADES = [
    { id: 1, nombre: 'Reumatólogo' },
    { id: 2, nombre: 'Cardiólogo' },
    { id: 3, nombre: 'Neurólogo' }
  ]

  useEffect(() => {
    const fetchCitas = async () => {
      const token = localStorage.getItem('access_token')
      setShowSpinner(true)
      const response = await fetch(
        `${window.infoConfig.apiUrl}/citas/disponibles`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ especialidad_id: especialidadId })
        }
      )
      setShowSpinner(false)
      if (response.status === 401) {
        window.location.href = '/'
        return
      }
      const data = await response.json()
      setCitas(data)
    }

    fetchCitas()
  }, [especialidadId])
  
  useEffect(() => {
    const fetchPacientes = async () => {
      const token = localStorage.getItem('access_token')
      setShowSpinner(true)
      const response = await fetch(`${window.infoConfig.apiUrl}/pacientes/filtrar?page=1&per_page=100`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ paciente: {} })
      })
      setShowSpinner(false)
  
      if (response.status === 401) {
        window.location.href = '/'
        return
      }
  
      if (response.ok) {
        const data = await response.json()
        // Ordenamos por nombre y apellido
        const ordenados = data.results.sort((a, b) => {
          const nombreA = `${a.nombre} ${a.apellido_paterno}`.toLowerCase()
          const nombreB = `${b.nombre} ${b.apellido_paterno}`.toLowerCase()
          return nombreA.localeCompare(nombreB)
        })
  
        setPacientes(ordenados)
        setPacienteSeleccionado(ordenados[0]) // Selecciona el primero
      }
    }
  
    fetchPacientes()
  }, [])  
  
  const handleSelectCita = (cita) => {
    setSelectedCita(cita)
    setShowDialog(true)
  }

  const handleAgendar = async () => {
    if (!selectedCita) return

    const token = localStorage.getItem('access_token')

    const payload = {
      cita: {
        medico_id: selectedCita.medico_id,
        especialidad_id: especialidadId,
        paciente_id: pacienteSeleccionado.id,
        estado: 1,
        dia: selectedCita.dia,
        hora: selectedCita.hora,
        fecha: selectedCita.fecha
      }
    }

    const response = await fetch(`${window.infoConfig.apiUrl}/citas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    setShowDialog(false)
    if (response.status === 401) {
      window.location.href = '/'
      return
    }

    setErrorMsg('')
    setInfoMsg('')
    if (response.ok) {
      setInfoMsg('Cita agendada exitosamente')
        setTimeout(() => {
          setInfoMsg('')
        }, 5000)
    } else {
      const err = await response.text()
      setErrorMsg(`Error al agendar cita: ${err}`)
      setTimeout(() => {
        setErrorMsg('')
      }, 5000)    }
  }

  return (
    <div className='p-6 bg-inf1 min-h-screen flex flex-col items-center overflow-auto h-screen'>
      {infoMsg && (
        <p className='text-green-700 bg-green-100 text-center mt-2 mb-4 px-4 py-2 rounded-lg font-semibold shadow'>
          {infoMsg}
        </p>
      )}

      {errorMsg && (
        <p className='text-red-700 bg-red-100 text-center mt-2 mb-4 px-4 py-2 rounded-lg font-semibold shadow'>
          {errorMsg}
        </p>
      )}
      <select
        className='w-full max-w-md p-3 border border-inf4 rounded-lg bg-white'
        value={especialidadId}
        onChange={(e) => {
          const id = parseInt(e.target.value)
          const nombre =
            ESPECIALIDADES.find((esp) => esp.id === id)?.nombre || ''
          setEspecialidadId(id)
          setEspecialidadNombre(nombre)
        }}
      >
        {ESPECIALIDADES.map((esp) => (
          <option key={esp.id} value={esp.id}>
            {esp.nombre}
          </option>
        ))}
      </select>
      <select
        className='w-full max-w-md p-3 border border-inf4 rounded-lg bg-white'
        value={pacienteSeleccionado?.id || ''}
        onChange={(e) => {
          const id = parseInt(e.target.value)
          const paciente = pacientes.find((p) => p.id === id)
          setPacienteSeleccionado(paciente)
        }}
      >
        {pacientes.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre} {p.apellido_paterno}
          </option>
        ))}
      </select>

      {showSpinner ? (
        <Spinner />
      ) : (
        <div className='mt-6 grid grid-cols-2 gap-4 w-full max-w-md'>
          {citas.map((cita, index) => (
            <div
              key={index}
              className='p-4 bg-inf3 border border-inf4 rounded-lg text-center cursor-pointer'
              onClick={() => handleSelectCita(cita)}
            >
              <p className='font-bold text-inf6'>{cita.medico_nombre}</p>
              <p className='text-inf6'>{cita.dia}</p>
              <p className='text-inf6'>{cita.fecha}</p>
              <p className='text-inf6'>{cita.hora}</p>
            </div>
          ))}
        </div>
      )}

      {showDialog && selectedCita && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-inf2 p-6 rounded-lg shadow-lg text-center m-6'>
            <p className='mb-4 text-lg font-semibold'>
              ¿Agendar cita con {selectedCita.medico_nombre} para {' '}
              {pacienteSeleccionado.nombre} {pacienteSeleccionado.apellido_paterno} el{' '}
              {selectedCita.dia} {selectedCita.fecha} a las {selectedCita.hora}?
            </p>
            <div className='flex justify-center gap-4'>
              <button
                onClick={handleAgendar}
                className='px-6 py-3 bg-inf7 text-white rounded-md font-medium'
              >
                Aceptar
              </button>
              <button
                onClick={() => setShowDialog(false)}
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
