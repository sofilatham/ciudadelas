import '../assets/styles/ComoJugar.css'

import logo from '../assets/images/logo_ciudadelas.png';
import CartaEdificio from './Components/CartaEdificio';
import foto1 from '../assets/images/cartas.png';
import SwapperTipoCarta from './Components/Dynamic_Swappers/SwapperTipoCarta';
import SwapperPrecioCarta from './Components/Dynamic_Swappers/SwapperPrecioCarta';
import Carousel from './Components/Carousel_Reglas/Carousel';
import React, {createContext, useState, useEffect} from 'react';
import API_URL from "../config";

export default function ComoJugar(){
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
                    <btn><a href='/AcercaDelEquipo'>Acerca De</a></btn>
                    <btn><a class="active" href='/ComoJugar'>Cómo Jugar</a></btn>
                    {loggedIn && <btnr><a href="/LandingPage" onClick={cerrarSesion}>Cerrar Sesión</a></btnr>}
                    {!loggedIn && <btnr><a href="/LandingPage">Inicia Sesión</a></btnr>}
                </nav>

            </header>

            <mainreglas>

                <div className='div_container_carousel'>
                    <Carousel/> 
                </div>               

            </mainreglas>

            <footer>
                <p>Página creada por Eléa y Sofía c:</p>
            </footer>

        </body>
    )
}