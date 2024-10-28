// formFields.js
// Funções responsáveis por criar e configurar campos de formulário para inserção de dados.
import { createDisplayFieldsForDeliveryPerson, createDisplayFieldsForExtraEmployee } from "./displayFields.js"
import { activeDeliveryPersons, getCurrentDeliveryPersonCount, setCurrentDeliveryPersonCount } from "./app.js";
import { blockNonNumericKeys, restrictInputRange, handleMouseEvent, validateInputLength } from './utils.js'

export function createInputFieldsForDeliveryPerson(deliveryPersonId, name) {
    /**
     * Cria uma estrutura de entrada de dados para o entregador na seção "section-delivery-person".
     * Dependências: Requer a função `createDisplayFieldsForDeliveryPerson(deliveryPersonId)` para criar o campo de exibição.
     */
    if (!(typeof deliveryPersonId === 'number')) {
        deliveryPersonId = getCurrentDeliveryPersonCount()
        setCurrentDeliveryPersonCount(getCurrentDeliveryPersonCount() + 1)
        name = ''
    }

    if((getCurrentDeliveryPersonCount() - activeDeliveryPersons.length) > 3){
        console.warn('Limite de entregadores alcançado!')
        return
    }

    const section = document.getElementById('section-delivery-person')
    let div1, div2, input, label;

    div1 = document.createElement('div')
    div1.classList.add('flex-row-wrap', 'delivery-person-container', 'container-relative')

    for (let index = 0; index < 4; index++) {
        div2 = document.createElement('div')
        input = document.createElement('input')
        input.classList.add('float-input')
        label = document.createElement('label')
        label.classList.add('float-label')

        switch (index) {
            case 0:
                div2.classList.add('flex-item-delivery-person-name')
                input.setAttribute('autocomplete', 'on')
                input.setAttribute('type', 'text')
                input.setAttribute('id', `delivery-person-name-${deliveryPersonId}`)
                input.setAttribute('list', 'datalist-delivery-person')
                input.setAttribute('value', name)
                input.setAttribute('required', '')
                label.setAttribute('for', `delivery-person-name-${deliveryPersonId}`)
                label.textContent = 'Nome'
                break;
        
            case 1:
                div2.classList.add('flex-item-deliveries-amount')
                input.setAttribute('type', 'number')
                blockNonNumericKeys(input)
                input.setAttribute('id', `deliveries-${deliveryPersonId}`)
                input.setAttribute('min', '0')
                input.setAttribute('required', '')
                label.setAttribute('for', `deliveries-${deliveryPersonId}`)
                label.textContent = 'Entregas'
                break;
        
            case 2:
                div2.classList.add('flex-item-delivery-extra')
                input.setAttribute('type', 'number')
                blockNonNumericKeys(input)
                restrictInputRange(input)
                input.setAttribute('id', `extra-${deliveryPersonId}`)
                input.setAttribute('min', '0')
                input.setAttribute('required', '')
                label.setAttribute('for', `extra-${deliveryPersonId}`)
                label.textContent = 'Extra'
                break;
        
            case 3:
                div2.classList.add('flex-item-day-consumption')
                input.setAttribute('type', 'number')
                blockNonNumericKeys(input)
                input.setAttribute('id', `consumption-${deliveryPersonId}`)
                input.setAttribute('min', '0')
                input.setAttribute('required', '')
                label.setAttribute('for', `consumption-${deliveryPersonId}`)
                label.textContent = 'Consumo'
                break;
        
            default:
                console.warn('erro no switch case')
                break;
        }
        div2.appendChild(input)
        div2.appendChild(label)
        div1.appendChild(div2)
    }
    section.appendChild(div1)

    createDisplayFieldsForDeliveryPerson(deliveryPersonId)
}

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
                input.setAttribute('autocomplete', 'on')
                input.setAttribute('type', 'number')
                input.setAttribute('min', '0')
                input.addEventListener('input', (event) => validateInputLength(event, 6))
                blockNonNumericKeys(input)
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
                input.setAttribute('autocomplete', 'on')
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
     * - Cada funcionário extra é representado por um <div> com a classe 'extra-employee'.
     */
    const container = document.getElementById('section-extra-employee')
    const extraEmployeeCount = document.querySelectorAll('#section-extra-employee > div') // seleciona todos os campos ja criados para saber a quantidade de extras
    const extraEmployeeId = extraEmployeeCount.length + 1
    const spanAlert = document.createElement('span')
    const spanPopup = document.createElement('span')

    const div1 = document.createElement('div')
    div1.classList.add('flex-row-wrap', 'extra-employee')

    let div2, input, label

    
    div2 = document.createElement('div')
    div2.classList.add('flex-item-employee-name')
    input = document.createElement('input')
    input.setAttribute('autocomplete', 'on')
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
    input.setAttribute('autocomplete', 'on')
    input.setAttribute('id', `extra-employee-daily-payment-${extraEmployeeId}`)
    input.classList.add('float-input')
    input.setAttribute('type', 'number')
    input.setAttribute('min', '0')
    blockNonNumericKeys(input)
    input.setAttribute('name', `extra-employee-daily-payment-${extraEmployeeId}`)
    input.setAttribute('required', '')
    label = document.createElement('label')
    label.setAttribute('for', `extra-employee-daily-payment-${extraEmployeeId}`)
    label.classList.add('float-label')
    label.textContent = 'Diária'

    spanAlert.classList.add('input-alert', 'display-none')
    spanAlert.setAttribute('id', `span-alert-${extraEmployeeId}`)
    spanAlert.textContent = '!'
    spanAlert.addEventListener('mouseenter', handleMouseEvent);
    spanAlert.addEventListener('mouseleave', handleMouseEvent);
    
    spanPopup.textContent = 'Valor inesperado'
    spanPopup.setAttribute('id', `span-popup-${extraEmployeeId}`)
    spanPopup.classList.add('input-alert-popup', 'display-none')

    div2.append(input, label, spanAlert, spanPopup)
    div1.appendChild(div2)

    div2 = document.createElement('div')
    div2.classList.add('flex-item-pix-key')
    input = document.createElement('input')
    input.setAttribute('autocomplete', 'on')
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