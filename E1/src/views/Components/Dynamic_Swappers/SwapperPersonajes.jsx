import React, { useEffect, useState } from "react";

import Ladron from '../Personajes/Ladron'
import Rey from '../Personajes/Rey'
import Guerrero from '../Personajes/Guerrero'
import Arquitecto from '../Personajes/Arquitecto'
import EspacioCarta from '../EspacioCarta'

const cartas = []
cartas.push(<Ladron/>)
cartas.push(<Rey/>)
cartas.push(<Arquitecto/>)
cartas.push(<Guerrero/>)

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
            <EspacioCarta>{cartas[currentIndex]}</EspacioCarta>
        </div>
    )
}