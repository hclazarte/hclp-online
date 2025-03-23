import { useState, useRef, useSyncExternalStore } from 'react'
import HerramientasCom from './common/HerramientasCom.js'
import PacientesComponent from './PacientesComponent.js'
import Spinner from './common/SpinnerCom.js'

const Pacientes = () => {
  const [modo, setModo] = useState('consulta')
  const [showSpinner, setShowSpinner] = useState(false)
  const [paciente, setPaciente] = useState({})
  const [result, setResult] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const PacientesRef = useRef()
  const pacienteDataRef = useRef({})
  const pageRef = useRef(0)
  const pageMaxRef = useRef(0)

  const onClear = async () => {
    setPaciente({})
    setResult({})
  }
  const onQuery = async () => {
    pacienteDataRef.current = PacientesRef.current.getPaciente()
    pageRef.current = 1
    await filtrar()
  }
  const onNavigate = async (button) => {
    if (button === 'primero') {
      pageRef.current = 1
      await filtrar()
    } else if (button === 'anterior') {
      pageRef.current -= 1
      if (pageRef.current === 0) pageRef.current = 1
      await filtrar()
    } else if (button === 'siguiente') {
      pageRef.current += 1
      if (pageRef.current > pageMaxRef.current)
        pageRef.current = pageMaxRef.current
      await filtrar()
    } else if (button === 'ultimo') {
      pageRef.current = pageMaxRef.current
      await filtrar()
    }
  }
  const onNew = async () => {
    setPaciente({})
  }
  const filtrar = async () => {
    const token = localStorage.getItem('access_token')
    const pacienteData = pacienteDataRef.current

    setShowSpinner(true)
    const response = await fetch(
      `${window.infoConfig.apiUrl}/pacientes/filtrar?page=${pageRef.current}&per_page=1`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          paciente: pacienteData
        })
      }
    )
    setShowSpinner(false)
    if (!response.ok) {
      const error = await response.text()
      console.error('Error en el PATCH:', error)
      return
    }

    const data = await response.json()

    if (data.results.length === 0) {
      setErrorMsg('No existen datos para la consulta')
    } else {
      pageMaxRef.current = Number(data.count)
      setErrorMsg('')
      setResult(data)
      setPaciente(data.results[0])
      setModo('navegacion')
    }
  }
  return (
    <div>
      {/* HerramientasCom puede modificar el modo */}
      <HerramientasCom
        modo={modo}
        result={result}
        errorMsg={errorMsg}
        setErrorMsg={setErrorMsg}
        setModo={setModo}
        onQuery={onQuery}
        onClear={onClear}
        onNavigate={onNavigate}
        onNew={onNew}
      />
      {/* PacientesComponent recibe el modo y ajusta su UI */}
      <PacientesComponent
        ref={PacientesRef}
        modo={modo}
        paciente={paciente}
        setPaciente={setPaciente}
      />
      {showSpinner && <Spinner />}
    </div>
  )
}

export default Pacientes
