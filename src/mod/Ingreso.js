import { useState } from 'react'

const Ingreso = ({ setAutenticado }) => {
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
            />
          </div>

          <div>
            <label className='block text-inf6 font-semibold'>Contraseña</label>
            <input
              type='password'
              className='w-full p-3 border border-inf4 rounded-lg focus:outline-none focus:ring-2 focus:ring-inf6'
              placeholder='Ingrese su contraseña'
            />
          </div>

          <button
            className='w-full bg-inf6 text-white p-3 rounded-lg font-semibold hover:bg-inf4 transition'
            onClick={() => setAutenticado(true)}
          >
            Iniciar sesión
          </button>
        </form>
        <p className='text-inf6 text-center mt-4 cursor-pointer hover:underline'>
          Olvidó su contraseña
        </p>
      </div>
    </div>
  )
}

export default Ingreso
