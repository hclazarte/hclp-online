import { useState } from 'react'
import HerramientasComponent from './HerramientasComponent'
import AfiliadosComponent from './AfiliadosComponent.js'

const Afiliados = () => {
  const [modo, setModo] = useState('consulta') // El estado vive aquí

  return (
    <div>
      {/* HerramientasComponent puede modificar el modo */}
      <HerramientasComponent modo={modo} setModo={setModo} />
      {/* AfiliadosComponent recibe el modo y ajusta su UI */}
      <AfiliadosComponent modo={modo} />
    </div>
  )
}

export default Afiliados
