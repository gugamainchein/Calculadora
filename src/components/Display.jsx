//Importando a biblioteca do React
import React from 'react'

//Importando a estrutura CSS
import './Display.css'

//Criando um componente sem estado
export default props => {
    return (
        <div className="display">{props.value}</div>
    )
}