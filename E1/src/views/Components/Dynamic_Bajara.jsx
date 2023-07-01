import BarajaUsuario from "./BarajaUsuario"
import CartaEdificio from "./CartaEdificio"
import EspacioCarta from "./EspacioCarta"
import '../../assets/styles/Styles_Componentes/Dynamic_Bajara.css'
import { React, useState } from 'react'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export default function Dynamic_Bajara(){


    const [cartas, setCartas] = useState([]);

    const actualizar_cartas = () => {

        const tipos_cartas = ['noble','militar','religioso','comercial']

        const rand_int_tipo = getRandomInt(0,3)
        const rand_int_precio = getRandomInt(1,9)
        const tipo_rand = tipos_cartas[rand_int_tipo]

        const rand_int_tipo_bis = getRandomInt(0,3)
        const rand_int_precio_bis = getRandomInt(1,9)
        const tipo_rand_bis = tipos_cartas[rand_int_tipo_bis]


        setCartas(cartas => cartas.concat(<EspacioCarta><CartaEdificio tipo={tipo_rand} precio={rand_int_precio}></CartaEdificio></EspacioCarta>));
        setCartas(cartas => cartas.concat(<EspacioCarta><CartaEdificio tipo={tipo_rand_bis} precio={rand_int_precio_bis}></CartaEdificio></EspacioCarta>));
    };

    return (
        <div className="bajara_dinamico">
            <div className="bajara">
                <BarajaUsuario>{cartas}</BarajaUsuario>
            </div>
            <div className="button">
                <button onClick={actualizar_cartas}>Sacar 2 cartas</button>
            </div>
        </div>
        

    )

}