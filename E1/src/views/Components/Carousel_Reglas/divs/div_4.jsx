import './../../../../assets/styles/Carousel.css'
import image from './../../../../assets/images/mismo_tipo_image.png' 

export default function Div_4() {
    return (
        <div className='regla'>
            <div className='banner'>
                <h1>Tipos de Cartas Edificio</h1>
            </div>
            <div className='contenido' id='div4'>
            <img src={image}></img>
            <div>
                <p>Existen 4 tipos de cartas de edificios, donde cada tipo corresponde a un personaje.</p>
                <p>Al prinicipio de la ronda, obtendrás unas monedas bonus para cada edificio del mismo tipo que tu personaje.
                Al elegir un personaje para la ronda, no basta pensar solo en su poder... ¡Trata de tomar en cuenta este bonus de monedas también!</p>
            
            </div>
            </div>
            
        </div>
    )
}