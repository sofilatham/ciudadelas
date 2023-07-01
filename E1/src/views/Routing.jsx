import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AcercaDelEquipo from './AcercaDelEquipo'
import LandingPage from './LandingPage' 
import PaginaPrincipal from './PaginaPrincipal'
import ComoJugar from './ComoJugar'
import Visualizacion from './Visualizacion'
import Juego from './Juego'
import ResultadoJuego from './ResultadoJuego'
import Registrarse from './Registrarse'

export default function Routing(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path={'/'} element={<LandingPage />}/>
                    <Route path={'/LandingPage'} element={<LandingPage />}/>
                    <Route path={'/AcercaDelEquipo'} element={<AcercaDelEquipo />}/>
                    <Route path={'/PaginaPrincipal'} element={<PaginaPrincipal />}/>
                    <Route path={'/ComoJugar'} element={<ComoJugar />}/>
                    <Route path={'/Juego'} element={<Juego />}/>
                    <Route path={'/ResultadoJuego'} element={<ResultadoJuego/>}/>
                    <Route path={'/Registrarse'} element={<Registrarse />}/>
                    <Route path={'/Visualizacion'} element={<Visualizacion />}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </>
    )
}