import React from "react";
import MenuComponent from "./mod/MenuComponent";
import HerramientasComponent from "./mod/HerramientasComponent";
import './css/output.css'

function App() {
  return (
    <div className="h-screen bg-gray-100">
      <MenuComponent />
      <HerramientasComponent />
    </div>
  );
}

export default App;
