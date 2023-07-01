import './../../../../assets/styles/Carousel.css'
import SwapperTipoCarta from '../../Dynamic_Swappers/SwapperPersonajes'

export default function Div_2() {
    return (
        <div className='regla'>
            <div className='banner'>
                <h1>Tipo de Personaje</h1>
            </div>
            <div className='contenido' id='div2'>
                <div className='tamañocartapersonaje'>
                    <SwapperTipoCarta />
                </div>
                <div>
                    <p>Existen 4 tipos de personajes, cada uno con su propio poder, así que elige cuidadosamente:</p>
                    <p>-Ladrón: Roba todo el monedero de otro jugador.</p>
                    <p>- Rey: Puede elegir su personaje en la proxima ronda.</p>
                    <p>- Arquitecto: Construye un edificio a mitad de precio.</p>
                    <p>- Guerrero: Destruye un edificio propio o de otro jugador.</p>
                </div>
            </div>
            
        </div>
    )
}