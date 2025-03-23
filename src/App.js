import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useState } from 'react'
import Ingreso from './mod/Ingreso'
import Principal from './mod/Principal' // Nuevo Layout
import Pacientes from './mod/Pacientes'
import Medicos from './mod/Medicos'
import Citas from './mod/Citas'
import './css/output.css'

const App = () => {
  const [autenticado, setAutenticado] = useState(false)

  return (
    <div className='relative min-h-screen bg-inf1'>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              autenticado ? (
                <Navigate to='/app/Pacientes' />
              ) : (
                <Ingreso setAutenticado={setAutenticado} />
              )
            }
          />
          <Route
            path='/app'
            element={<Principal setAutenticado={setAutenticado} />}
          >
            <Route path='pacientes' element={<Pacientes />} />
            <Route path='medicos' element={<Medicos />} />
            <Route path='citas' element={<Citas />} />
            <Route path='*' element={<Navigate to='pacientes' />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
