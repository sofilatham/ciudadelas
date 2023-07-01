import '../assets/styles/LandingPage.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import API_URL from "../config";


import logo from '../assets/images/logo_ciudadelas.png';
import game_art from '../assets/images/persos_art_bis.png';


export default function LandingPage(){
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [idUsuario, setIdUsuario] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleEmail = (input) => {
        setEmail(input.target.value)
    }

    const handleContrasena = (input) => {
        setContrasena(input.target.value)
    }

    function handleSubmit(evento) {
        evento.preventDefault()
        const userData = {
            correo: email,
            contrasena: contrasena
        };
        axios.post(`${API_URL}/login`, userData)
        .then((response) => {
            const access_token = response.data.access_token;
            sessionStorage.setItem("token", access_token);
            const decodedToken = jwt_decode(access_token);
            const idUsuario = decodedToken.sub;
            crearCookieUsuario(idUsuario);
            console.log(getCookieUsuario())
            window.location.href = '/PaginaPrincipal';
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function crearCookieUsuario(idUsuario) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        const cookieValue = encodeURIComponent(idUsuario) + '; expires=' + expirationDate.toUTCString() + '; path=/';
        document.cookie = 'idUsuario=' + cookieValue;
    }

    function getCookieUsuario() {
        const cookieValue = document.cookie.split('; ').find(cookie => cookie.startsWith('idUsuario='));
        let idUsuario = null;
        if (cookieValue) {
            idUsuario = decodeURIComponent(cookieValue.split('=')[1]);
        }
        return idUsuario;
    }

    function cerrarSesion() {
        setIdUsuario(null);
        setLoggedIn(false);
        document.cookie = `idUsuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    useEffect(() => {
        const id = getCookieUsuario();
        setIdUsuario(id);
    }, []);

    useEffect(() => {
        if (idUsuario !== null){
            setLoggedIn(true);
        }
    }, [idUsuario]);

    return (

        <body>

            <header class="header_LandingPage">

                <img src={logo}></img>

                <nav>
                    <btn><a class="active" href='/LandingPage'>Home</a></btn>
                    {loggedIn && <btn><a href="/PaginaPrincipal">Pagina Principal</a></btn>}
                    <btn><a href='/AcercaDelEquipo'>Acerca De</a></btn>
                    <btn><a href='/ComoJugar'>Cómo Jugar</a></btn>
                    {loggedIn && <btnr><a href="/LandingPage" onClick={cerrarSesion}>Cerrar Sesión</a></btnr>}
        
                    {/* {loggedIn && <btnr><a href="/LandingPage">Editar Perfil</a></btnr>} */}
                </nav>

            </header>

            <div className="mainlanding">

                <div className='div_info'>

                    <img src={game_art}></img>

                    <h1>¡Construye la mejor ciudad con tu magia y estrategia !</h1>

                    <div className='nav_button'>
                        <a href='/ComoJugar'> ¡Quiero aprender a jugar! </a>
                    </div>



                </div>

                <div className='div_connect'>

                    {loggedIn && <h1>¡Bievenid@!</h1>}
                    {loggedIn && <h1>Para comenzar a jugar o ver tus estadísticas ve a la Página Principal.</h1>}

                    {!loggedIn && <div className='div_login'>

                    <h1>¡Conéctate para jugar!</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="div_input">
                            <label>Correo electrónico</label>
                            <input placeholder='usuario123@gmail.com' onChange={handleEmail} required></input>
                        </div>
                        <div className="div_input">
                            <label>Contraseña</label>
                            <input type="password" placeholder='**********' onChange={handleContrasena} required></input>
                        </div>

                        <div className='nav_button' type="submit" onClick={handleSubmit}>
                            <a href=''>Iniciar Sesión</a>
                        </div>
                        
                    </form>

                    </div>}

                    {!loggedIn && <div className='div_signup'>

                        <h1>¿Aún no tienes una cuenta?</h1>
                    
                        <div className='nav_button'>
                            <a href='/Registrarse'>Crear Cuenta</a>
                        </div>

                    </div>}
                </div>

            </div>

            <div className="footer">
                <p>Página creada por Eléa y Sofía c:</p>
            </div>

        </body>


    )
}