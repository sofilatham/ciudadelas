import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import API_URL from "../../../config";

import './../../../assets/styles/Styles_Componentes/Tablero/PersoUsuario.css'
import BarajaUsuario from './../BarajaUsuario';
import EspacioCarta from '../EspacioCarta';
import CartaEdificio from '../CartaEdificio';
import {JugadorContext_1, JugadorContext_2, JugadorContext_3, JugadorContext_4, ContextoPartida} from '../../Juego.jsx';


export default function PersoUsuario({idUsuario, idJugador, idContexto, funcionColocar, funcionesPoderes}) {

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

    const [turnoActual, setTurnoActual, idContextoActual] = useContext(ContextoPartida);

    const [descripcionPersonaje, setDescripcionPersonaje] = useState("")

    const [haSacadoMonedas, setHaSacadoMonedas] = useState(false)
    const [haSacadoCartas, setHaSacadoCartas] = useState(false)
    const [haUsadoPoder, setHaUsadoPoder] = useState(false)

    useEffect(() => {
        if (personajeID !== null){
            axios.get(`${API_URL}/personajes/${personajeID}`)
            .then((response) => {
                if (response.data.turno === 4){
                    const disclaimer = " !!! Cuidado, eso marcará el fin de tu turno !!!"
                    setDescripcionPersonaje(response.data.poder+disclaimer)
                }else{
                    setDescripcionPersonaje(response.data.poder)
                }
            })
        }
    }, [personajeID])

    function sacar_monedas() {
        axios.post(`${API_URL}/jugador/sacar_monedas/${idJugador}`)
        .then((response) => {
            const monedas = response.data.monedero;
            setMonedero(monedas);
        }).catch((error) => {
            console.log(error);
        })
        setHaSacadoMonedas(true);
    }

    useEffect(() => {
        if (turnoActual !== personajeID){
            setHaSacadoCartas(false);
            setHaSacadoMonedas(false);
            setHaUsadoPoder(false)
        }

    }, [turnoActual])

    const handleColocar = (idCarta) => {
        funcionColocar([idJugador, idCarta])
    }

    function sacar_cartas() {
        axios.post(`${API_URL}/cartas/sacar_cartas/${idJugador}`)
        .then(() => {
            axios.get(`${API_URL}/cartas/baraja/${idJugador}`)
            .then((response) => {
                var cartas = []
                const tamano = response.data.length;
                for (let i = 0; i < tamano; i++){
                    var pos = response.data[i].posicion
                    var tipo = response.data[i].tipo
                    var precio = response.data[i].precio
                    cartas[pos-1] = <EspacioCarta><CartaEdificio tipo={tipo} precio={precio} pos={pos} funcionColocar={handleColocar}></CartaEdificio></EspacioCarta>
                }
                setCartasBaraja(cartas)
            });
        })
        setHaSacadoCartas(true);
    }

    function usarPoder(){

        axios.get(`${API_URL}/jugador/${idJugador}`)
        .then((response) => {
            const personajeID = response.data.personajeID;
            if (personajeID === 1){
                funcionesPoderes[0]();
            } 
            if (personajeID === 2){
                funcionesPoderes[1]();
            }
            if (personajeID === 3){
                funcionesPoderes[2](idJugador);
            }
            if (personajeID === 4){
                funcionesPoderes[3]();
            }
        })

        setHaUsadoPoder(!(haUsadoPoder));
        
    }
    
    
    return (
        <div className="footer_perso">
        {(turnoActual !== personajeID) ? 
        (
            <div className='div_espera'>
                <p className='label_espera'>... Espera tu turno para jugar ...</p>
                <div className='boton_volver'><a href='/PaginaPrincipal'>Volver a tu Pagina</a></div>
            </div>
        ) : (
            <>
            <div className="acciones_generales">
                {/* <button className={(haSacadoMonedas || haSacadoCartas)? "botones_perso_clicked" : "botones_perso"} onClick={sacar_monedas}>Sacar 2 monedas</button>
                <button className={(haSacadoCartas || haSacadoMonedas)? "botones_perso_clicked" : "botones_perso"} onClick={sacar_cartas}>Sacar 2 cartas</button>*/}
                <button className="botones_perso" onClick={sacar_monedas}>Sacar 2 monedas</button> 
                <button className="botones_perso" onClick={sacar_cartas}>Sacar 2 cartas</button>
            </div>
            <div className="accion_personaje">
                {haUsadoPoder? <button className="boton_poder_clicked" onClick={usarPoder}>Deja de usar tu poder</button> : <button className="boton_poder" onClick={usarPoder}>Usar tu poder</button>}
                <p className="descripcion_personaje">{descripcionPersonaje}</p>
            </div>
            <div className='baraja_perso'>
                <BarajaUsuario fill={idJugador} idContexto={idContexto} funcionColocar={handleColocar}/>
            </div>
            </> 
        )
        }
        </div>
    )
}