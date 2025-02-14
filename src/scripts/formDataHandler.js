// formDataHandler.js
// Funções para manipular e atualizar dados do formulário em tempo real.

import { toggleClassHidden, showWarningForHighValue } from "./utils.js"
import { paymentCalculation } from "./payment.js"
import { manageExtraDeliveryInputs, manageExtraDeliveryDisplay } from "./fieldManager.js"
import { reportData } from "./reportData.js";

export function handleDeliveryPersonData(event) {
    /* função que atualiza o relatorio final com as informações que estão sendo inseridas, como a função capta informações de vários input, eles tem que ser separados pelo ID
        dessa forma temos um if/else que separa delivery, extra e consumo
        o nome é atualizado de forma automatica pela funçao refreshPersonNameInDisplayOnChange() e o pagamento é calculado pela função paymentCalculation()
        oque diferencia cada entrega é deliveryPersonId
    */
    const deliveryPersonId = event.target.id.match(/\d+/g)[0]
    const sectionExtraDelivery = document.getElementById('report-extra-delivery')

    paymentCalculation(deliveryPersonId) // calcula o pagamento do entregador(a) com base nas entregas, entregas extras e consumo
    refreshPersonNameInDisplayOnChange(deliveryPersonId)

    if(event.target.id.includes('deliveries')){
        handleDeliveryData(event, deliveryPersonId)

    } else if(event.target.id.includes('extra')){
        if (event.target.value){ // altera a quantidade de extra no relatorio
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ', ' + event.target.value + ' Extra'
            manageExtraDeliveryInputs(deliveryPersonId, event.target.value)
            manageExtraDeliveryDisplay(deliveryPersonId, event.target.value)
        }
        else {
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ''
            manageExtraDeliveryInputs(deliveryPersonId, 0)
            manageExtraDeliveryDisplay(deliveryPersonId, 0)
        }
        
        document.querySelectorAll('.flex-container-extra').length < 1 // caso haja entregas extras a parte do relatorio fica visivel, se não, ficava com display none
            ? toggleClassHidden(sectionExtraDelivery, false)
            : toggleClassHidden(sectionExtraDelivery, true)
        
        document.querySelectorAll('#section-extra-delivery div > div').length >= 1 // caso haja entregas extras, a section onde havera o input das informações aparece, se não, fica invisivel
            ? toggleClassHidden(document.getElementById('fieldset-extra-delivery'), true)
            : toggleClassHidden(document.getElementById('fieldset-extra-delivery'), false)

    } else if(event.target.id.includes('consumption')){ 
        if (event.target.value) // altera o status de consumo no relatorio
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ', 1 Consumo'
        else {
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ''
            if (!document.querySelector(`#textField-${event.target.id}`).value) {
                document.querySelector(`#consumption-${deliveryPersonId}`).classList.remove('input-invalid-value')
            }
        }
    }
}

function refreshPersonNameInDisplayOnChange(deliveryPersonId) {
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

function handleDeliveryData(event, deliveryPersonId) {
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
        console.warn('um erro detectado na função handleExtraDeliveryData')
    }
}

export function handleExtraEmployeeData(event) {
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
    const inputConsumption = document.getElementById(`extra-employee-day-consumption-${extraEmployeeId}`)
    
    let paymentValue = inputPayment.value ? parseFloat(inputPayment.value.replace(/\D/g, "")) / 100 : 0
    let consumptionValue = inputConsumption.value ? parseFloat(inputConsumption.value.replace(/\D/g, "")) / 100 : 0

    const payment = paymentValue - consumptionValue;

    const formattedPayment = payment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })

    if (inputPayment.value)
        showWarningForHighValue(formattedPayment, extraEmployeeId)

    const displayName = document.getElementById(`textField-employee-name-${extraEmployeeId}`)
    const displayPayment = document.getElementById(`textField-employee-daily-payment-${extraEmployeeId}`)
    const displayPixKey = document.getElementById(`textField-employee-pix-key-${extraEmployeeId}`)

    if (inputName.value) {
        consumptionValue > 0 ? displayName.textContent = `- ${inputName.value} (1 consumo): ` : displayName.textContent = `- ${inputName.value}: `
    } else{
        displayName.textContent = ''
    }
    inputPayment.value ? displayPayment.textContent = formattedPayment : displayPayment.textContent = ''
    inputPixKey.value ? displayPixKey.textContent = ` (Pix: ${inputPixKey.value})` : displayPixKey.textContent = ''

    displayName.textContent.length >= 1
        ? toggleClassHidden(document.getElementById('report-freelancer'), true)
        : toggleClassHidden(document.getElementById('report-freelancer'), false)

}

export function handleNoteData(event) {
    const comment = event.target.value
    if(comment){
        console.log('teste')
        toggleClassHidden(document.getElementById('report-note'), true)
        const commentDisplay = document.getElementById('display-note')
        commentDisplay.innerText = comment
    } else{
        toggleClassHidden(document.getElementById('report-note'), false)
    }
}