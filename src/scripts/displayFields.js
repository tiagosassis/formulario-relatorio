// displayFields.js
// Funções para criar e gerenciar os campos de exibição de dados inseridos pelos usuários.

export function createReportExtraEmployee(extraEmployeeId) {
    /**
     * Cria dinamicamente uma nova seção no relatório para exibir as informações dos funcionários extras.
     * O novo div contém três spans para exibir o nome, pagamento diário e chave Pix do funcionário.
     * 
     * @param {number} extraEmployeeId - O ID do funcionário extra utilizado para gerar os IDs dos elementos.
     * 
     * Estrutura HTML gerada:
     * <div id="report-freelancer-{extraEmployeeId}">
     *     <span id="textField-employee-name-{extraEmployeeId}">- </span>
     *     <span id="textField-employee-daily-payment-{extraEmployeeId}"></span>
     *     <span id="textField-employee-pix-key-{extraEmployeeId}"></span>
     * </div>
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

export function createDisplayFieldsForDeliveryPerson(deliveryPersonId) {
    /**
     * Cria um campo de texto para exibir informações do entregador no relatório.
     * 
     * Estrutura HTML gerada:
     * <div id="delivery-person-report-1" class="hidden">
     *     <span id="textField-delivery-person-name-1" class="class-update-name-1"></span>:
     *     <span id="textField-payment-1"></span><br>
     *     <span class="hidden">(</span><span id="textField-deliveries-1"></span>
     *     <span id="textField-extra-1"></span>
     *     <span id="textField-consumption-1"></span><span class="hidden">)</span>
     * </div>
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
     *
     * Esta função gera elementos DOM (spans) que mostram o nome do entregador, o número da entrega e o motivo para entregas extras.
     * O span contém a classe `class-update-name-${deliveryPersonId}`
     * que permite a atualização simultânea do nome do entregador no relatorio caso isso seja alterado no input.
     *
     * @param {number} deliveryPersonId - O ID do entregador.
     * @param {number} numberOfExtra - O número de entregas extras a serem exibidas.
     * @param {HTMLElement} div - O elemento DOM onde os campos de exibição serão adicionados.
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