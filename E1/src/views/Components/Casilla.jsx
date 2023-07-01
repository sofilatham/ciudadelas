import './../../assets/styles/Styles_Componentes/Componentes_Mapa.css'


export default function Casilla({child, posicion, funcionColocar}) {

    const handleClick = () => {
        funcionColocar(posicion)
    }

    return (
        <div className="div_Casilla" onClick={handleClick}>
            {child}
        </div>
    )
}