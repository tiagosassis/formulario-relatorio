document.addEventListener('DOMContentLoaded', configDeliveryPerson)
document.getElementById('section-delivery-person').addEventListener('input', updateReport)
document.getElementById('section-extra-delivery').addEventListener('input', updateReportExtraDeliveries)
document.getElementById('copy-button').addEventListener('click', copyContent)
document.getElementById('add-extra').addEventListener('click', createDeliveryPerson)
document.getElementById('remove-extra').addEventListener('click', removeExtraEmployee)

function configDeliveryPerson() {
    const currentDate = new Date()
    const weekDay = currentDate.getDay()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    const h1 = document.querySelector('h1')
    const dateOfReport = document.getElementById('date-of-report')
    const divDelivery = document.querySelectorAll('.delivery-person-container')
    
    if (currentDate.getHours() >= 5 && currentDate.getHours() <= 17) { // dia
        h1.innerText = 'Relatório Almoço ' + day + '/' + month
        dateOfReport.innerHTML = '*Almoço ' + day + '/' + month + '*<br>'
        divDelivery[0].classList.toggle('hidden') // caso seja horário do almoço, os entregadores da noite não aparecem
        divDelivery[1].classList.toggle('hidden')
        divDelivery[2].classList.toggle('hidden')
        switch (weekDay) { // define qual entregador estara de folga
            case 1:
                divDelivery[4].classList.toggle('hidden')
                break;
        
            case 2:
                divDelivery[3].classList.toggle('hidden')
                break;
        }
        return
    } else{ // noite
        divDelivery[3].classList.toggle('hidden') // desaparece com o entregador do dia
        switch (weekDay) { // define qual entregador estara de folga
            case 1:
                divDelivery[4].classList.toggle('hidden')
                break;
        
            case 2:
                divDelivery[1].classList.toggle('hidden')
                break;
        
            case 3:
                divDelivery[0].classList.toggle('hidden')
                break;
        
            case 4:
                divDelivery[2].classList.toggle('hidden')
                break;
        }
        if(currentDate.getHours() >= 0 && currentDate.getHours() <= 4){
            h1.innerText = 'Relatório Noite ' + (day - 1) + '/' + month
            dateOfReport.innerHTML = '*Noite ' + (day - 1) + '/' + month + '*<br>'
        }else{
            h1.innerText = 'Relatório Noite ' + day + '/' + month
            dateOfReport.innerHTML = '*Noite ' + day + '/' + month + '*<br>'
        }
    }
}

function addDeliveryPerson() {
    
}

