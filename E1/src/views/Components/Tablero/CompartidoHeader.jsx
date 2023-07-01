import React, {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import API_URL from "../../../config";

import './../../../assets/styles/Styles_Componentes/Tablero/CompartidoHeader.css'
import { ContextoPartida, ContextoHeader } from '../../Juego';

export default function CompartidoHeader({idUsuario, idJugador, idPartida, cantJugadores}) {
    const [turnoActual, setTurnoActual, idContextoActual, primerTurno, setPrimerTurno] = useContext(ContextoPartida);
    const [miPersonajeID, setMiPersonajeID] = useState(0);

    useEffect(() => {
        if (idJugador !== null){
            axios.get(`${API_URL}/jugador/${idJugador}`)
            .then((response) => {
                console.log("im asking for my perso "+response.data.personajeID);
                setMiPersonajeID(response.data.personajeID);
            }).catch((error) => {
                console.log(error)
            })  
        }
    }, [turnoActual])
    
    const [elegirPersonajes, 
    setElegirPersonajes, 
    elegirRobado, 
    setElegirRobado,
    usandoPoderArquitecto, 
    setUsandoPoderArquitecto,
    usandoPoderGuerrero,
    setUsandoPoderGuerrero] = useContext(ContextoHeader)

    function cambiar_turno() {
        axios.post(`${API_URL}/partida/actualizar_turno/${idPartida}`)
        .then((response) => {
            setTurnoActual(response.data.turno_personaje)
            if (primerTurno){
                updatePrimerTurno();
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    function updatePrimerTurno(){
        setPrimerTurno(false)
    }

    function seleccionar_personaje(nombre_personaje) {
        axios.post(`${API_URL}/personajes/elegir/${idJugador}/${nombre_personaje}`)
        .then((response) => {
            console.log(response.data)
            setElegirPersonajes(false);
            cambiar_turno();
        }).catch((error) => {
            console.log(error)
        })
    }

    function robar(id_personaje_robado){

        axios.get(`${API_URL}/partida/jugadores/${idPartida}`)
            .then((jugadores) => {
                let jugador_robado = null
                for (let i = 0; i < 4; i++){
                    if (jugadores.data[i].personajeID === id_personaje_robado){
                        jugador_robado = jugadores.data[i].id;
                    }
                }
                axios.post(`${API_URL}/personajes/poder_ladron/${idJugador}/${jugador_robado}`)
                .then(() => {
                    setElegirRobado(false)
                })
            })
    }

    if (cantJugadores < 4) {
        return (
        <div className={`compartido_header ${elegirPersonajes === true ? 'botones': ''}`}>
            <h3>Esperando a otros jugadores...</h3>
        </div>)
    }
    
    return (
        <div className={`compartido_header ${elegirPersonajes === true ? 'botones': ''}`}>
            {!usandoPoderGuerrero && !usandoPoderArquitecto && !elegirRobado && !elegirPersonajes && <h3>Turno:</h3>}
            {!usandoPoderGuerrero && !usandoPoderArquitecto && !elegirRobado && !elegirPersonajes && <p className={`turno_personaje ${turnoActual === 1 ? 'activo': ''}`}>Ladrón</p>}
            {!usandoPoderGuerrero && !usandoPoderArquitecto && !elegirRobado && !elegirPersonajes && <p className={`turno_personaje ${turnoActual === 2 ? 'activo': ''}`}>Arquitecto</p>}
            {!usandoPoderGuerrero && !usandoPoderArquitecto && !elegirRobado && !elegirPersonajes && <p className={`turno_personaje ${turnoActual === 3 ? 'activo': ''}`}>Guerrero</p>}
            {!usandoPoderGuerrero && !usandoPoderArquitecto && !elegirRobado && !elegirPersonajes && <p className={`turno_personaje ${turnoActual === 4 ? 'activo': ''}`}>Rey</p>}
            
            {elegirPersonajes && <h3>Elije tu personaje:</h3>}
            {elegirPersonajes && <button className="boton_elegir_personaje" onClick={() => seleccionar_personaje("Ladrón")}>Ladrón</button>}
            {elegirPersonajes && <button className="boton_elegir_personaje" onClick={() => seleccionar_personaje("Arquitecto")}>Arquitecto</button>}
            {elegirPersonajes && <button className="boton_elegir_personaje" onClick={() => seleccionar_personaje("Guerrero")}>Guerrero</button>}
            {elegirPersonajes && <button className="boton_elegir_personaje" onClick={() => seleccionar_personaje("Rey")}>Rey</button>}

            {elegirRobado && <h3>A quién quieres robar:</h3>}
            {elegirRobado && <button className="boton_elegir_personaje" onClick={() => robar(2)}>Arquitecto</button>}
            {elegirRobado && <button className="boton_elegir_personaje" onClick={() => robar(3)}>Guerrero</button>}
            {elegirRobado && <button className="boton_elegir_personaje" onClick={() => robar(4)}>Rey</button>}

            {usandoPoderArquitecto && <h3>Coloca una ciudad !</h3>}
            {usandoPoderGuerrero && <h3>Qué ciudad quieres destruir ?</h3>}

            {(turnoActual == miPersonajeID) && !usandoPoderGuerrero && !usandoPoderArquitecto && !elegirRobado && !elegirPersonajes && <button className="boton_terminar_turno" onClick={cambiar_turno}>Terminar Turno</button>}

        </div>
    )
}