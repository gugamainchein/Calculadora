//Importando a biblioteca do React
import React from 'react'

//Importando a estrutura CSS
import './Button.css'

//Criando um componente sem estado
export default props => {
    return (
        <button 
            onClick={e => props.click && props.click(props.label)}
            className={`
                button
                ${props.operation ? 'operation' : ''}
                ${props.double ? 'double' : ''}
                ${props.triple ? 'triple' : ''}
            `}>
            {props.label}
        </button>
    )
}