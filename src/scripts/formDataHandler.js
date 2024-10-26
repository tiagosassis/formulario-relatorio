// formDataHandler.js
// Funções para manipular e atualizar dados do formulário em tempo real.

import { toggleClassHidden } from "./utils.js"
import { createInputFieldsForExtraDelivery } from "./formFields.js";

export function updateReportExtraEmployee(event) {
    /**
     * Atualiza os campos de exibição no relatório em tempo real com os dados inseridos nos inputs de nome, pagamento e chave Pix dos funcionários extras.
     * Caso haja um nome inserido, torna a seção correspondente visível no relatório.
     * 
     * @param {Event} event - O evento 'input' que dispara a atualização.
     */
    const extraEmployeeId = event.target.id.match(/\d+/g) // pega o ID de qual input recebeu alguma informação
    const inputName = document.getElementById(`extra-employee-name-${extraEmployeeId}`)
    const inputPayment = document.getElementById(`extra-employee-daily-payment-${extraEmployeeId}`)
    const inputPixKey = document.getElementById(`extra-employee-pix-key-${extraEmployeeId}`)

    const name = document.getElementById(`textField-employee-name-${extraEmployeeId}`)
    const payment = document.getElementById(`textField-employee-daily-payment-${extraEmployeeId}`)
    const pixKey = document.getElementById(`textField-employee-pix-key-${extraEmployeeId}`)

    inputName.value ? name.textContent = `- ${inputName.value}` : name.textContent = ''
    inputPayment.value ? payment.textContent = `: R$ ${parseFloat(inputPayment.value).toFixed(2).replace('.', ',')}` : payment.textContent = ''
    inputPixKey.value ? pixKey.textContent = ` (Pix: ${inputPixKey.value})` : pixKey.textContent = ''

    
    name.textContent.length >= 1
        ? toggleClassHidden(document.getElementById('report-freelancer'), true)
        : toggleClassHidden(document.getElementById('report-freelancer'), false)

}

export function removeExtraEmployee() {
    /**
     * Remove o último funcionário extra da seção e do relatório.
     */
    const extraEmployee = document.querySelectorAll('#section-extra-employee > div')

    if (extraEmployee.length === 0) {
        console.warn('Não há funcionários extras para remover.')
        return
    }

    const extraEmployeeId = extraEmployee[extraEmployee.length - 1].firstChild.firstChild.id.match(/\d+/g)
    
    // remove a div onde os dados são expostos
    document.getElementById(`report-freelancer-${extraEmployeeId}`).remove()

    // remove a div onde os dados são inseridos
    extraEmployee[extraEmployee.length - 1].remove()
}

export function updateDeliveries(event, deliveryPersonId) {
    /**
     * Atualiza a quantidade de entregas no relatório e altera a visibilidade do entregador
     * conforme a quantidade informada.
     *
     * @param {Event} event - O evento de entrada com a nova quantidade de entregas.
     * @param {number} deliveryPersonId - O ID do entregador cujas entregas estão sendo atualizadas.
     *
     */
    document.querySelector(`#textField-${event.target.id}`).innerHTML = event.target.value + ' Entregas' 
    
    if (event.target.value) 
        toggleClassHidden(document.querySelector(`#delivery-person-report-${deliveryPersonId}`), true)
    else 
        toggleClassHidden(document.querySelector(`#delivery-person-report-${deliveryPersonId}`), false)
}

export function updatePersonNameInDisplay(deliveryPersonId) {
    /**
     * Atualiza o nome do entregador em todos os elementos da página que possuem a classe
     * `class-update-name-${deliveryPersonId}` com o valor do input correspondente.
     *
     * @param {number} deliveryPersonId - O ID do entregador cujo nome está sendo atualizado.
     */
    const newName = document.querySelectorAll(`.class-update-name-${deliveryPersonId}`)
    newName.forEach(element =>{
        element.innerHTML = document.querySelector(`#delivery-person-name-${deliveryPersonId}`).value
    })
}

export function ExtraDeliveryRegister(deliveryPersonId, numberOfExtra) {
    /**
     * Gerencia a criação e remoção de campos de entrada para entregas extras de um entregador.
     * Se a div correspondente ao entregador já existe, ajusta o número de campos com base na nova quantidade especificada
     * Cria novos campos se o número aumentou, remove campos se o número diminuiu, e não faz nada se o número permanecer o mesmo.
     * Se a div não existir, cria-a e gera os campos de entrada necessários.
     * 
     * @param {number} deliveryPersonId - ID do entregador associado às entregas extras.
     * @param {number} numberOfExtra - Número de entregas extras a serem registradas.
     */

    const container = document.getElementById('section-extra-delivery')
    let div = document.getElementById(`div-delivery-person-${deliveryPersonId}`)

    if (div) {
        let register = document.querySelectorAll(`.register-${deliveryPersonId}`)
        let currentRegister = numberOfExtra - register.length
        if (currentRegister > 0) {
            createInputFieldsForExtraDelivery(div, currentRegister, deliveryPersonId)
        } else if(currentRegister < 0){
            for (let i = register.length; currentRegister !== 0; i--) {
                if (register[i - 1]) {
                    register[i - 1].remove()
                }
                currentRegister++
            }
        } else {
            return
        }

    } else {
        div = document.createElement('div')
        div.classList.add('flex-column-wrap', `order-${deliveryPersonId}`)
        div.setAttribute('id', `div-delivery-person-${deliveryPersonId}`)

        createInputFieldsForExtraDelivery(div, numberOfExtra, deliveryPersonId)

        container.appendChild(div)
    }
}