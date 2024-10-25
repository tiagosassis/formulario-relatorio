import { darkMode, detectUserTheme } from "./theme.js"
import { copyContent } from "./clipboard.js"
import { createDateTimeInfo, toggleClassHidden } from "./utils.js"
import { paymentCalculation } from "./payment.js"
import { addExtraEmployee } from "./formFields.js"
import { updateReportExtraEmployee, removeExtraEmployee } from "./formDataHandler.js"
import { createTextField } from "./displayFields.js"

document.addEventListener('DOMContentLoaded', () =>{
    configDeliveryPerson()
    detectUserTheme()
})
document.getElementById('section-delivery-person').addEventListener('input', updateReport)
document.getElementById('section-extra-delivery').addEventListener('input', updateReportExtraDeliveries)
document.getElementById('copy-button').addEventListener('click', copyContent)
document.getElementById('add-delivery-person-button').addEventListener('click', createDeliveryPerson)
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

function configDeliveryPerson() {
    
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
            // pega o array de objetos global contendo as informações dos entregadores que já trabalham com o estabelecimento, se o entregador não está de folga e ele trabalha naquele turno, seu input será criado e inserido no DOM
            createDeliveryPerson(index, person.name)
        }
    })

    addExtraEmployee() // cria o input para o primeiro diarista, mais serão adicionados conforme necessário
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

function createDeliveryPerson(deliveryPersonId, name) {
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
                input.setAttribute('type', 'text')
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

    /*
        <div class="flex-row-wrap delivery-person-container container-relative">
            <div class="flex-item-delivery-person-name">
                <input class="float-input" type="text" id="delivery-person-name-5" list="datalist-delivery-person" value="" required>
                <label class="float-label" for="delivery-person-name-5">Nome</label>
            </div>
            <div class="flex-item-deliveries-amount">
                <input class="float-input" type="number" id="deliveries-5" required>
                <label class="float-label" for="deliveries-5">Entregas</label>
            </div>
            <div class="flex-item-delivery-extra">
                <input class="float-input" type="number" id="extra-5" required>
                <label class="float-label" for="extra-5">Extra</label>
            </div>
            <div class="flex-item-day-consumption">
                <input class="float-input" type="text" id="consumption-5" required>
                <label class="float-label" for="consumption-5">Consumo</label>
            </div>
        </div>
    */
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

function updateName(deliveryPersonId) { // a classe class-update-name-${deliveryPersonId} serve para que o nome do entregador seja atualizado em todos os lugares da pagina ao mesmo tempo
    const newName = document.querySelectorAll(`.class-update-name-${deliveryPersonId}`)
    newName.forEach(element =>{
        element.innerHTML = document.querySelector(`#delivery-person-name-${deliveryPersonId}`).value
    })
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
            createReportTextField(deliveryPersonId, currentRegister, div)
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

        createReportTextField(deliveryPersonId, numberOfExtra, div)

        container.appendChild(div)
    }
}

function createReportTextField(deliveryPersonId, numberOfExtra, div) {
    // aqui estão sendo criados os spans onde serão adicionados nome do entregador, numero da entrega e motivo de extra para serem exibidos no relatorio e copiados
    // a classe class-update-name-${deliveryPersonId} serve para que o nome do entregador seja atualiza em todos os lugares da pagina ao mesmo tempo pela função updateName()
    for (let i = 0; i < numberOfExtra; i++) {
        let div2 = document.createElement('div')
        div2.classList.add(`register-content-${deliveryPersonId}`)
        div2.textContent = '- '
        let name = document.createElement('span')
        name.setAttribute('id', `report-extra-delivery-name-${deliveryPersonId}-${i}`)
        name.classList.add(`class-update-name-${deliveryPersonId}`)
        name.textContent = document.querySelector(`#delivery-person-name-${deliveryPersonId}`).value
        let number = document.createElement('span')
        number.setAttribute('id', `report-extra-delivery-number-${deliveryPersonId}-${i}`)
        let reason = document.createElement('span')
        reason.setAttribute('id', `report-extra-delivery-reason-${deliveryPersonId}-${i}`)

        div2.append(name, number, reason)
        div.appendChild(div2)
    }
}

function reportFreelancer(params) {
    
}

function ExtraDeliveryRegister(deliveryPersonId, numberOfExtra) {
    const container = document.getElementById('section-extra-delivery')
    let div = document.getElementById(`div-delivery-person-${deliveryPersonId}`)

    if (div) { // verifica se a div onde as entregas extras vão ficar já existe, se existe então manipula para adicionar ou remover os campos conforme necessário
        let register = document.querySelectorAll(`.register-${deliveryPersonId}`)
        let currentRegister = numberOfExtra - register.length
        if (currentRegister > 0) { // caso o novo numero de entregas extras seja maior que o anterior, novos inputs são criados
            createExtraDeliveryRegister(div, currentRegister, deliveryPersonId)
        } else if(currentRegister < 0){ // caso um novo numero de entregas extras seja menor que o anterior, as ultimas linhas de input serão removidas do DOM
            for (let i = register.length; currentRegister !== 0; i--) {
                if (register[i - 1]) {
                    register[i - 1].remove()
                }
                currentRegister++
            }
        } else { // se ja tinha uma quantidade x de entregas extras e o numero no input foi substituido pelo mesmo numero, nada acontece
            return
        }

    } else { // caso a div onde as entregas extras vão ficar não existe, ela será criada e os input que ficarão dentro dela também
        div = document.createElement('div')
        div.classList.add('flex-column-wrap', `order-${deliveryPersonId}`)
        div.setAttribute('id', `div-delivery-person-${deliveryPersonId}`)

        createExtraDeliveryRegister(div, numberOfExtra, deliveryPersonId)

        container.appendChild(div)
    }
}

function createExtraDeliveryRegister(div1, numberOfExtra, deliveryPersonId) {
    // Essa função cria a linha onde é colocado o nome do entregador, o número do pedido e o motivo daquela entrega ser uma extra para aquele entregador
    let div2, div3, input, label
    for (let i = 0; i < numberOfExtra; i++) {
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

function updateDeliveries(event, deliveryPersonId) {
    // essa função altera a quantidade de entregas no relatorio, caso não haja entregas para aquele entregador, a visibilidade dele no relatorio é alterar como display none
    document.querySelector(`#textField-${event.target.id}`).innerHTML = event.target.value + ' Entregas' 
    if (event.target.value) 
        toggleClassHidden(document.querySelector(`#delivery-person-report-${deliveryPersonId}`), true)
    else 
        toggleClassHidden(document.querySelector(`#delivery-person-report-${deliveryPersonId}`), false)
}