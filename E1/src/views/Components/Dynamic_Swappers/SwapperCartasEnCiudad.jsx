import React, { useEffect, useState } from "react";

import Ciudad from '../Ciudad';

const ciudades = []
for (let i = 0; i < 5; i++){
    ciudades.push(<Ciudad chosen_fill='random_fill'></Ciudad>)
}

export default function SwapperPrecioCarta() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(currentIndex === ciudades.length - 1) {
                setCurrentIndex(0);
            } 
            else {
                 setCurrentIndex(currentIndex + 1);
            }
        }, 1000)
        return () => clearInterval(intervalId);
    }, [currentIndex])

    return (
        <div>
            {ciudades[currentIndex]}
        </div>
    )
}