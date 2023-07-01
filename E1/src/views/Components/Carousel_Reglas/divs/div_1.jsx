import './../../../../assets/styles/Carousel.css'
import img_div_1 from './../../../../assets/images/turno_image.png';

export default function Div_1() {
    return (
        <div className='regla'>
            <div className='banner'>
                <h1>Elegir tu Personaje</h1>
            </div>
            <div className='contenido'>
                <img src={img_div_1}></img>
                <p>Al inicio de cada ronda tú y los otros jugadores deberán elegir uno de los personajes disponibles mostrados en la zona de personajes. 
                    Es también acá que luego, durante cada ronda de juego, podrás ver quién está jugando su turno actualmente. </p>
            </div>
            
        </div>
    )
}