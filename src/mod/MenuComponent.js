import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AyudaComponent from "./AyudaComponent";

const MenuComponent = ({ setAutenticado }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAyuda, setIsAyuda] = useState(false);
  const navigate = useNavigate();
  const cerrarSesion = () => {
    setAutenticado(false); // Desautentica al usuario
    navigate("/"); // Redirige a la pantalla de inicio
  };

  return (
    <nav className="bg-inf2 border-b-2 border-inf4 p-4 relative">
      <div className="flex items-center justify-between">
        {/* Botón de menú con SVG */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-inf6 focus:outline-none"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4.5H21C21.3978 4.5 21.7794 4.65804 22.0607 4.93934C22.342 5.22064 22.5 5.60218 22.5 6C22.5 6.39782 22.342 6.77936 22.0607 7.06066C21.7794 7.34196 21.3978 7.5 21 7.5H3C2.60218 7.5 2.22064 7.34196 1.93934 7.06066C1.65804 6.77936 1.5 6.39782 1.5 6C1.5 5.60218 1.65804 5.22064 1.93934 4.93934C2.22064 4.65804 2.60218 4.5 3 4.5ZM3 10.5H21C21.3978 10.5 21.7794 10.658 22.0607 10.9393C22.342 11.2206 22.5 11.6022 22.5 12C22.5 12.3978 22.342 12.7794 22.0607 13.0607C21.7794 13.342 21.3978 13.5 21 13.5H3C2.60218 13.5 2.22064 13.342 1.93934 13.0607C1.65804 12.7794 1.5 12.3978 1.5 12C1.5 11.6022 1.65804 11.2206 1.93934 10.9393C2.22064 10.658 2.60218 10.5 3 10.5ZM3 16.5H21C21.3978 16.5 21.7794 16.658 22.0607 16.9393C22.342 17.2206 22.5 17.6022 22.5 18C22.5 18.3978 22.342 18.7794 22.0607 19.0607C21.7794 19.342 21.3978 19.5 21 19.5H3C2.60218 19.5 2.22064 19.342 1.93934 19.0607C1.65804 18.7794 1.5 18.3978 1.5 18C1.5 17.6022 1.65804 17.2206 1.93934 16.9393C2.22064 16.658 2.60218 16.5 3 16.5Z" fill="#4776d3"/>
          </svg>
        </button>

        {/* Título centrado */}
        <h1 className="text-xl font-bold text-inf6">Afiliados - La Paz</h1>

        {/* Icono de ayuda con SVG */}
        <button
          onClick={() => setIsAyuda(!isAyuda)}
          className="text-inf6 focus:outline-none"
        >
          <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1077 17.5385H10.8C10.4308 17.5385 10.1538 17.2615 10.1538 16.8923V16.2C10.1538 14.2615 11.4 12.5077 13.2461 11.8615C13.8 11.6769 14.3077 11.3538 14.7231 10.8923C17.0308 8.12308 14.9077 4.8 12.1385 4.70769C11.1231 4.66154 10.1538 5.03077 9.41538 5.72308C8.81538 6.27692 8.44615 6.96923 8.35384 7.75385C8.30769 8.03077 8.03076 8.26154 7.66153 8.26154H5.35384C4.93846 8.26154 4.61538 7.93846 4.66153 7.52308C4.84615 5.76923 5.63076 4.2 6.87692 2.95385C8.35384 1.56923 10.2461 0.830769 12.2769 0.876923C16.1077 1.01538 19.2461 4.15385 19.3846 7.98461C19.5231 11.2154 17.5385 14.1231 14.5385 15.2308C14.1231 15.4154 13.8461 15.7385 13.8461 16.1538V16.8462C13.8461 17.2615 13.4769 17.5385 13.1077 17.5385Z" fill="#4776d3"/>
            <path d="M13.8461 22.3846C13.8461 22.7538 13.5231 23.0769 13.1538 23.0769H10.8461C10.4769 23.0769 10.1538 22.7538 10.1538 22.3846V20.0769C10.1538 19.7077 10.4769 19.3846 10.8461 19.3846H13.1538C13.5231 19.3846 13.8461 19.7077 13.8461 20.0769V22.3846Z" fill="#4776d3"/>
          </svg>
        </button>
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-40 bg-inf2 border border-inf4 rounded-lg shadow-md z-10">
          <ul>
            <li className="border-b border-inf4 p-3 text-inf6 hover:bg-inf2 cursor-pointer">
              Afiliados
            </li>
            <li className="border-b border-inf4 p-3 text-inf6 hover:bg-red-100 cursor-pointer">
              Médicos
            </li>
            <li className="border-b border-inf4 p-3 text-inf6 hover:bg-red-100 cursor-pointer">
              Citas
            </li>
            <li 
              className="p-3 text-inf6 hover:bg-inf2 cursor-pointer"
              onClick={cerrarSesion}>Salir</li>
          </ul>
        </div>
      )}
      {isAyuda && (
        <AyudaComponent/>
      )}
    </nav>
  );
};

export default MenuComponent;
