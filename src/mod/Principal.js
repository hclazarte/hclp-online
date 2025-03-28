import { Outlet } from 'react-router-dom'
import MenuComponent from './MenuComponent'

const Principal = ({ setAutenticado }) => {
  return (
    <div>
      <MenuComponent setAutenticado={setAutenticado} />
      <Outlet /> {/* Aquí se renderizarán Pacientes, Médicos y Citas */}
    </div>
  )
}

export default Principal
