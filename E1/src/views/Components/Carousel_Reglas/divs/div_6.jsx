import './../../../../assets/styles/Carousel.css'
import fin_juego from './../../../../assets/images/fin-juego.png';

export default function Div_6() {
    return (
        <div className='regla'>
            <div className='banner'>
                <h1>Fin del Juego</h1>
            </div>
            <div className='contenido'>
                <img src={fin_juego}/>
                <p>El juego finaliza cuando al terminar una ronda alguien ya completó su ciudad 
                    y entonces se procede a mostrar los puntajes de cada jugador y al respectivo ganador.</p>
            </div>
            
        </div>
    )
}