import React, {createContext, useState, useEffect, useRef} from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import API_URL from "../config";

import '../assets/styles/ResultadoJuego.css'

import logo from '../assets/images/logo_ciudadelas.png';
import foto_perfil from '../assets/images/doge.jpeg';
import imgCorona from '../assets/images/corona.png';

export default function ResultadoJuego(){
    const [idPartida, setIdPartida] = useState(null);
    const [idUsuarioActual, setIdUsuarioActual] = useState(null);

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

    const [idUsuarios, setIdUsuarios] = useState([])
    const [nombres, setNombres] = useState([])
    const [fotos, setFotos] = useState([])
    const [puntajes, setPuntajes] = useState([])
    const [idGanador, setIdGanador] = useState(null)
    useEffect(() => {
        if (idPartida){
            axios.get(`${API_URL}/partida/puntajes/${idPartida}`)
            .then((response) => {
                setIdGanador(response.data.idUsuarioGanador)
                const resultados = response.data.puntajesObtenidos
                                
                let array_id = []
                let array_nombres = []
                let array_fotos = []
                let array_puntajes = []
                for (let i = 0; i < 4; i++){
                    let usuario = resultados[i].usuario
                    let puntaje = resultados[i].puntaje

                    array_id.push(usuario.id)
                    array_nombres.push(usuario.nombre)
                    array_fotos.push(usuario.imageURL)
                    array_puntajes.push(puntaje)

                }

                console.log(array_id)
                console.log(array_nombres)
                console.log(array_puntajes)
                setIdUsuarios(array_id);
                setNombres(array_nombres);
                setFotos(array_fotos);
                setPuntajes(array_puntajes);

                axios.post(`${API_URL}/partida/${idPartida}/ganador/${response.data.idUsuarioGanador}`)
            })
        }
    }, [idPartida])

    function cerrar_partida(){
        document.cookie = `idPartida=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    return (
        <body>

            <header>

            <img src={logo}></img>

            <nav>
                <div className="btnr"><a href='/PaginaPrincipal' onClick={cerrar_partida}>Salir del Juego</a></div>
            </nav>

            </header>


            <main>
                <div className='block_coronado'>
                    <div className='corona'>
                        {idGanador === idUsuarios[0]? <img src={imgCorona}></img> : <></>}
                    </div>
                    <div className='div_usuario' id={idUsuarioActual == idUsuarios[0]? 'perso':null}>
                        <img src={fotos[0] ? fotos[0] : foto_perfil}></img>
                        <p className='label_nombre'>{nombres[0]}</p>
                        <p className='label_puntaje'>{puntajes[0]}</p>
                    </div>
                </div>
                <div className='block_coronado'>
                    <div className='corona'>
                        {idGanador === idUsuarios[1]? <img src={imgCorona}></img> : <></>}
                    </div>
                    <div className='div_usuario' id={idUsuarioActual == idUsuarios[1]? 'perso':null}>
                        <img src={fotos[1] ? fotos[1] : foto_perfil}></img>
                        <p className='label_nombre'>{nombres[1]}</p>
                        <p className='label_puntaje'>{puntajes[1]}</p>
                    </div>
                </div>
                <div className='block_coronado'>
                    <div className='corona'>
                        {idGanador === idUsuarios[2]? <img src={imgCorona}></img> : <></>}
                    </div>
                    <div className='div_usuario' id={idUsuarioActual == idUsuarios[2]? 'perso':null}>
                        <img src={fotos[2] ? fotos[2] : foto_perfil}></img>
                        <p className='label_nombre'>{nombres[2]}</p>
                        <p className='label_puntaje'>{puntajes[2]}</p>
                    </div>
                </div>
                <div className='block_coronado'>
                    <div className='corona'>
                        {idGanador === idUsuarios[3]? <img src={imgCorona}></img> : <></>}
                    </div>
                    <div className='div_usuario' id={idUsuarioActual == idUsuarios[3]? 'perso':null}>
                        <img src={fotos[3] ? fotos[3] : foto_perfil}></img>
                        <p className='label_nombre'>{nombres[3]}</p>
                        <p className='label_puntaje'>{puntajes[3]}</p>
                    </div>
                </div>
               
            </main>


        </body>
    )
}