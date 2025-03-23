import { useState } from 'react'
import HerramientasCom from './common/HerramientasCom'
import MedicosComponent from './MedicosComponent.js'

const Medicos = () => {
  const [modo, setModo] = useState('consulta') // El estado vive aquí

  return (
    <div>
      {/* HerramientasCom puede modificar el modo */}
      <HerramientasCom modo={modo} setModo={setModo} />
      {/* MedicosComponent recibe el modo y ajusta su UI */}
      <MedicosComponent modo={modo} />
    </div>
  )
}

export default Medicos
