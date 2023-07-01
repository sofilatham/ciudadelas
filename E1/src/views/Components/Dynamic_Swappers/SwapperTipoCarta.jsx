import React, { useEffect, useState } from "react";

import Casilla from "./../Casilla";
import CartaEdificio from './../CartaEdificio';

const cartas = [
    {
        tipo: "noble",
        precio: 8,
    },
    {
        tipo: "religioso",
        precio: 8,
    },
    {
        tipo: "militar",
        precio: 8,
    },
    {
        tipo: "comercial",
        precio: 8,
    },
]

export default function SwapperTipoCarta() {
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

    return (
        <div>
            <Casilla><CartaEdificio tipo={cartas[currentIndex].tipo} precio={cartas[currentIndex].precio}></CartaEdificio></Casilla>
        </div>
    )
}