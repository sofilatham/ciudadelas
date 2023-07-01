import React, { useState, useEffect } from 'react';
import '../assets/styles/Registrarse.css'
import axios from 'axios';
import API_URL from "../config";

import logo from '../assets/images/logo_ciudadelas.png';
const foto_perfil = 'https://www.pngitem.com/pimgs/m/563-5634811_doge-meme-png-photos-dog-meme-transparent-png.png';

export default function Registrarse(){
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState(foto_perfil);

    const handleNombreUsuario = (input) => {
        setNombreUsuario(input.target.value)
    }

    const handleEmail = (input) => {
        setEmail(input.target.value)
    }

    const handleContrasena = (input) => {
        setContrasena(input.target.value)
    }

    const handleFotoPerfil = (input) => {
        setFotoPerfil(input.target.value)
    }

    function crearCookieUsuario(idUsuario) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        const cookieValue = encodeURIComponent(idUsuario) + '; expires=' + expirationDate.toUTCString() + '; path=/';
        document.cookie = 'idUsuario=' + cookieValue;
    }

    const handleSubmit = (evento) => {
        evento.preventDefault()
        const userData = {
            nombre: nombreUsuario,
            contrasena: contrasena,
            correo: email,
            imageURL: fotoPerfil
        };
        axios.post(`${API_URL}/signup`, userData)
        .then((response) => {
            const userID = response.data.id;
            crearCookieUsuario(userID);
            window.location.href = '/PaginaPrincipal';
            console.log(response)
        })
        .catch((error) => {
            alert(error.response.data)
        })
    }


    return (

        <body>

            <header class="header_LandingPage">

                <img src={logo}></img>

                <nav>
                    <btn><a href='/LandingPage'>Home</a></btn>
                    <btn><a href='/AcercaDelEquipo'>Acerca De</a></btn>
                    <btn><a href='/ComoJugar'>Cómo Jugar</a></btn>
                    <btnr><a href="/LandingPage">Iniciar Sesión</a></btnr>
                </nav>

            </header>

            <div className='form_ciudadelas'>

                <div className='div_text'>
                ¡Crea tu propia cuenta!
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre de usuario:</label>
                        <input 
                        type="text" 
                        className="input-text" 
                        placeholder="usuario123" 
                        value={nombreUsuario} 
                        onChange={handleNombreUsuario} required/>
                    </div>

                    <div>
                        <label>Correo electrónico:</label>
                        <input 
                        type="email" 
                        className="input-text" 
                        placeholder="usuario123@gmail.com"
                        value={email} 
                        onChange={handleEmail} required/>
                    </div>

                    <div>
                        <label>Contraseña:</label>
                        <input 
                        type="password" 
                        className="input-text" 
                        placeholder="********"
                        value={contrasena} 
                        onChange={handleContrasena} required/>
                    </div>

                    <div>
                        <label>Foto de perfil (opcional):</label>
                        <input 
                        className="input-text" 
                        placeholder="http://..." 
                        value={fotoPerfil} 
                        onChange={handleFotoPerfil}/>
                    </div>

                    

                    <button className="boton_crear_cuenta" type="submit" onClick={handleSubmit}>Crear cuenta</button>
                </form>


            </div>

            <div className='footer'>
                <p>Página creada por Eléa y Sofía c:</p>
            </div>

        </body>
    )
}