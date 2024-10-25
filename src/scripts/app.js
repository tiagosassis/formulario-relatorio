import { darkMode, detectUserTheme } from "./theme.js"
import { copyContent } from "./clipboard.js"
import { createDateTimeInfo, toggleClassHidden } from "./utils.js"
import { paymentCalculation } from "./payment.js"
import { addExtraEmployee } from "./formFields.js"
import { updateReportExtraEmployee, removeExtraEmployee, updateDeliveries, updateName, ExtraDeliveryRegister } from "./formDataHandler.js"
import { createTextField, createDisplayFieldsForExtraDelivery } from "./displayFields.js";

document.addEventListener('DOMContentLoaded', () =>{
    configDeliveryPerson()
    detectUserTheme()
})
document.getElementById('section-delivery-person').addEventListener('input', updateReport)
document.getElementById('section-extra-delivery').addEventListener('input', updateReportExtraDeliveries)
document.getElementById('copy-button').addEventListener('click', copyContent)
document.getElementById('add-delivery-person-button').addEventListener('click', createInputFieldsForDeliveryPerson)
document.getElementById('theme').addEventListener('click', darkMode)
document.getElementById('add-extra-employee').addEventListener('click', addExtraEmployee)
document.getElementById('remove-extra-employee').addEventListener('click', removeExtraEmployee)
document.getElementById('section-extra-employee').addEventListener('input', updateReportExtraEmployee)

const activeDeliveryPersons = [
    {name: 'Byane', turn: ['Night'], dayOff: 'Wednesday'},
    {name: 'Guilherme Vieira', turn: ['Night'], dayOff: 'Tuesday'},
    {name: 'Kaio', turn: ['Night'], dayOff: 'Thursday'},
    {name: 'Keven', turn: ['Morning', 'Night'], dayOff: 'Monday'},
    {name: 'João Pedro', turn: ['Morning'], dayOff: ''}
]

let currentDeliveryPersonCount = activeDeliveryPersons.length

function createInputFieldsForDeliveryPerson(deliveryPersonId, name) {
    /**
     * Cria uma estrutura de entrada de dados para o entregador e a adiciona na seção "section-delivery-person" com campos para nome, quantidade de entregas, valor extra, e consumo diário. 
     * 
     * @param {number} deliveryPersonId - O identificador numérico do entregador.
     * @param {string} name - O nome do entregador (opcional).
     * 
     * Estrutura HTML resultante:
     * <div class="flex-row-wrap delivery-person-container container-relative">
     *     <div class="flex-item-delivery-person-name">
     *         <input class="float-input" type="text" id="delivery-person-name-5" list="datalist-delivery-person" value="" required>
     *         <label class="float-label" for="delivery-person-name-5">Nome</label>
     *     </div>
     *     <div class="flex-item-deliveries-amount">
     *         <input class="float-input" type="number" id="deliveries-5" required>
     *         <label class="float-label" for="deliveries-5">Entregas</label>
     *     </div>
     *     <div class="flex-item-delivery-extra">
     *         <input class="float-input" type="number" id="extra-5" required>
     *         <label class="float-label" for="extra-5">Extra</label>
     *     </div>
     *     <div class="flex-item-day-consumption">
     *         <input class="float-input" type="number" id="consumption-5" required>
     *         <label class="float-label" for="consumption-5">Consumo</label>
     *     </div>
     * </div>
     * 
     * Dependências:
     * - Requer a função `createTextField(deliveryPersonId)` para criar o campo de exibição correspondente aos dados do entregador.
     * 
     * Observações:
     * - Caso o deliveryPersonId não seja um número, a função o define automaticamente com base na quantidade de entregadores atual e inicializa o nome como uma string vazia.
     * - Cada `div` e `input` é configurado de acordo com o índice do switch, que ajusta atributos e classes específicos para os campos.
     */
    if (!(typeof deliveryPersonId === 'number')) {
        deliveryPersonId = currentDeliveryPersonCount
        currentDeliveryPersonCount++
        name = ''
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
                input.setAttribute('id', `deliveries-${deliveryPersonId}`)
                input.setAttribute('required', '')
                label.setAttribute('for', `deliveries-${deliveryPersonId}`)
                label.textContent = 'Entregas'
                break;
        
            case 2:
                div2.classList.add('flex-item-delivery-extra')
                input.setAttribute('type', 'number')
                input.setAttribute('id', `extra-${deliveryPersonId}`)
                input.setAttribute('required', '')
                label.setAttribute('for', `extra-${deliveryPersonId}`)
                label.textContent = 'Extra'
                break;
        
            case 3:
                div2.classList.add('flex-item-day-consumption')
                input.setAttribute('type', 'number')
                input.setAttribute('id', `consumption-${deliveryPersonId}`)
                input.setAttribute('required', '')
                label.setAttribute('for', `consumption-${deliveryPersonId}`)
                label.textContent = 'Consumo'
                break;
        
            default:
                console.log('erro no switch case')
                break;
        }
        div2.appendChild(input)
        div2.appendChild(label)
        div1.appendChild(div2)
    }
    section.appendChild(div1)

    createTextField(deliveryPersonId)
}

