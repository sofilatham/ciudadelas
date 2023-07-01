import './../../../../assets/styles/Carousel.css'
import image from './../../../../assets/images/mi_turno_image.png'
export default function Div_5() {
    return (
        <div className='regla'>
            <div className='banner'>
                <h1>Tu Turno</h1>
            </div>
            <div className='contenido'>
                <img src={image}></img>
                <p>Cada turno cuenta con 3 posibilidades. </p>
                <p>Debes decidir si sacar 2 monedas o 2 cartas de edificio aleatorias del mazo.</p>
                <p>Se indicará el poder de tu personaje por si lo olvidas. ¡Recuerda usarlo!</p>
                <p>Finalmente, tienes la posibilidad de construir un edificio en tu ciudad. Vas a elegir una carta dentro de tu baraja y hacer un drag and drop hacia una casilla libre. Ojo, ¡tienes que poder pagar el precio!</p>
            </div>
            
        </div>
    )
}