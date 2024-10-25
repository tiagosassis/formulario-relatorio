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

export function createTextField(deliveryPersonId) {
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