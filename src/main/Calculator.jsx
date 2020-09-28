//Importando os módulos do React
import React, { Component } from 'react'

//Importando o css
import './Calculator.css'

//Importando botões
import Button from '../components/Button'

//Importando Display
import Display from '../components/Display'

//Definindo constante que irá armazenar o estado inicial
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

//Exportando a função
export default class Calculator extends Component {
    state = { ...initialState }

    //Função de limpar a memória
    clearMemory() {
        this.setState({ ...initialState })
    }

    //Função de adição de dígito
    addDigit(n) {
        //Verificando se o display já possui um ponto atrelado
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        //Evitando o zero à esquerda de algum número
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        //Verificando se o display será ou não vazio
        const currentValue = clearDisplay ? '' : this.state.displayValue

        //Novo valor que será colocado no display, dado o evento de digitação
        const displayValue = currentValue + n

        //Evento de mudança de estado
        this.setState({ displayValue, clearDisplay: false })

        //Toda vez que digitar algo diferente de ponto, armazenar o valor no array do initialState
        if (n !== '.') {
            //Setando o índice do meu array
            const i = this.state.current

            //Convertendo o valor antigo para e armazenando na variável
            const newValue = parseFloat(displayValue)

            //Alterando o array
            const values = [...this.state.values]
            values[i] = newValue

            //Substituindo o valor de arrays da variável fora da função
            this.setState({ values })
        }
    }

    //Função de reconhecimento da operação matemática
    setOperation(operation) {
        //Ao clicar em um botão de operação, passa a mudar o segundo parâmetro do array
        if (this.state.current === 0) {
            //Alterando o estado o initialState
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            //Clicando no botão '='
            const equals = operation === '='

            //Pegando operações anteriores à próxima operação
            const currentOperation = this.state.operation

            //Executando a operação e armazenando novamente no primeiro valor do array
            const values = [...this.state.values]
            try {
                //É recomendado usar o if and else para operações, e não o eval
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)

                //Zerando o segundo valor do array
                values[1] = 0
            } catch (e) {
                //Se der um erro, não é mudado o valor do estado
                values[0] = this.state.values[0]
            }

            //Aplicando as condições e mudando o estado inicial
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    render() {
        //this chama a função do arquivo (apresentadas antes do render)
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={() => this.clearMemory()} triple />
                <Button label="/" click={setOperation} operation />
                <Button label="7" click={addDigit} />
                <Button label="8" click={addDigit} />
                <Button label="9" click={addDigit} />
                <Button label="*" click={setOperation} operation />
                <Button label="4" click={addDigit} />
                <Button label="5" click={addDigit} />
                <Button label="6" click={addDigit} />
                <Button label="-" click={setOperation} operation />
                <Button label="1" click={addDigit} />
                <Button label="2" click={addDigit} />
                <Button label="3" click={addDigit} />
                <Button label="+" click={setOperation} operation />
                <Button label="0" click={addDigit} double />
                <Button label="." click={addDigit} />
                <Button label="=" click={setOperation} operation />
            </div>
        )
    }
}