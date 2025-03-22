import { useEffect, useState, useRef } from 'react'
import Spinner from './common/SpinnerCom'

const Ingreso = ({ setAutenticado }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleAutenticacion = (e) => {
    e.preventDefault()
    setShowSpinner(true)
    setErrorMsg('')

    fetch(`${window.infoConfig.apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        setShowSpinner(false)
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error || 'Credenciales incorrectas')
          })
        }
        return response.json();
      })
      .then((data) => {
        setShowSpinner(false)
        setAutenticado(true)
        localStorage.setItem('access_token', data.access_token)
      })
      .catch((error) => {
        setErrorMsg(error.message)
      });    
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-inf2'>
      <div className='w-full max-w-md bg-inf2 p-8'>
        <h2 className='text-inf6 text-3xl font-bold text-center mb-6'>
          Iniciar
        </h2>
        <form className='space-y-4'>
          <div>
            <label className='block text-inf6 font-semibold'>Email</label>
            <input
              type='email'
              className='w-full p-3 border border-inf4 rounded-lg focus:outline-none focus:ring-2 focus:ring-inf6'
              placeholder='Ingrese su email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className='block text-inf6 font-semibold'>Contraseña</label>
            <input
              type='password'
              className='w-full p-3 border border-inf4 rounded-lg focus:outline-none focus:ring-2 focus:ring-inf6'
              placeholder='Ingrese su contraseña'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className='w-full bg-inf6 text-white p-3 rounded-lg font-semibold hover:bg-inf4 transition'
            onClick={(e) => handleAutenticacion(e)}
          >
            Iniciar sesión
          </button>
        </form>
        <p className='text-inf6 text-center mt-4 cursor-pointer hover:underline'>
          Olvidó su contraseña
        </p>
        {errorMsg && (
          <p className='text-red-600 text-center mt-2'>
            {errorMsg}
          </p>
        )}
      </div>
      {showSpinner && (<Spinner/>)}
    </div>
  )
}

export default Ingreso
