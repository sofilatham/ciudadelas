import '../assets/styles/AcercaDelEquipo.css'

import logo from '../assets/images/logo_ciudadelas.png';
import sofia_foto from '../assets/images/sofia_foto.jpg';
import elea_foto from '../assets/images/elea_foto.jpg';
import React, {createContext, useState, useEffect} from 'react';
import API_URL from "../config";

export default function AcercaDelEquipo(){
    const [idUsuario, setIdUsuario] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    function getCookieUsuario() {
        const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('idUsuario='));
        let idUsuario = null;
        if (cookieValue) {
            idUsuario = decodeURIComponent(cookieValue.split('=')[1]);
        }
        return idUsuario;
    }

    useEffect(() => {
        const id = getCookieUsuario();
        setIdUsuario(id);
    }, []);

    useEffect(() => {
        if (idUsuario != null){
            setLoggedIn(true);
        }
    }, [idUsuario]);

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

    return (

        <body>

            <header class="header_LandingPage">

                <img src={logo}></img>

                <nav>
                    <btn><a href='/LandingPage'>Home</a></btn>
                    {loggedIn && <btn><a href='/PaginaPrincipal'>Página Principal</a></btn>}
                    <btn><a class="active" href='/AcercaDelEquipo'>Acerca De</a></btn>
                    <btn><a href='/ComoJugar'>Cómo Jugar</a></btn>
                    {loggedIn && <btnr><a href="/LandingPage" onClick={cerrarSesion}>Cerrar Sesión</a></btnr>}
                    {!loggedIn && <btnr><a href="/LandingPage">Inicia Sesión</a></btnr>}
                </nav>

            </header>

            <mainequipo>

                <div className='div_text'>

                    Nuestro Equipo

                </div>

                <div className='div_equipo'>

                    <div className='div_perfil_equipo'>
                        <banner></banner>
                        <img src={sofia_foto}></img>
                        <nombreusuario><h1>Sofía Latham</h1></nombreusuario>
                        <h2>Serie Favorita: The Office</h2>
                        <h2>Casa: Hufflepuff</h2>
                        <h2>Juego Favorito: Stardew Valley</h2>

                    </div>

                    <div className='div_perfil_equipo'>
                        <banner></banner>
                        <img src={elea_foto}></img>
                        <nombreusuario><h1>Eléa Cocault</h1></nombreusuario>
                        <h2>Serie Favorita: The Good Place</h2>
                        <h2>Casa: Slytherin</h2>
                        <h2>Juego Favorito: Dragon Quest IX</h2>

                    </div>

                </div>

                

            </mainequipo>

            <footer>
                <p>Página creada por Eléa y Sofía c:</p>
            </footer>

        </body>
    )
}