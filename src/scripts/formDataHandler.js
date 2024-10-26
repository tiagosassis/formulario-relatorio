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

export function handleExtraDeliveryData(event) {
    const [deliveryPersonId, extraDeliveryIndex] = event.target.id.match(/\d+/g); // pega o número identificador do entregador e pega o número do input que foi usado
    let span

    if (event.target.className.includes('number')) { // if usado para selecionar se o input usado foi o de numero de pedido ou de motivo de extra
        span = document.getElementById(`report-extra-delivery-number-${deliveryPersonId}-${extraDeliveryIndex}`)
        let requestNumber = event.target.value
        span.textContent = ' N' + requestNumber
    } else if(event.target.className.includes('reason')) {
        span = document.getElementById(`report-extra-delivery-reason-${deliveryPersonId}-${extraDeliveryIndex}`)
        let reason = event.target.value
        reason = reason.charAt(0).toUpperCase() + reason.slice(1) // deixa a primeira letra maiúscula
        span.textContent = ' (' + reason + ')'
    } else{
        console.log('um erro detectado na função handleExtraDeliveryData')
    }
}