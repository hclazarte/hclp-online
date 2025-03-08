import { useState } from "react";
import HerramientasComponent from "./HerramientasComponent";

const AfiliadosComponent = ({modo}) => {
  const estilosModo = {
    consulta: "bg-yellow-50 text-inf4 border-inf4",
    navegacion: "bg-inf2 text-inf7 border-inf6",
    edicion: "bg-inf1 text-black border-inf4",
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className={`p-6 rounded-lg shadow-md w-full max-w-lg mt-1 border bg-inf2`}>
        <form className="space-y-4">
          <input type="text" placeholder="Nombre" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <input type="text" placeholder="Apellido Paterno" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <input type="text" placeholder="Apellido Materno" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <input type="text" placeholder="Nro. de Cédula" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <input type="text" placeholder="Estado Civil" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <input type="text" placeholder="Ocupación" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <select className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"}>
            <option>Regional</option>
          </select>
          <input type="text" placeholder="Fecha de Nacimiento (dd/mm/aaaa)" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <input type="text" placeholder="Lugar de Nacimiento" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <input type="text" placeholder="Dirección" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <input type="text" placeholder="Teléfono" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <input type="text" placeholder="Móvil" className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"} />
          <select className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"}>
            <option>Tipo Afiliado</option>
          </select>
          <select className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"}>
            <option>Tipo de Sangre</option>
          </select>
          <select className={`w-full p-3 rounded-lg border ${estilosModo[modo]}`} disabled={modo === "navegacion"}>
            <option>Estado</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default AfiliadosComponent;
