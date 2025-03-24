import { useState, useRef } from 'react'
import HerramientasCom from './common/HerramientasCom.js'
import MedicosComponent from './MedicosComponent.js'
import Spinner from './common/SpinnerCom.js'

const Medicos = () => {
  const [modo, setModo] = useState('consulta')
  const [showSpinner, setShowSpinner] = useState(false)
  const [medico, setMedico] = useState({})
  const [result, setResult] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const medicosRef = useRef()
  const medicoQbeRef = useRef({})
  const medicoUndoRef = useRef({})
  const pageRef = useRef(0)
  const pageMaxRef = useRef(0)

  const onClear = async () => {
    setMedico({})
    setResult({})
  }
  const onQuery = async () => {
    medicoQbeRef.current = medicosRef.current.getMedico()
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
    medicoUndoRef.current = medicosRef.current.getMedico()
    setMedico({})
  }
  const onEdit = async () => {
    medicoUndoRef.current = medicosRef.current.getMedico()
  }
  const onDelete = async () => {
    const token = localStorage.getItem('access_token');
    const medicoDelete = medicosRef.current.getMedico();
    
    setShowSpinner(true);
    
    const response = await fetch(
      `${window.infoConfig.apiUrl}/medicos/${medicoDelete.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    setShowSpinner(false);
    
    if (!response.ok) {
      const error = await response.text();
      setErrorMsg(`No se pudo eliminar el registro ${errorMsg}`);
      return false;
    }
    
    setErrorMsg('');
    if (pageRef.current === pageMaxRef.current) pageRef.current -= 1
    if (pageRef.current > 0 ) {
      await filtrar()
    }else{
      setMedico({})
      setResult({})
      setModo('consulta')
    }
    return true
  }
  const onCancel = async () => {
    setMedico(medicoUndoRef.current)
  }
  const onSave = async () => {
    const token = localStorage.getItem('access_token');
    const medicoEditOrNew = medicosRef.current.getMedico();
    
    setShowSpinner(true);
    
    let response;
    let isNew = false
    
    if (medicoEditOrNew.id === undefined) {
      isNew = true
      response = await fetch(`${window.infoConfig.apiUrl}/medicos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(medicoEditOrNew)
      });
    } else {
      response = await fetch(`${window.infoConfig.apiUrl}/medicos/${medicoEditOrNew.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(medicoEditOrNew)
      });
    }
    
    setShowSpinner(false);
    
    if (!response.ok) {
      const error = await response.text();
      setErrorMsg(`No se pudo guardar el registro ${errorMsg}`);
      return false;
    }
    
    const data = await response.json();
    let includeID = data.id
    setErrorMsg('');
    if (isNew) pageRef.current = 1
    filtrar(includeID);
    setModo('navegacion');
    return true
  }
  const validate = () => {
    return medicosRef.current.validateMedico()
  }
  const filtrar = async (includeID = '') => {
    const token = localStorage.getItem('access_token')
    const medicoData = medicoQbeRef.current

    setShowSpinner(true)
    const response = await fetch(
      `${window.infoConfig.apiUrl}/medicos/filtrar?page=${pageRef.current}&per_page=1&include=${includeID}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          medico: medicoData
        })
      }
    )
    setShowSpinner(false)
    if (!response.ok) {
      const error = await response.text()
      setErrorMsg(`No se pudo leer el registro ${errorMsg}`);
      return false
    }

    const data = await response.json()

    if (data.results.length === 0) {
      setErrorMsg('No existen datos para la consulta')
    } else {
      pageMaxRef.current = Number(data.count)
      setErrorMsg('')
      setResult(data)
      setMedico(data.results[0])
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
      {/* MedicosComponent recibe el modo y ajusta su UI */}
      <MedicosComponent
        ref={medicosRef}
        modo={modo}
        medico={medico}
        setMedico={setMedico}
      />
      {showSpinner && <Spinner />}
    </div>
  )
}

export default Medicos
