import './../../../../assets/styles/Carousel.css'
import image from '../../../../assets/images/colocar_img.png'

export default function Div_3() {
    return (
        <div className='regla'>
            <div className='banner'>
                <h1>Construir tu Ciudad</h1>
            </div>
            <div className='contenido' id='div3'>
                <img src={image}></img>
                <p>Cada jugador cuenta con su propia ciudad donde puede construir hasta 6 edificios.</p>
                    <p>Para colocar un edificio, hagas un click en una carta de tu baraja, y después un click en una casilla.</p>
                    <p>Los edificios se pueden colocar de cualquier forma en tu ciudad, siempre y cuando cuentes con el dinero necesario para su construcción y que el espacio donde deseas construirlo esté vacío.</p>
            </div>
            
        </div>
    )
}