function configDeliveryPerson() {
    /**
     * Configura o relatório de entregadores para o turno atual (Almoço ou Noite).
     *
     * - Atualiza o título e a data do relatório.
     * - Cria campos de entrada para entregadores ativos conforme o turno.
     * - Adiciona campo para o primeiro funcionário diarista.
     * 
     * Dependências: createDateTimeInfo(), deliveryPersonDatalist(), createInputFieldsForDeliveryPerson(), addExtraEmployee()
     * 
     * @global activeDeliveryPersons Array contendo informações dos entregadores.
     */
    
    const time = createDateTimeInfo()

    const h1 = document.querySelector('h1')
    const dateOfReport = document.getElementById('date-of-report')
    const divDelivery = document.querySelectorAll('.delivery-person-container')

    deliveryPersonDatalist() // cria a datalist de entregador e coloca no html do relatorio
    
    if (time.turn === 'Morning') { // dia
        h1.innerText = `Relatório Almoço ${time.day} / ${time.month}`
        dateOfReport.innerHTML = '*Almoço ' + time.day + '/' + time.month + '*<br>'

    } else if(time.turn === 'Night'){ // noite
        h1.innerText = `Relatório Noite ${time.day} / ${time.month}`
        dateOfReport.innerHTML = `*Noite ${time.day} / ${time.month}*<br>`

    } else {
        console.log('erro na função configDeliveryPerson()')
    }

    activeDeliveryPersons.forEach((person, index) =>{
        if (!(person.dayOff == time.weekDay) && (person.turn[0] == time.turn || person.turn[1] == time.turn)) {
            createInputFieldsForDeliveryPerson(index, person.name)
        }
    })
    addExtraEmployee()
}

function deliveryPersonDatalist() { // cria a datalist de entregador e coloca no html do relatorio
    const container = document.getElementById('section-delivery-person')
    const datalist = document.createElement('datalist')
    datalist.setAttribute('id', 'datalist-delivery-person')

    activeDeliveryPersons.forEach(person => {
        const option = document.createElement('option')
        option.setAttribute('value', person.name)
        option.textContent = person.name
        datalist.appendChild(option)
    })
    container.insertBefore(datalist, container.firstChild)
}

function updateReport(event) {
    /* função que atualiza o relatorio final com as informações que estão sendo inseridas, como a função capta informações de vários input, eles tem que ser separados pelo ID
    dessa forma temos um if/else que separa delivery, extra e consumo
    o nome é atualizado de forma automatica e o pagamento é calculado pela função paymentCalculation
    oque diferencia cada entrega é deliveryPersonId
    */
    const deliveryPersonId = event.target.id.match(/\d+/g)[0]
    const sectionExtraDelivery = document.getElementById('report-extra-delivery')
    
    paymentCalculation(deliveryPersonId) // calcula o pagamento do entregador(a) com base nas entregas, entregas extras e consumo
    updateName(deliveryPersonId)
    

    if(event.target.id.includes('deliveries')){
        updateDeliveries(event, deliveryPersonId)

    } else if(event.target.id.includes('extra')){
        if (event.target.value){ // altera a quantidade de extra no relatorio
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ', ' + event.target.value + ' Extra'
            ExtraDeliveryRegister(deliveryPersonId, event.target.value)
            updateReportTextField(deliveryPersonId, event.target.value)
        }
        else {
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ''
            ExtraDeliveryRegister(deliveryPersonId, 0)
            updateReportTextField(deliveryPersonId, 0)
        }
        
        document.querySelectorAll('.flex-container-extra').length < 1 // caso haja entregas extras a parte do relatorio fica visivel, se não, ficava com display none
            ? toggleClassHidden(sectionExtraDelivery, false)
            : toggleClassHidden(sectionExtraDelivery, true)

    } else if(event.target.id.includes('consumption')){ 
        if (event.target.value) // altera o status de consumo no relatorio
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ', 1 Consumo'
        else
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ''
    }
}

function updateReportExtraDeliveries(event) {
    const [deliveryPersonId, extraDeliveryIndex] = event.target.id.match(/\d+/g); // pega o número identificador do entregador e pega o número do input que foi usado
    const teste = document.querySelectorAll('#report-extra-delivery > div')
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
        console.log('um erro detectado na função updateReportExtraDeliveries')
    }
}

function updateReportTextField(deliveryPersonId, numberOfExtra) {
    const container = document.getElementById('report-extra-delivery')
    let div = document.getElementById(`div-report-extra-delivery-${deliveryPersonId}`)

    if (div) {
        let register = document.querySelectorAll(`.register-content-${deliveryPersonId}`)
        let currentRegister = numberOfExtra - register.length
        if (currentRegister > 0) {
            createDisplayFieldsForExtraDelivery(deliveryPersonId, currentRegister, div)
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
        div.setAttribute('id', `div-report-extra-delivery-${deliveryPersonId}`)

        createDisplayFieldsForExtraDelivery(deliveryPersonId, numberOfExtra, div)

        container.appendChild(div)
    }
}