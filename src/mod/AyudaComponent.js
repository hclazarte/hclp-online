const AyudaComponent = ({setIsAyuda}) => {

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-80 bg-inf1 border border-inf4 rounded-lg shadow-md p-4 z-50">
      <button onClick={() => setIsAyuda()}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.2929 11L12.1464 7.85355C11.9512 7.65829 11.9512 7.34171 12.1464 7.14645C12.3417 6.95118 12.6583 6.95118 12.8536 7.14645L16.8536 11.1464C17.0488 11.3417 17.0488 11.6583 16.8536 11.8536L12.8536 15.8536C12.6583 16.0488 12.3417 16.0488 12.1464 15.8536C11.9512 15.6583 11.9512 15.3417 12.1464 15.1464L15.2929 12H4.5C4.22386 12 4 11.7761 4 11.5C4 11.2239 4.22386 11 4.5 11H15.2929ZM19 4.5C19 4.22386 19.2239 4 19.5 4C19.7761 4 20 4.22386 20 4.5V18.5C20 18.7761 19.7761 19 19.5 19C19.2239 19 19 18.7761 19 18.5V4.5Z" fill="#527dd6" />
        </svg>
      </button>
      <p className="text-inf6">
        La presente sección tiene como objetivo brindar asistencia y orientación
        sobre el uso de la plataforma de gestión de citas médicas en un sistema
        de salud descentralizado. Aquí encontrarás instrucciones detalladas,
        respuestas a preguntas frecuentes y guías paso a paso para facilitar la
        navegación en el sistema.
      </p>
    </div>
  );
};

export default AyudaComponent;
