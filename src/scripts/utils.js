import { activeDeliveryPersons } from "./app.js"

export function createDateTimeInfo(){
    /**
     * Gera um objeto com a data e hora atuais, incluindo o turno do dia e o dia da semana.
     * Ajusta a data se a hora for entre 00:00 e 05:00, e determina se o turno é "Morning" ou "Night".
     * 
     * @returns {Object} Objeto contendo `currentHour`, `turn`, `weekDay`, `day`, e `month`.
     */

    const now = new Date()
    if (now.getHours() < 5)
        now.setDate(now.getDate() - 1) // Ajusta para o dia anterior caso a hora esteja entre meia noite e 5 da madrugada

    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    let dayShift, weekDay

    if(now.getHours() >= 5 && now.getHours() < 17) // define o turno
        dayShift = 'Morning'
    else
        dayShift = 'Night'

    switch (now.getDay()) { // organiza o dia da semana
        case 1:
            weekDay = 'Monday'
            break;

        case 2:
            weekDay = 'Tuesday'
            break;

        case 3:
            weekDay = 'Wednesday'
            break;

        case 4:
            weekDay = 'Thursday'
            break;

        case 5:
            weekDay = 'Friday'
            break;

        case 6:
            weekDay = 'Saturday'
            break;

        case 0:
            weekDay = 'Sunday'
            break;
    
        default:
            break;
    }

    let time = { // cria um objeto contendo hora, turno, dia, dia da semana, dia do mês e mês
        currentHour: now.getHours(),
        turn: dayShift,
        weekDay: weekDay,
        day: day,
        month: month
    }
    return time
}

export function toggleClassHidden(element, toggle) {
    /**
     * Alterna a classe display-none em elementos html, está classe da aos elementos o display none
     */
    if(toggle){
        if(element.classList.contains('display-none'))
            element.classList.remove('display-none')
    } else{
        if(!element.classList.contains('display-none'))
            element.classList.add('display-none')
    }
}

export function deliveryPersonDatalist() { // cria a datalist de entregador e coloca no html do relatorio
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

export function blockNonNumericKeys(input) { // bloqueia o uso desses caracteres em input type number
    input.addEventListener('keydown', (event) => {
        if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-') {
            event.preventDefault()
        }
    })
}

export function restrictInputRange(input) { // limita o valor em input type number
    input.addEventListener('input', (event) => {
        if (event.target.value >= 10) {
            event.target.value = 10
        }
    })
}

export function handleMouseEvent(event) { // monstra popup avisando que o valor é inesperado para pagamento caso passo o mouse no indicador
    const extraEmployeeId = event.target.id.match(/\d+/g)
    const spanPopup = document.getElementById(`span-popup-${extraEmployeeId}`)
    if (event.type === 'mouseenter') {
        spanPopup.classList.remove('display-none')
    } else if (event.type === 'mouseleave') {
        spanPopup.classList.add('display-none')
    }
}

export function showWarningForHighValue(value, extraEmployeeId) { // mostra indicador de que o valor é inesperado para pagamento
    if (value > 100) {
        document.getElementById(`span-alert-${extraEmployeeId}`).classList.remove('display-none')
    } else {
        document.getElementById(`span-alert-${extraEmployeeId}`).classList.add('display-none')
    }
}

export function validateInputLength(event, maxLength){
    if (event.target.value.length > maxLength) {
        event.target.value = event.target.value.slice(0, maxLength) // Limita a entrada a 6 caracteres
    }
}