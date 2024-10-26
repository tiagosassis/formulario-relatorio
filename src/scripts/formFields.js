// formFields.js
// Funções responsáveis por criar e configurar campos de formulário para inserção de dados.
import { createDisplayFieldsForExtraEmployee } from "./displayFields.js"

export function createInputFieldsForExtraDelivery(div1, numberOfExtra, deliveryPersonId) {
    /*
     * Cria campos de entrada para entregas extras de um entregador.
     *
     * Parâmetros:
     *   div1: Elemento pai para os novos campos.
     *   numberOfExtra: Quantidade de entregas extras a serem criadas.
     *   deliveryPersonId: ID do entregador.
     *
     * Estrutura criada:
     * - Para cada entrega extra:
     *   - Div com o nome do entregador.
     *   - Campo de entrada para o número do pedido.
     *   - Campo de entrada para o motivo da entrega extra.
     */
    let div2, div3, input, label
    let register = document.querySelectorAll(`.register-${deliveryPersonId}`)
    numberOfExtra = parseInt(numberOfExtra)
    let i = register.length
    numberOfExtra = numberOfExtra + i

    
    for (; i < numberOfExtra; i++) {
        div2 = document.createElement('div')
        div2.classList.add('flex-row-wrap', `register-${deliveryPersonId}`, 'flex-container-extra')

        label = document.createElement('label')
        label.classList.add('flex-item-label-name', `class-update-name-${deliveryPersonId}`)
        label.textContent = document.querySelector(`#delivery-person-name-${deliveryPersonId}`).value

        div2.appendChild(label)

        for (let j = 0; j < 2; j++) {
            div3 = document.createElement('div')
            if (j == 0) {
                div3.classList.add('flex-item-order-number')
                input = document.createElement('input')
                input.setAttribute('type', 'number')
                input.setAttribute('name', 'extra-delivery-number')
                input.classList.add('float-input', 'request-number-extra')
                input.setAttribute('required', '')
                input.setAttribute('id', `extra-delivery-number-${deliveryPersonId}-${i}`)
                label = document.createElement('label')
                label.setAttribute('for', `extra-delivery-number-${deliveryPersonId}-${i}`)
                label.classList.add('float-label')
                label.textContent = 'Nº do pedido'

                div3.appendChild(input)
                div3.appendChild(label)
            }
            else{
                div3.classList.add('flex-item-extra-reason')
                input = document.createElement('input')
                input.setAttribute('type', 'text')
                input.setAttribute('name', 'reason-extra-delivery')
                input.classList.add('float-input', 'reason-delivery-extra')
                input.setAttribute('required', '')
                input.setAttribute('id', `reason-extra-delivery-${deliveryPersonId}-${i}`)
                label = document.createElement('label')
                label.setAttribute('for', `reason-extra-delivery-${deliveryPersonId}-${i}`)
                label.classList.add('float-label')
                label.textContent = 'Motivo'

                div3.appendChild(input)
                div3.appendChild(label)
            }
            div2.appendChild(div3)
        }
        div1.appendChild(div2)
    }
}

export function createInputFieldsForExtraEmployee() {
    /**
     * Adiciona um novo funcionário extra ao formulário, criando campos de entrada para nome, pagamento diário e chave Pix.
     * Esta função gera automaticamente IDs exclusivos para os campos de entrada com base na quantidade de funcionários extras já existentes.
     *
     * Estrutura HTML gerada:
     * <div class="flex-row-wrap extra-employee">
     *     <div class="flex-item-employee-name">
     *         <input type="text" name="extra-employee-name-{extraEmployeeId}" id="extra-employee-name-{extraEmployeeId}" class="float-input" required>
     *         <label for="extra-employee-name-{extraEmployeeId}" class="float-label">Nome</label>
     *     </div>
     *     <div class="flex-item-daily-payment">
     *         <input type="number" name="extra-employee-daily-payment-{extraEmployeeId}" id="extra-employee-daily-payment-{extraEmployeeId}" class="float-input" required>
     *         <label for="extra-employee-daily-payment-{extraEmployeeId}" class="float-label">Diária</label>
     *     </div>
     *     <div class="flex-item-pix-key">
     *         <input type="text" name="extra-employee-pix-key-{extraEmployeeId}" id="extra-employee-pix-key-{extraEmployeeId}" class="float-input" required>
     *         <label for="extra-employee-pix-key-{extraEmployeeId}" class="float-label">Chave Pix</label>
     *     </div>
     * </div>
     *
     * - Cada funcionário extra é representado por um <div> com a classe 'extra-employee'.
     * - Os campos de entrada têm atributos 'name' e 'id' gerados com o ID do funcionário extra.
     */
    const container = document.getElementById('section-extra-employee')
    const extraEmployeeCount = document.querySelectorAll('#section-extra-employee > div') // seleciona todos os campos ja criados para saber a quantidade de extras
    const extraEmployeeId = extraEmployeeCount.length + 1

    const div1 = document.createElement('div')
    div1.classList.add('flex-row-wrap', 'extra-employee')

    let div2, input, label

    
    div2 = document.createElement('div')
    div2.classList.add('flex-item-employee-name')
    input = document.createElement('input')
    input.setAttribute('id', `extra-employee-name-${extraEmployeeId}`)
    input.classList.add('float-input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', `extra-employee-name-${extraEmployeeId}`)
    input.setAttribute('required', '')
    label = document.createElement('label')
    label.setAttribute('for', `extra-employee-name-${extraEmployeeId}`)
    label.classList.add('float-label')
    label.textContent = 'Nome'
    div2.append(input, label)
    div1.appendChild(div2)

    div2 = document.createElement('div')
    div2.classList.add('flex-item-daily-payment')
    input = document.createElement('input')
    input.setAttribute('id', `extra-employee-daily-payment-${extraEmployeeId}`)
    input.classList.add('float-input')
    input.setAttribute('type', 'number')
    input.setAttribute('name', `extra-employee-daily-payment-${extraEmployeeId}`)
    input.setAttribute('required', '')
    label = document.createElement('label')
    label.setAttribute('for', `extra-employee-daily-payment-${extraEmployeeId}`)
    label.classList.add('float-label')
    label.textContent = 'Diária'
    div2.append(input, label)
    div1.appendChild(div2)

    div2 = document.createElement('div')
    div2.classList.add('flex-item-pix-key')
    input = document.createElement('input')
    input.setAttribute('id', `extra-employee-pix-key-${extraEmployeeId}`)
    input.classList.add('float-input')
    input.setAttribute('type', 'text')
    input.setAttribute('name', `extra-employee-pix-key-${extraEmployeeId}`)
    input.setAttribute('required', '')
    label = document.createElement('label')
    label.setAttribute('for', `extra-employee-pix-key-${extraEmployeeId}`)
    label.classList.add('float-label')
    label.textContent = 'Chave Pix'
    div2.append(input, label)
    div1.appendChild(div2)

    container.appendChild(div1)

    createDisplayFieldsForExtraEmployee(extraEmployeeId) // cria a div onde as informações do funcionario extra serão colocadas para mostrar no relatorio
}