import '../../../assets/styles/Styles_Componentes/CartasPersonajes.css'

import logo from '../../../assets/images/logo_guerrero.png'

export default function Guerrero(){

    return (
        <div className='carta_personaje' id='carta_guerrero'>
            <img src={logo}></img>
        </div>
        
    )
}