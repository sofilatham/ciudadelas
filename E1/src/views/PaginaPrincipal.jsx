import '../assets/styles/PaginaPrincipal.css'

import logo from '../assets/images/logo_ciudadelas.png';
import cartas from '../assets/images/ciudad.jpeg';
import foto_perfil from '../assets/images/doge.jpeg';
import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import API_URL from "../config";
import { stripBasename } from '@remix-run/router';


export default function PaginaPrincipal(){
    const [idUsuario, setIdUsuario] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [idPartida, setIdPartida] = useState(null);
    const [partidasGanadas, setPartidasGanadas] = useState(null);
    const [partidasPerdidas, setPartidasPerdidas] = useState(null);
    const [partidasTotales, setPartidasTotales] = useState(null);
    const [porcentajeGanadas, setPorcentajeGanadas] = useState(null);

    function getCookieUsuario() {
        const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('idUsuario='));
        let idUsuario = null;
        if (cookieValue) {
            idUsuario = decodeURIComponent(cookieValue.split('=')[1]);
        }
        return idUsuario;
    }

    function getUsuario() {
        axios.get(`${API_URL}/usuario/${idUsuario}`)
        .then((response) => {
            const nombre = response.data.nombre;
            setNombreUsuario(nombre);
            if (response.data.imageURL !== ''){
                console.log(response.data.imageURL)
                setFotoPerfil(response.data.imageURL)
            }else{
                setFotoPerfil(foto_perfil)
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    function cerrarSesion() {
        setIdUsuario(null);
        setLoggedIn(false);
        borrarCookies();
    }

    function borrarCookies() {
        const cookies = document.cookie.split(";");
      
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const igualPos = cookie.indexOf("=");
          const nombre = igualPos > -1 ? cookie.substr(0, igualPos) : cookie;
          document.cookie = `${nombre}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    }

    useEffect(() => {
        const id = getCookieUsuario();
        console.log("SOY USUARIO "+id)
        setIdUsuario(id);
    }, []);

    useEffect(() => {
        if (idUsuario != null){
            setLoggedIn(true);
            getUsuario();
        }
    }, [idUsuario]);
            

    const unirsePartida = () => {
        
        if (idUsuario){
            // BUSCAR EXISTENTE
            axios.get(`${API_URL}/partida/actual/${idUsuario}`)
            .then((response) => {
                console.log(response.data)
                console.log(response.status)
                if (response.data.encontrada){
                    console.log("existe partida"+response.data.status)
                    if (response.data.status == 200){
                        crearCookiePartida(response.data.encontrada);
                        window.location.href = '/Juego';
                    }
                    if (response.data.status == 201){
                        const id = response.data.encontrada
                        console.log("voy a unirme a"+response.data.encontrada)
                        crearCookiePartida(response.data.encontrada);
                        axios.post(`${API_URL}/partida/unirse/${id}/${idUsuario}`)
                        .then((respuesta) => {
                            window.location.href = '/Juego';
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }
                    
                }else{
                    // NO EXISTE, CREAR NUEVA
                    console.log("NO existe partida")
                    axios.post(`${API_URL}/partida/`)
                    .then((response) => {
                        console.log(response.data)
                        const id = response.data.id;
                        console.log("id Partida nueva "+id)
                        crearCookiePartida(id);
                        axios.post(`${API_URL}/partida/unirse/${id}/${idUsuario}`)
                            .then((respuesta) => {
                                window.location.href = '/Juego';
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                    }).catch((error) => {
                        console.log(error);
                    })
                    }
                })
        }
    }


    function crearCookiePartida(idPartida) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        const cookieValue = encodeURIComponent(idPartida) + '; expires=' + expirationDate.toUTCString() + '; path=/';
        document.cookie = 'idPartida=' + cookieValue;
        return;
    }

    useEffect(() => {
        if (partidasGanadas == null && idUsuario != null) {
            axios.get(`${API_URL}/partida/ganadas/${idUsuario}`)
            .then((response) => {
                const cantidad = response.data;
                setPartidasGanadas(cantidad);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [idUsuario]);

    useEffect(() => {
        if (partidasTotales == null && idUsuario != null) {
            axios.get(`${API_URL}/partida/jugadas/${idUsuario}`)
            .then((response) => {
                const cantidad = response.data.length;
                setPartidasTotales(cantidad);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [idUsuario]);

    useEffect(() => {
        if (partidasGanadas != null && partidasTotales != null) {
            const perdidas = partidasTotales - partidasGanadas;
            setPartidasPerdidas(perdidas);
            const porcentaje = partidasGanadas * 100 / partidasTotales;
            const pocentajeTexto = `${porcentaje}, 100`;
            setPorcentajeGanadas(pocentajeTexto);
        }
    }, [partidasTotales, partidasGanadas]);

    return (

        <body>

            <header class="header_LandingPage">

                <img src={logo}></img>

                <nav>
                    <btn><a href='/LandingPage'>Home</a></btn>
                    <btn><a class="active" href='/PaginaPrincipal'>Página Principal</a></btn>
                    <btn><a href='/AcercaDelEquipo'>Acerca De</a></btn>
                    <btn><a href='/ComoJugar'>Cómo Jugar</a></btn>
                    {loggedIn && <btnr><a href="/LandingPage" onClick={cerrarSesion}>Cerrar Sesión</a></btnr>}
                    {!loggedIn && <btnr><a href="/LandingPage">Inicia Sesión</a></btnr>}
                </nav>

            </header>

            <main>

            <div className='div_resumen'>
                <img src={cartas}></img>
                <logo><img src={logo}></img></logo>

                <h2>El reino necesita un nuevo Maestro Constructor y estás entre 
los que aspiran al puesto. Para ser elegido debes impresionar a la nobleza 
construyendo la metrópolis medieval más majestuosa. Esta labor requerirá los servicios 
de un diverso plantel de personajes. ¿Contratarás al elusivo ladrón para que robe a 
uno de tus rivales, o le encargarás a la arquitecta que construya rápidamente varios 
distritos? Sólo la mejor ciudad llevará a su artífice hasta el título de Maestro 
Constructor.</h2>


            </div>
            {loggedIn && <div className='div_info_user'>

                <div className='div_perfil'>
                    <banner></banner>
                    <img src={fotoPerfil}></img>
                    <nombreusuario><h1>{nombreUsuario}</h1></nombreusuario>
                    <endsession>
                        <div className='nav_button'>
                            <a href='' onClick={cerrarSesion}>  Cerrar Sesión  </a>
                        </div>
                    </endsession>
		

                    <div class="stats-info">
                        <div class="graph-container">
                            <div class="percent">
                                <svg viewBox="0 0 36 36" class="circular-chart">
                                    <path class="circle" stroke-dasharray="100, 100" d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path class="circle" stroke-dasharray={porcentajeGanadas} d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                            </div>
                            <p>Partidas Totales: {partidasTotales}</p>
                        </div>
                        <div class="stats-text">
                            <h2><ganadas>■</ganadas> Partidas Ganadas:</h2>
                            <number>{partidasGanadas}</number>
                            <h2><perdidas>■</perdidas> Partidas Perdidas:</h2>
                            <number>{partidasPerdidas}</number>
                        </div>
                    </div>


                </div>

                <button className="boton_jugar" onClick={unirsePartida}>Jugar</button>
                

            </div>}

            </main>

            <footer>
                <p>Página creada por Eléa y Sofía c:</p>
            </footer>

        </body>


    )
}