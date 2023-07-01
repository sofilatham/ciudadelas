import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import API_URL from "../../config";

import './../../assets/styles/Styles_Componentes/CartasEdificios.css'
import CartaEdificio from './CartaEdificio'
import EspacioCarta from './EspacioCarta'

import {JugadorContext_1, JugadorContext_2, JugadorContext_3, JugadorContext_4} from '../Juego.jsx';


export default function BarajaUsuario({fill, idContexto, funcionColocar}) {

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
        cambiarMonedero,
        cambiarPersonaje
    ] = useContext(contextos[idContexto-1]);

    if (fill == "demo"){
        const demo = [
        <EspacioCarta><CartaEdificio tipo='militar' precio='5'></CartaEdificio></EspacioCarta>,
        <EspacioCarta><CartaEdificio tipo='religioso' precio='7'></CartaEdificio></EspacioCarta>,
        <EspacioCarta><CartaEdificio tipo='religioso' precio='2'></CartaEdificio></EspacioCarta>,
        <EspacioCarta><CartaEdificio tipo='comercial' precio='2'></CartaEdificio></EspacioCarta>,
        <EspacioCarta><CartaEdificio tipo='noble' precio='6'></CartaEdificio></EspacioCarta>,
        <EspacioCarta><CartaEdificio tipo='militar' precio='9'></CartaEdificio></EspacioCarta>,
        <EspacioCarta><CartaEdificio tipo='noble' precio='9'></CartaEdificio></EspacioCarta>,
        <EspacioCarta><CartaEdificio tipo='comercial' precio='1'></CartaEdificio></EspacioCarta>
        ]

        return (
            <div className='baraja_usuario'>
                {demo}
            </div>
        )
    }else{

        useEffect(() => {
            if (!(Number.isInteger(fill))){
                setCartasBaraja(fill)
            }
            else{
                var idJugador = fill
                axios.get(`${API_URL}/cartas/baraja/${idJugador}`)
                .then((response) => {
                    var cartas = []
                    const tamano = response.data.length;
                    for (let i = 0; i < tamano; i++){
                        var pos = response.data[i].posicion
                        var tipo = response.data[i].tipo
                        var precio = response.data[i].precio
                        cartas[pos-1] = <EspacioCarta><CartaEdificio tipo={tipo} precio={precio} pos={pos} funcionColocar={funcionColocar}></CartaEdificio></EspacioCarta>
                    }
                    setCartasBaraja(cartas)
                }).catch((error) => {
                    console.log(error)
                })
    
            }
        
        }, [cambiarCartasBaraja]);

        return (
            <div className='baraja_usuario'>
                {cartasBaraja}
            </div>
            
        )

    }

}