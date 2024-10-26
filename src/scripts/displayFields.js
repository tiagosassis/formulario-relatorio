// displayFields.js
// Funções para criar e gerenciar os campos de exibição de dados inseridos pelos usuários.

export function createDisplayFieldsForDeliveryPerson(deliveryPersonId) {
    /**
     * Cria um campo de texto para exibir informações dos entregadores no relatório, tais informações incluem nome, numero de entregas, numero de entregas extras e consumo.
     */

    let div, span, br
    br = document.createElement('br')
    

    const container = document.getElementById('report-delivery')
    div = document.createElement('div')
    div.classList.add('hidden')
    div.setAttribute('id', `delivery-person-report-${deliveryPersonId}`)
    
    span = document.createElement('span')
    span.setAttribute('id', `textField-delivery-person-name-${deliveryPersonId}`)
    span.classList.add(`class-update-name-${deliveryPersonId}`)
    div.append(span, ': ')
    span = document.createElement('span')
    span.setAttribute('id', `textField-payment-${deliveryPersonId}`)
    div.append(span, br)
    span = document.createElement('span')
    span.classList.add('hidden')
    span.textContent = '('
    div.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('id', `textField-deliveries-${deliveryPersonId}`)
    div.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('id', `textField-extra-${deliveryPersonId}`)
    div.appendChild(span)
    span = document.createElement('span')
    span.setAttribute('id', `textField-consumption-${deliveryPersonId}`)
    div.appendChild(span)
    span = document.createElement('span')
    span.classList.add('hidden')
    span.textContent = ')'
    div.appendChild(span)

    container.appendChild(div)
}

export function createDisplayFieldsForExtraDelivery(deliveryPersonId, numberOfExtra, div) {
    /**
     * Cria campos de exibição para entregas extras no relatório.
     */
   
    for (let i = 0; i < numberOfExtra; i++) {
        const div2 = document.createElement('div')
        div2.classList.add(`register-content-${deliveryPersonId}`)
        div2.textContent = '- '
        const name = document.createElement('span')
        name.setAttribute('id', `report-extra-delivery-name-${deliveryPersonId}-${i}`)
        name.classList.add(`class-update-name-${deliveryPersonId}`)
        name.textContent = document.querySelector(`#delivery-person-name-${deliveryPersonId}`).value
        const number = document.createElement('span')
        number.setAttribute('id', `report-extra-delivery-number-${deliveryPersonId}-${i}`)
        let reason = document.createElement('span')
        reason.setAttribute('id', `report-extra-delivery-reason-${deliveryPersonId}-${i}`)

        div2.append(name, number, reason)
        div.appendChild(div2)
    }
}

export function createDisplayFieldsForExtraEmployee(extraEmployeeId) {
    /**
     * Cria dinamicamente uma nova seção no relatório para exibir as informações dos funcionários extras.
    */

    const container = document.getElementById('report-freelancer')
    const div = document.createElement('div')
    let span
    div.setAttribute('id', `report-freelancer-${extraEmployeeId}`)
    span = document.createElement('span')
    span.setAttribute('id', `textField-employee-name-${extraEmployeeId}`)
    div.appendChild(span)

    span = document.createElement('span')
    span.setAttribute('id', `textField-employee-daily-payment-${extraEmployeeId}`)
    div.appendChild(span)

    span = document.createElement('span')
    span.setAttribute('id', `textField-employee-pix-key-${extraEmployeeId}`)
    div.appendChild(span)

    container.appendChild(div)
}