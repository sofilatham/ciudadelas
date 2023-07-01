import React, { useEffect, useState } from "react";

import EspacioCarta from "../EspacioCarta";
// import CartaEdificio from '../CartaEdificio';

const cartas = [
    {
        tipo: "noble",
        precio: 2,
    },
    {
        tipo: "noble",
        precio: 5,
    },
    {
        tipo: "noble",
        precio: 8,
    },
    {
        tipo: "noble",
        precio: 4,
    },
]

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

export default function SwapperPrecioCarta() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(currentIndex === cartas.length - 1) {
                setCurrentIndex(0);
            } 
            else {
                 setCurrentIndex(currentIndex + 1);
            }
        }, 500)
        return () => clearInterval(intervalId);
    }, [currentIndex])

    

    let color = tipo_color(cartas[currentIndex].tipo)
    let precio = cartas[currentIndex].precio

    return (
        <div>
            <EspacioCarta>
            <div className='carta_edificio' style={{backgroundColor:color}}>
                <img src={logo_edificio}></img>
                <p className='precio'>{precio}</p>
            </div>
            </EspacioCarta>
        </div>
    )
}