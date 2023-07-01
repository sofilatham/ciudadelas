import React, {useContext, useState, useEffect} from 'react';

import '../../assets/styles/Styles_Componentes/CartasEdificios.css'

import logo_edificio from '../../assets/images/edificio_logo.png'


function tipo_color(tipo){
    if (tipo=='noble'){
        return '#f4ab21'
    }

    if (tipo=='religioso'){
        return '#4588ce'
    }

    if (tipo=='militar'){
        return '#f41537'
    }

    if (tipo=='comercial'){
        return '#4fa543'
    }

}


export default function CartaEdificio({tipo, precio, pos, funcionColocar, funcionDestruir}){

    const color = tipo_color(tipo)

    //const [turnoActual, setTurnoActual, idContextoActual, primerTurno, setPrimerTurno] = useContext(ContextoPartida);
    // const [selecionada, setSelecionada] = useState(false)

    // useEffect(() => {
    //     if (cartaSelecionada){
    //         const idJSelecionado = cartaSelecionada[0]
    //         const posicionSelecionada = cartaSelecionada[1]
    //         if ((idJSelecionado == idJugadorActual) && (posicionSelecionada == pos)){
    //             setSelecionada(true);
    //         }else{
    //             setSelecionada(false)
    //         }
    //     }else{
    //         setSelecionada(false)
    //     }
    // }, [cartaSelecionada])


    const handleClick = () => {
        if (funcionColocar){
            funcionColocar(pos)
        }else{
            funcionDestruir(pos)
        }
    }

    return (
        <div onClick={handleClick} className='carta_edificio' style={{backgroundColor:color}}>
            <img src={logo_edificio}></img>
            <p className='precio'>{precio}</p>
        </div>
        
    )
}