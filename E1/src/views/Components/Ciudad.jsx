import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import API_URL from "../../config";

import './../../assets/styles/Styles_Componentes/Componentes_Mapa.css'
import CartaEdificio from './CartaEdificio'
import Casilla from './Casilla'

import {JugadorContext_1, JugadorContext_2, JugadorContext_3, JugadorContext_4} from '../Juego.jsx';


// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function random_fill(){

//     const tipos_cartas = ['noble','militar','religioso','comercial']
//     const casillas = []
//     const tamano = 6

//     for (let i = 0; i < tamano; i++){
//         const prob = getRandomInt(1,100)
//         if (prob < 70){ 
//             const rand_int_tipo = getRandomInt(0,3)
//             const rand_int_precio = getRandomInt(1,9)
//             const tipo_rand = tipos_cartas[rand_int_tipo]
//             casillas.push(<Casilla><CartaEdificio tipo={tipo_rand} precio={rand_int_precio}></CartaEdificio></Casilla>)
//         }
//         else{
//             casillas.push(<Casilla></Casilla>)
//         }
        
//     }

//     return casillas

// }

export default function Ciudad({chosen_fill, idContexto, funcionColocar, funcionDestruir}) {

    const contextos = [JugadorContext_1, JugadorContext_2, JugadorContext_3, JugadorContext_4]

    const [
        nombreUsuario, 
        setNombreUsuario, 
        urlUsuario, 
        setUrlUsuario, 
        monedero, 
        setMonedero, 
        corona, 
        setCorona, 
        personajeID, 
        setPersonajeID,
        cartasBaraja,
        setCartasBaraja,
        cambiarCartasCiudad,
        cambiarCartasBaraja,
        cambiarMonedero
    ] = useContext(contextos[idContexto-1]);

    const [cartasCiudad, setCartasCiudad] = useState([]);

    const empty_fill = () => {

        const casillas = []
        const tamano = 6
    
        for (let i = 0; i < tamano; i++){
            casillas.push(<Casilla posicion={i+1} funcionColocar={funcionColocar}></Casilla>)
        }
            
        return casillas
    
    }

    

    useEffect(() => {
        if (chosen_fill === 'random_fill'){
            setCartasCiudad(random_fill())
        }
        else{

            var idJugador = chosen_fill

            axios.get(`${API_URL}/cartas/ciudad/${idJugador}`)
            .then((response) => {
                var cartas = empty_fill()
                const tamano = response.data.length;
                for (let i = 0; i < tamano; i++){
                    var id = response.data[i].id
                    var pos = response.data[i].posicion
                    var tipo = response.data[i].tipo
                    var precio = response.data[i].precio
                    const child = [<CartaEdificio tipo={tipo} precio={precio} id={id} pos={pos} funcionDestruir={funcionDestruir}></CartaEdificio>]
                    cartas[pos-1] = <Casilla child={child} posicion={pos} funcionColocar={funcionColocar}></Casilla>
                }
                setCartasCiudad(cartas)
            }).catch((error) => {
                console.log(error)
            })

        }
    
    }, [cambiarCartasCiudad]);
    
    
    return (
        <div className='div_ciudad'>
            {cartasCiudad}
        </div>
    )
}