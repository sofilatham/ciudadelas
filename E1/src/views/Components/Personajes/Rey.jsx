import '../../../assets/styles/Styles_Componentes/CartasPersonajes.css'

import logo from '../../../assets/images/logo_rey.png'

export default function Rey(){

    return (
        <div className='carta_personaje' id='carta_rey'>
            <img src={logo}></img>
        </div>
        
    )
}