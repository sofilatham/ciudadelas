import React, {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import API_URL from "../../../config";

import './../../../assets/styles/Styles_Componentes/Tablero/CompartidoUsuario.css'

import Ciudad from "../Ciudad";

import imgMonedero from '../../../assets/images/monedero.png'

import Ladron from '../Personajes/Ladron'
import Rey from '../Personajes/Rey'
import Guerrero from '../Personajes/Guerrero'
import Arquitecto from '../Personajes/Arquitecto'
import EspacioCarta from '../EspacioCarta'
import {JugadorContext_1, JugadorContext_2, JugadorContext_3, JugadorContext_4} from '../../Juego.jsx';

const personajes = [<Ladron/>, <Arquitecto/>, <Guerrero/>, <Rey/>]

export default function CompartidoUsuario({perso, idUsuario, idJugador, idContexto, funcionColocar, funcionDestruir}) {
    
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

    const [personajeUsuario, setPersonajeUsuario] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/usuario/${idUsuario}`)
        .then((response) => {
            setNombreUsuario(response.data.nombre);
            setUrlUsuario(response.data.imageURL);
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        
            axios.get(`${API_URL}/jugador/${idJugador}`)
            .then((response) => {
                if (response.data.monedero != monedero){
                    setMonedero(response.data.monedero);
                }
            }).catch((error) => {
                console.log(error)
            })    
        
        
    }, [cambiarMonedero])


    useEffect(() => {
        axios.get(`${API_URL}/jugador/${idJugador}`)
        .then((response) => {
            setPersonajeID(response.data.personajeID);
        }).catch((error) => {
            console.log(error)
        })    
    
    }, [cambiarPersonaje])

    useEffect(() => {
        const p = personajes[personajeID-1];
        setPersonajeUsuario(p);
    }, [personajeID])

    const handleColocar = (pos) => {
        funcionColocar([idJugador, pos])
    }

    const handleDestruir = (pos) => {
        funcionDestruir([idJugador, pos])
    }

    
    return (
        <div className='block_usuario' id={perso? 'perso':null}>
        <div className="info">
            <div className="info_usuario">
                <img className="img_juego" src={urlUsuario} alt="avatar"/>
                <p>{nombreUsuario}</p>
            </div>
            <div className="info_jugador">
                <div className="monedero">
                    <img className="img_juego" src={imgMonedero} alt="monedero"/>
                    <p>{monedero}</p>
                </div>
            </div>
            <div className="info_personaje">
                <EspacioCarta>{personajeUsuario}</EspacioCarta>
            </div>

        </div>
        <Ciudad chosen_fill={idJugador} idContexto={idContexto} funcionColocar={handleColocar} funcionDestruir={handleDestruir}/>
        </div>        
    )
}