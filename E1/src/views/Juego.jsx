import React, {createContext, useState, useEffect, useRef} from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import API_URL from "../config";
import './../assets/styles/Styles_Componentes/Tablero/Juego.css'

import CompartidoHeader from './Components/Tablero/CompartidoHeader'
import CompartidoUsuario from './Components/Tablero/CompartidoUsuario'
import PersoUsuario from './Components/Tablero/PersoUsuario'

import CartaEdificio from './Components/CartaEdificio';
import Casilla from './Components/Casilla';

export const JugadorContext_1 = createContext(null);
export const JugadorContext_2 = createContext(null);
export const JugadorContext_3 = createContext(null);
export const JugadorContext_4 = createContext(null);
export const ContextoPartida = createContext(null);
export const ContextoHeader = createContext(null);

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

export default function Juego(){
    const [idPartida, setIdPartida] = useState(null);
    const [idUsuarioActual, setIdUsuarioActual] = useState(null);
    const [idJugadorActual, setIdJugadorActual] = useState(null);
    const [idContextoActual, setIdContextoActual] = useState(null);
    const [usuariosEnPartida, setUsuariosEnPartida] = useState(null);
    const [cantUsuariosEnPartida, setCantUsuariosEnPartida] = useState(0);
    const [idUsuariosEnPartida, setIdUsuariosEnPartida] = useState([0,0,0,0]);
    const [idJugadoresEnPartida, setIdJugadoresEnPartida] = useState([0,0,0,0]);
    const [mostrarCiudad1, setMostrarCiudad1] = useState(false);
    const [mostrarCiudad2, setMostrarCiudad2] = useState(false);
    const [mostrarCiudad3, setMostrarCiudad3] = useState(false);
    const [mostrarCiudad4, setMostrarCiudad4] = useState(false);
    const [salaEspera, setSalaEspera] = useState(true);

    
    function getCookiePartida() {
        const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('idPartida='));
        let idPartida = null;
        if (cookieValue) {
            idPartida = decodeURIComponent(cookieValue.split('=')[1]);
        }
        return idPartida;
    }

    function getCookieUsuario() {
        const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('idUsuario='));
        let idUsuario = null;
        if (cookieValue) {
            idUsuario = decodeURIComponent(cookieValue.split('=')[1]);
        }
        return idUsuario;
    }

    useEffect(() => {
        if (idPartida === null) {
            const id = getCookiePartida();
            setIdPartida(id);
        }
    }, []);

    useEffect(() => {
        if (idUsuarioActual === null) {
            const id = getCookieUsuario();
            setIdUsuarioActual(id);
        }
    }, []);

    /* SALA DE ESPERA ANTES DE EMPEZAR JUEGO */
    useInterval(() => {    
        if (idPartida !== null && cantUsuariosEnPartida != 4) {
            axios.get(`${API_URL}/partida/jugadores/${idPartida}`)
            .then((jugadores) => {
                if (jugadores.data.length != cantUsuariosEnPartida){
                    setUsuariosEnPartida(jugadores.data);
                    setCantUsuariosEnPartida(jugadores.data.length);
                }
            })
        }  
    }, 3000);

    useEffect(() => {
        if (salaEspera){

            const arrayUsuarios = [];
            const arrayJugadores = [];
            for (let i = 1; i <= 4; i++){
                if (i <= cantUsuariosEnPartida){
                    const idU = usuariosEnPartida[i-1].usuarioID;
                    const idJ = usuariosEnPartida[i-1].id;
                    arrayUsuarios.push(idU);
                    arrayJugadores.push(idJ);
                    if (idU == idUsuarioActual) {
                        setIdJugadorActual(idJ);
                    }
                }
                else {
                    arrayUsuarios.push(0);
                    arrayJugadores.push(0);
                }
            }
            setIdUsuariosEnPartida(arrayUsuarios);
            setIdJugadoresEnPartida(arrayJugadores);

            if (idUsuarioActual != null && cantUsuariosEnPartida == 4) {
                for (let i = 0; i < 4; i++){
                    if (arrayUsuarios[i] == idUsuarioActual) {
                        setIdContextoActual(i+1);
                    }
                }
                setSalaEspera(false);
            }

        }
        

    }, [cantUsuariosEnPartida]);

    useEffect(() => {
        const mostrar1 = idUsuariosEnPartida[0] !== 0;
        const mostrar2 = idUsuariosEnPartida[1] !== 0;
        const mostrar3 = idUsuariosEnPartida[2] !== 0;
        const mostrar4 = idUsuariosEnPartida[3] !== 0;
        setMostrarCiudad1(mostrar1);
        setMostrarCiudad2(mostrar2);
        setMostrarCiudad3(mostrar3);
        setMostrarCiudad4(mostrar4);
      }, [idUsuariosEnPartida]);



    // EMPIEZA EL JUEGO 

    /*CONTEXTOS JUGADORES */
    const [nombreUsuario_1, setNombreUsuario_1] = useState("");
    const [urlUsuario_1, setUrlUsuario_1] = useState("");
    const [monedero_1, setMonedero_1] = useState(0)
    const [corona_1, setCorona_1] = useState(false)
    const [personajeID_1, setPersonajeID_1] = useState(1)
    const [cartasBaraja_1, setCartasBaraja_1] = useState([]);
    const [cambiarCartasCiudad_1, setCambiarCartasCiudad_1] = useState(false);
    const [cambiarCartasBaraja_1, setCambiarCartasBaraja_1] = useState(false);
    const [cambiarMonedero_1, setCambiarMonedero_1] = useState(false);
    const [cambiarPersonaje_1, setCambiarPersonaje_1] = useState(false);
    const contexto_1 = [nombreUsuario_1, setNombreUsuario_1, urlUsuario_1, setUrlUsuario_1, monedero_1, setMonedero_1, corona_1, setCorona_1, personajeID_1, setPersonajeID_1, cartasBaraja_1, setCartasBaraja_1, cambiarCartasCiudad_1, cambiarCartasBaraja_1, cambiarMonedero_1, cambiarPersonaje_1]

    const [nombreUsuario_2, setNombreUsuario_2] = useState("");
    const [urlUsuario_2, setUrlUsuario_2] = useState("");
    const [monedero_2, setMonedero_2] = useState(0)
    const [corona_2, setCorona_2] = useState(false)
    const [personajeID_2, setPersonajeID_2] = useState(2)
    const [cartasBaraja_2, setCartasBaraja_2] = useState([]);
    const [cambiarCartasCiudad_2, setCambiarCartasCiudad_2] = useState(false);
    const [cambiarCartasBaraja_2, setCambiarCartasBaraja_2] = useState(false);
    const [cambiarMonedero_2, setCambiarMonedero_2] = useState(false);
    const [cambiarPersonaje_2, setCambiarPersonaje_2] = useState(false);
    const contexto_2 = [nombreUsuario_2, setNombreUsuario_2, urlUsuario_2, setUrlUsuario_2, monedero_2, setMonedero_2, corona_2, setCorona_2, personajeID_2, setPersonajeID_2, cartasBaraja_2, setCartasBaraja_2, cambiarCartasCiudad_2, cambiarCartasBaraja_2, cambiarMonedero_2, cambiarPersonaje_2]

    const [nombreUsuario_3, setNombreUsuario_3] = useState("");
    const [urlUsuario_3, setUrlUsuario_3] = useState("");
    const [monedero_3, setMonedero_3] = useState(0)
    const [corona_3, setCorona_3] = useState(false)
    const [personajeID_3, setPersonajeID_3] = useState(3)
    const [cartasBaraja_3, setCartasBaraja_3] = useState([]);
    const [cambiarCartasCiudad_3, setCambiarCartasCiudad_3] = useState(false);
    const [cambiarCartasBaraja_3, setCambiarCartasBaraja_3] = useState(false);
    const [cambiarMonedero_3, setCambiarMonedero_3] = useState(false);
    const [cambiarPersonaje_3, setCambiarPersonaje_3] = useState(false);
    const contexto_3 = [nombreUsuario_3, setNombreUsuario_3, urlUsuario_3, setUrlUsuario_3, monedero_3, setMonedero_3, corona_3, setCorona_3, personajeID_3, setPersonajeID_3, cartasBaraja_3, setCartasBaraja_3, cambiarCartasCiudad_3, cambiarCartasBaraja_3, cambiarMonedero_3, cambiarPersonaje_3]

    const [nombreUsuario_4, setNombreUsuario_4] = useState("");
    const [urlUsuario_4, setUrlUsuario_4] = useState("");
    const [monedero_4, setMonedero_4] = useState(0)
    const [corona_4, setCorona_4] = useState(false)
    const [personajeID_4, setPersonajeID_4] = useState(4)
    const [cartasBaraja_4, setCartasBaraja_4] = useState([]);
    const [cambiarCartasCiudad_4, setCambiarCartasCiudad_4] = useState(false);
    const [cambiarCartasBaraja_4, setCambiarCartasBaraja_4] = useState(false);
    const [cambiarMonedero_4, setCambiarMonedero_4] = useState(false);
    const [cambiarPersonaje_4, setCambiarPersonaje_4] = useState(false);
    const contexto_4 = [nombreUsuario_4, setNombreUsuario_4, urlUsuario_4, setUrlUsuario_4, monedero_4, setMonedero_4, corona_4, setCorona_4, personajeID_4, setPersonajeID_4, cartasBaraja_4, setCartasBaraja_4, cambiarCartasCiudad_4, cambiarCartasBaraja_4, cambiarMonedero_4, cambiarPersonaje_4]

    // array para dar contextos correctos segun index
    const contextos = [contexto_1, contexto_2, contexto_3, contexto_4];

    // GET TURNO ACTUAL + ESTADO PARTIDA
    const [turnoActual, setTurnoActual] = useState(0);
    const [partidaTerminada, setPartidaTerminada] = useState(false)
    const [primerTurno, setPrimerTurno] = useState(true)
    useInterval(() => {
        if (!(salaEspera)){
            axios.get(`${API_URL}/partida/turno/${idPartida}`)
            .then((response) => {
                setTurnoActual(response.data)
            })
        }
    }, 4000);

    useEffect(() => {
        if (idPartida && !primerTurno && (turnoActual === 1)){
            axios.get(`${API_URL}/partida/terminada/${idPartida}`)
            .then((response) => {
                if (response.data) {
                    setPartidaTerminada(true)
                }
            })
        }
    }, [turnoActual])

    useEffect(() => {
        if (partidaTerminada){
            console.log("IT IS THE END")
            window.location.href = '/ResultadoJuego';
        }
    }, [partidaTerminada])

    useInterval(() => {

        if (!(salaEspera)){
            const setCambiarCartasCiudad = [setCambiarCartasCiudad_1, setCambiarCartasCiudad_2, setCambiarCartasCiudad_3, setCambiarCartasCiudad_4];
            const cambiarCartasCiudad = [cambiarCartasCiudad_1, cambiarCartasCiudad_2, cambiarCartasCiudad_3, cambiarCartasCiudad_4];               
            const setCambiarMonedero = [setCambiarMonedero_1, setCambiarMonedero_2, setCambiarMonedero_3, setCambiarMonedero_4];
            const cambiarMonedero = [cambiarMonedero_1, cambiarMonedero_2, cambiarMonedero_3, cambiarMonedero_4];
            const setCambiarPersonaje = [setCambiarPersonaje_1, setCambiarPersonaje_2, setCambiarPersonaje_3, setCambiarPersonaje_4];
            const cambiarPersonaje = [cambiarPersonaje_1, cambiarPersonaje_2, cambiarPersonaje_3, cambiarPersonaje_4];
            for (let i = 0; i < 4; i++){
                setCambiarCartasCiudad[i](!(cambiarCartasCiudad[i]))
                setCambiarMonedero[i](!(cambiarMonedero[i]))
                setCambiarPersonaje[i](!(cambiarPersonaje[i]))
            }
        }
        
    }, 4000)
        

    /*COLOCAR CARTAS */
    const [elegirCartaBaraja, setElegirCartaBaraja] = useState(null)
    const [elegirCasillaCiudad, setElegirCasillaCiudad] = useState(null)

    const funcionColocar_CartaBaraja = (info) => {
        setElegirCartaBaraja(info)
    }
    const funcionColocar_CasillaCiudad = (info) => {
        if (!(usandoPoderGuerrero)){
            setElegirCasillaCiudad(info)
        }        
    }

    const init_colocar = () => {
        setElegirCartaBaraja(null);
        setElegirCasillaCiudad(null);
    }

    useEffect(() => {
        if (elegirCartaBaraja && elegirCasillaCiudad){
            const idJugadorBaraja = elegirCartaBaraja[0]
            const idJugadorCiudad = elegirCasillaCiudad[0]
            const posicionBaraja = elegirCartaBaraja[1]
            const posicionCiudad = elegirCasillaCiudad[1]

            
            console.log("put "+elegirCartaBaraja+"at "+elegirCasillaCiudad)
            let request = ""
            if (!(usandoPoderArquitecto)){
                request = `${API_URL}/cartas/colocar/${idJugadorBaraja}/${idJugadorCiudad}/${posicionBaraja}/${posicionCiudad}`
            }else{
                request = `${API_URL}/personajes/poder_arquitecto/${idJugadorBaraja}/${idJugadorCiudad}/${posicionBaraja}/${posicionCiudad}`
            }
            axios.post(request)
            .then( () => {
                const setCambiarCartasCiudad = [setCambiarCartasCiudad_1, setCambiarCartasCiudad_2, setCambiarCartasCiudad_3, setCambiarCartasCiudad_4];
                const setCambiarCartasBaraja = [setCambiarCartasBaraja_1, setCambiarCartasBaraja_2, setCambiarCartasBaraja_3, setCambiarCartasBaraja_4];
                const cambiarCartasCiudad = [cambiarCartasCiudad_1, cambiarCartasCiudad_2, cambiarCartasCiudad_3, cambiarCartasCiudad_4];
                const cambiarCartasBaraja = [cambiarCartasBaraja_1, cambiarCartasBaraja_2, cambiarCartasBaraja_3, cambiarCartasBaraja_4];
                   
                const setMonedero = [setMonedero_1, setMonedero_2, setMonedero_3, setMonedero_4];
                const idJugadorEnJuego = idContextoActual;
                setMonedero[idJugadorEnJuego - 1](null);
                setCambiarCartasCiudad[idJugadorEnJuego - 1](!(cambiarCartasCiudad[idJugadorEnJuego - 1]));
                setCambiarCartasBaraja[idJugadorEnJuego - 1](!(cambiarCartasBaraja[idJugadorEnJuego - 1]));
                  
                init_colocar()

                if (usandoPoderArquitecto){
                    setUsandoPoderArquitecto(false);
                }

            }).catch((error) => {
                alert(error.response.data.error)
                init_colocar()
            })
        }
    }, [elegirCartaBaraja, elegirCasillaCiudad])


    // PODERES

    const [elegirRobado, setElegirRobado] = useState(false)
    const poderLadron = () => {
        console.log("ladron poder")
        setElegirRobado(true);
        if (elegirRobado){
            setElegirRobado(false)
        }
    }

    const [usandoPoderArquitecto, setUsandoPoderArquitecto] = useState(false)
    const poderArquitecto = () => {
        console.log("arquitecto poder")
        setUsandoPoderArquitecto(true)
        if (usandoPoderArquitecto){
            setUsandoPoderArquitecto(false)
        }
    }

    const [elegirCasillaDestruida, setElegirCasillaDestruida] = useState(null)
    const [idGuerrero, setIdGuerrero] = useState(null)
    const [usandoPoderGuerrero, setUsandoPoderGuerrero] = useState(false)

    const funcionDestruir = (info) => {
        if (usandoPoderGuerrero){
            setElegirCasillaDestruida(info)
        }
    } 

    useEffect(() => {
        if (elegirCasillaDestruida){
            const idJ = elegirCasillaDestruida[0];
            const pos = elegirCasillaDestruida[1];
            axios.post(`${API_URL}/personajes/poder_guerrero/${idGuerrero}/${idJ}/${pos}`)
            .then(() => {
                acabarPoderGuerrero();
            }).catch( (error) => {
                alert(error.response.data.error)
            })
        }
    }, elegirCasillaDestruida)

    const acabarPoderGuerrero = () => {
        setUsandoPoderGuerrero(false);
        setElegirCasillaDestruida(null);
        setIdGuerrero(null);
    }

    const poderGuerrero = (idJ) => {
        console.log("guerrero poder")
        setIdGuerrero(idJ);
        setUsandoPoderGuerrero(true)
        if (usandoPoderGuerrero){
            setUsandoPoderGuerrero(false)
        }
    }

    const [elegirPersonajes, setElegirPersonajes] = useState(false)
    const poderRey = () => {
        console.log("rey poder")
        setElegirPersonajes(true);
        if (elegirPersonajes){
            setElegirPersonajes(false)
        }
    }

    const contextoHeader = [elegirPersonajes, setElegirPersonajes, elegirRobado, setElegirRobado, usandoPoderArquitecto, setUsandoPoderArquitecto, usandoPoderGuerrero, setUsandoPoderGuerrero]

    const funcionesPoderes = [poderLadron, poderArquitecto, poderGuerrero, poderRey]

    return (
        <ContextoPartida.Provider value={[turnoActual, setTurnoActual, idContextoActual, primerTurno, setPrimerTurno]}>
        <body_juego>

            <ContextoHeader.Provider value={contextoHeader}>
                <CompartidoHeader idUsuario={idUsuarioActual} idJugador={idJugadorActual} idPartida={idPartida} cantJugadores={cantUsuariosEnPartida}/>
            </ContextoHeader.Provider>
            
            <div className='mapa_central'>
                <JugadorContext_1.Provider value={contexto_1}>
                    {mostrarCiudad1 ? (<CompartidoUsuario 
                    perso={idUsuarioActual == idUsuariosEnPartida[0]}
                    idUsuario={idUsuariosEnPartida[0]} 
                    idJugador={idJugadoresEnPartida[0]}
                    idContexto={1} 
                    funcionColocar={funcionColocar_CasillaCiudad}
                    funcionDestruir = {funcionDestruir}/>)
                    : null}
                </JugadorContext_1.Provider>
                <JugadorContext_2.Provider value={contexto_2}>
                    {mostrarCiudad2 ? (<CompartidoUsuario 
                    perso={idUsuarioActual == idUsuariosEnPartida[1]}
                    idUsuario={idUsuariosEnPartida[1]} 
                    idJugador={idJugadoresEnPartida[1]} 
                    idContexto={2} 
                    funcionColocar={funcionColocar_CasillaCiudad}
                    funcionDestruir = {funcionDestruir}/>)
                    : null}
                </JugadorContext_2.Provider>
                <JugadorContext_3.Provider value={contexto_3}>
                    {mostrarCiudad3 ? (<CompartidoUsuario 
                    perso={idUsuarioActual == idUsuariosEnPartida[2]}
                    idUsuario={idUsuariosEnPartida[2]} 
                    idJugador={idJugadoresEnPartida[2]} 
                    idContexto={3} 
                    funcionColocar={funcionColocar_CasillaCiudad}
                    funcionDestruir = {funcionDestruir}/>)
                    : null}
                </JugadorContext_3.Provider>
                <JugadorContext_4.Provider value={contexto_4}>
                    {mostrarCiudad4 ? (<CompartidoUsuario 
                    perso={idUsuarioActual == idUsuariosEnPartida[3]}
                    idUsuario={idUsuariosEnPartida[3]} 
                    idJugador={idJugadoresEnPartida[3]} 
                    idContexto={4} 
                    funcionColocar={funcionColocar_CasillaCiudad}
                    funcionDestruir = {funcionDestruir}/>)
                    : null}
                </JugadorContext_4.Provider>
            </div>

           
            
            {((cantUsuariosEnPartida == 4) && (idContextoActual === 1)) ?
            (<JugadorContext_1.Provider value={contexto_1}>
                <PersoUsuario 
                idUsuario={idUsuarioActual} 
                idJugador={idJugadorActual} 
                idContexto={1}
                funcionColocar={funcionColocar_CartaBaraja}
                funcionesPoderes = {funcionesPoderes}/>
            </JugadorContext_1.Provider>)
            : null}

            {((cantUsuariosEnPartida == 4) && (idContextoActual === 2)) ?
            (<JugadorContext_2.Provider value={contexto_2}>
                <PersoUsuario 
                idUsuario={idUsuarioActual} 
                idJugador={idJugadorActual} 
                idContexto={2}
                funcionColocar={funcionColocar_CartaBaraja}
                funcionesPoderes = {funcionesPoderes}/>
            </JugadorContext_2.Provider>)
            : null}

            {cantUsuariosEnPartida == 4 && idContextoActual === 3 ?
            (<JugadorContext_3.Provider value={contexto_3}>
                <PersoUsuario 
                idUsuario={idUsuarioActual} 
                idJugador={idJugadorActual} 
                idContexto={3}
                funcionColocar={funcionColocar_CartaBaraja}
                funcionesPoderes = {funcionesPoderes}/>
            </JugadorContext_3.Provider>)
            : null}

            {cantUsuariosEnPartida == 4 && idContextoActual === 4 ?
            (<JugadorContext_4.Provider value={contexto_4}>
                <PersoUsuario 
                idUsuario={idUsuarioActual} 
                idJugador={idJugadorActual} 
                idContexto={4}
                funcionColocar={funcionColocar_CartaBaraja}
                funcionesPoderes = {funcionesPoderes}/>
            </JugadorContext_4.Provider>)
            : null}
        </body_juego>
        </ContextoPartida.Provider>
        
    )
}