import { React, useState } from 'react'
import logo_oro from '../../assets/images/logo_oro.png'
import '../../assets/styles/Styles_Componentes/Monedero.css'
 
export default function Monedero() {
  const [monedero, setMonedero] = useState(0);
 
  const actualizar_monedero = () => {
    setMonedero(monedero => monedero + 2);
  };
 
  return (
    <div className="Monedero">
      <div className="div_monedero_contador">
        <img src={logo_oro}/>
        {monedero}
      </div>
      <div className="div_boton_monedero">
        <button className="boton_monedero" onClick={actualizar_monedero}>Sacar 2 monedas</button>
      </div>
    </div>
  );
}