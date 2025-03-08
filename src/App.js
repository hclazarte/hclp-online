import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { useState } from 'react'
import Ingreso from './mod/Ingreso'
import Principal from './mod/Principal' // Nuevo Layout
import Afiliados from './mod/Afiliados'
import Medicos from './mod/Medicos'
import Citas from './mod/Citas'
import './css/output.css'

const App = () => {
  const [autenticado, setAutenticado] = useState(false)

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            autenticado ? (
              <Navigate to='/app/afiliados' />
            ) : (
              <Ingreso setAutenticado={setAutenticado} />
            )
          }
        />
        <Route
          path='/app'
          element={<Principal setAutenticado={setAutenticado} />}
        >
          <Route path='afiliados' element={<Afiliados />} />
          <Route path='medicos' element={<Medicos />} />
          <Route path='citas' element={<Citas />} />
          <Route path='*' element={<Navigate to='afiliados' />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
