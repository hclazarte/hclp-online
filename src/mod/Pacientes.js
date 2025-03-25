import { useState, useRef } from 'react'
import HerramientasCom from './common/HerramientasCom.js'
import PacientesComponent from './PacientesComponent.js'
import Spinner from './common/SpinnerCom.js'

const Pacientes = () => {
  const [modo, setModo] = useState('consulta')
  const [showSpinner, setShowSpinner] = useState(false)
  const [paciente, setPaciente] = useState({})
  const [result, setResult] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const pacientesRef = useRef()
  const pacienteQbeRef = useRef({})
  const pacienteUndoRef = useRef({})
  const pageRef = useRef(0)
  const pageMaxRef = useRef(0)

  const onClear = async () => {
    setPaciente({})
    setResult({})
  }
  const onQuery = async () => {
    pacienteQbeRef.current = pacientesRef.current.getPaciente()
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
    pacienteUndoRef.current = pacientesRef.current.getPaciente()
    setPaciente({})
  }
  const onEdit = async () => {
    pacienteUndoRef.current = pacientesRef.current.getPaciente()
  }
  const onDelete = async () => {
    const token = localStorage.getItem('access_token')
    const pacienteDelete = pacientesRef.current.getPaciente()

    setShowSpinner(true)

    const response = await fetch(
      `${window.infoConfig.apiUrl}/pacientes/${pacienteDelete.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    setShowSpinner(false)

    if (!response.ok) {
      const error = await response.text()
      setErrorMsg(`No se pudo eliminar el registro ${errorMsg}`)
      return false
    }

    setErrorMsg('')
    if (pageRef.current === pageMaxRef.current) pageRef.current -= 1
    if (pageRef.current > 0) {
      await filtrar()
    } else {
      setPaciente({})
      setResult({})
      setModo('consulta')
    }
    return true
  }
  const onCancel = async () => {
    setPaciente(pacienteUndoRef.current)
  }
  const onSave = async () => {
    const token = localStorage.getItem('access_token')
    const pacienteEditOrNew = pacientesRef.current.getPaciente()

    setShowSpinner(true)

    let response
    let isNew = false

    if (pacienteEditOrNew.id === undefined) {
      let isNew = true
      response = await fetch(`${window.infoConfig.apiUrl}/pacientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ paciente: pacienteEditOrNew })
      })
    } else {
      response = await fetch(
        `${window.infoConfig.apiUrl}/pacientes/${pacienteEditOrNew.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ paciente: pacienteEditOrNew })
        }
      )
    }

    setShowSpinner(false)

    if (!response.ok) {
      const error = await response.text()
      setErrorMsg(`No se pudo guardar el registro ${errorMsg}`)
      return false
    }

    const data = await response.json()
    let includeID = data.id
    setErrorMsg('')
    if (isNew) pageRef.current = 1
    filtrar(includeID)
    setModo('navegacion')
    return true
  }
  const validate = () => {
    return pacientesRef.current.validatePaciente()
  }
  const filtrar = async (includeID = '') => {
    const token = localStorage.getItem('access_token')
    const pacienteData = pacienteQbeRef.current

    setShowSpinner(true)
    const response = await fetch(
      `${window.infoConfig.apiUrl}/pacientes/filtrar?page=${pageRef.current}&per_page=1&include=${includeID}`,
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
      setErrorMsg(`No se pudo leer el registro ${errorMsg}`)
      return false
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
        onEdit={onEdit}
        onDelete={onDelete}
        onCancel={onCancel}
        onSave={onSave}
        validate={validate}
      />
      {/* PacientesComponent recibe el modo y ajusta su UI */}
      <PacientesComponent
        ref={pacientesRef}
        modo={modo}
        paciente={paciente}
        setPaciente={setPaciente}
      />
      {showSpinner && <Spinner />}
    </div>
  )
}

export default Pacientes
