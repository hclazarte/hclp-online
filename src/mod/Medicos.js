import { useState } from 'react'
import HerramientasComponent from './HerramientasComponent'
import MedicosComponent from './MedicosComponent.js'

const Medicos = () => {
  const [modo, setModo] = useState('consulta') // El estado vive aquí

  return (
    <div className='flex flex-col items-center bg-inf1 min-h-screen'>
      {/* HerramientasComponent puede modificar el modo */}
      <HerramientasComponent modo={modo} setModo={setModo} />
      {/* MedicosComponent recibe el modo y ajusta su UI */}
      <MedicosComponent modo={modo} />
    </div>
  )
}

export default Medicos