function createDeliveryPerson(deliveryPersonId, name) {
    const section = document.getElementById('section-delivery-person')
    let div1, div2, input, label;

    div1 = document.createElement('div')
    div1.classList.add('flex-row-wrap', 'delivery-person-container')

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

    /*
        <div class="flex-row-wrap delivery-person-container">
            <div class="flex-item-delivery-person-name">
                <input class="float-input" type="text" id="delivery-person-name-5" list="datalist-delivery-person" value="Keven" required>
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

function toggleExtraDeliveryPerson () { // função que torna visivel ou não o entregador extra
    const deliveryPersonExtra = document.getElementById('delivery-person-extra')
    const button = document.getElementById('add-delivery-person')

    if (deliveryPersonExtra.classList.contains('hidden')) { // também muda a frase no botão para si adaptar a situação
        button.value = 'Remover Entregador'
    } else {
        button.value = 'Adicionar Entregador'
    }
    deliveryPersonExtra.classList.toggle('hidden')

}

function copyContent() { // copia o relatorio pronto
    const report = document.getElementById('report-content')
    
    switchDisplay()

    // Copia o conteúdo
    const reportContent = report.innerText;

    navigator.clipboard.writeText(reportContent).then(() => {
        showPopup(); // Função para exibir o popup
    }).catch((err) => {
        alert('Erro ao copiar: ' + err)
    })

    switchDisplay()
}

function switchDisplay() {
    const spans = document.querySelectorAll('span')
    
    // Muda o display para contents para mudar a disposição dos caracteres e o texto copiado ficar mais organizado
    spans.forEach(span => {
        span.classList.toggle('content')
    })
}


function showPopup() { // Função para mostrar o popup e escondê-lo depois de 3 segundos
    const popup = document.getElementById('popup')
    popup.classList.add('show')
    
    setTimeout(() => {
        popup.classList.remove('show')
    }, 3000); // O popup desaparece após 3 segundos
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
            toggleClassHidden(sectionExtraDelivery, true)
        }
        else {
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ''
            ExtraDeliveryRegister(deliveryPersonId, 0)
            updateReportTextField(deliveryPersonId, 0)
            toggleClassHidden(sectionExtraDelivery, false)
        }

    } else if(event.target.id.includes('consumption')){ 
        if (event.target.value) // altera o status de consumo no relatorio
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ', 1 Consumo'
        else
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ''
    }
}

function updateName(deliveryPersonId) { // a classe class-update-name-${deliveryPersonId} serve para que o nome do entregador seja atualizo em todos os lugares da pagina ao mesmo tempo
    const newName = document.querySelectorAll(`.class-update-name-${deliveryPersonId}`)
    newName.forEach(element =>{
        element.innerHTML = document.querySelector(`#delivery-person-name-${deliveryPersonId}`).value
    })
}

function toggleClassHidden(element, toggle) { // alterna a classe hidden em elementos html
    if(toggle){
        if(element.classList.contains('hidden'))
            element.classList.remove('hidden')
    } else{
        if(!element.classList.contains('hidden'))
            element.classList.add('hidden')
    }
}

function updateReportExtraDeliveries(event) {
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
                label.textContent = 'Número do pedido'

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

function addExtraEmployee() {
    
}

function removeExtraEmployee() {
    
}

function updateDeliveries(event, deliveryPersonId) {
    // essa função altera a quantidade de entregas no relatorio, caso não haja entregas para aquele entregador, a visibilidade dele no relatorio é alterar como display none
    document.querySelector(`#textField-${event.target.id}`).innerHTML = event.target.value + ' Entregas' 
    if (event.target.value) 
        toggleClassHidden(document.querySelector(`#delivery-person-report-${deliveryPersonId}`), true)
    else 
        toggleClassHidden(document.querySelector(`#delivery-person-report-${deliveryPersonId}`), false)
}

function paymentCalculation(deliveryPersonId) {
    const currentDate = new Date()
    const deliveryFee = 6
    let costAssistance = 10
    let deliveries, extra, consumption
    
    if (currentDate.getDay() === 0 || currentDate.getDay() === 5 || currentDate.getDay() === 6) // sexta, sabado e domingo a ajuda de custo é R$ 20,00
        costAssistance = 20

    if (document.querySelector(`#deliveries-${deliveryPersonId}`).value == '') 
        deliveries = 0
    else
        deliveries = parseFloat(document.querySelector(`#deliveries-${deliveryPersonId}`).value)

    if (document.querySelector(`#extra-${deliveryPersonId}`).value == '') 
        extra = 0
    else 
        extra = parseFloat(document.querySelector(`#extra-${deliveryPersonId}`).value)

    if (document.querySelector(`#consumption-${deliveryPersonId}`).value == '') 
        consumption = 0
    else 
        consumption = parseFloat(document.querySelector(`#consumption-${deliveryPersonId}`).value.replace(',', '.'))

    let totalPayment = ((deliveries + extra) * deliveryFee) + costAssistance - consumption
    document.querySelector(`#textField-payment-${deliveryPersonId}`).textContent = `R$ ${totalPayment.toFixed(2).replace('.', ',')}`

    /*
        essa função calcula o pagamento conforme a quantidade de entregas e extras de cada entregador e coloca o resultado já no relatorio para ser copiado
        cada entrega vale 6,00 reais, tem uma ajuda de custo de 10,00 reais de segunda a quinta e 20,00 de sexta a domingo e o consumo é descontado do valor final
        (((entregas + entregas extras) x 6) + 10) - consumo
    */
}
