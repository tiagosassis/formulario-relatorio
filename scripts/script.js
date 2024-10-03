document.addEventListener('DOMContentLoaded', ()=>{
    const currentDate = new Date()
    const h1 = document.querySelector('h1')
    const dateOfReport = document.getElementById('date-of-report')
    const weekDay = currentDate.getDay()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    const divDelivery = document.querySelectorAll('.delivery-person-container')
    
    if (currentDate.getHours() >= 5 && currentDate.getHours() <= 17) { // dia
        h1.innerText = 'Relatório Almoço ' + day + '/' + month
        dateOfReport.innerHTML = '*Almoço ' + day + '/' + month + '*<br>'
        divDelivery[0].classList.toggle('hidden') // caso seja de dia, os entregadores da noite não aparecem
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
            day--
            h1.innerText = 'Relatório Noite ' + day + '/' + month
            dateOfReport.innerHTML = '*Noite ' + day + '/' + month + '*<br>'
        }else{
            h1.innerText = 'Relatório Noite ' + day + '/' + month
            dateOfReport.innerHTML = '*Noite ' + day + '/' + month + '*<br>'
        }
    }
    
})

function ToggleExtraDeliveryPerson () { // função que torna visivel ou não o entregador extra
    const deliveryPersonExtra = document.getElementById('delivery-person-extra')
    const button = document.getElementById('add-delivery-person')

    if (deliveryPersonExtra.className.includes('hidden')) { // também muda a frase no botão para si adaptar a situação
        button.value = 'Remover Entregador'
    } else {
        button.value = 'Adicionar Entregador'
    }
    deliveryPersonExtra.classList.toggle('hidden')

}

function ClearInput(idInput) { // limpa o input para selecionar outro entregador
    let input = document.getElementById(idInput)
    input.value = ''
    setTimeout(() => {
        input.focus()
    }, 0)
}

function CopyContent() {
    const report = document.getElementById('report-content')
    
    SwitchDisplay()

    // Copia o conteúdo
    const reportContent = report.innerText;

    navigator.clipboard.writeText(reportContent).then(() => {
        showPopup(); // Função para exibir o popup
    }).catch((err) => {
        alert('Erro ao copiar: ' + err)
    })

    SwitchDisplay()
}

function SwitchDisplay() {
    const spans = report.querySelectorAll('span')
    
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

function UpdateReport(event) {
    const deliveryPersonId = event.target.id.match(/\d+/g)[0]
    
    PaymentCalculation(event, deliveryPersonId)


    document.querySelector(`#textField-delivery-person-name-${deliveryPersonId}`).innerHTML = document.querySelector(`#delivery-person-name-${deliveryPersonId}`).value + ':' // atualiza nome do entregador no relatorio

    if(event.target.id.includes('deliveries')){
        UpdateDeliveries(event, deliveryPersonId)

    } else if(event.target.id.includes('extra')){
        if (event.target.value){ // altera a quantidade de extra no relatorio
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ', ' + event.target.value + ' Extra'
            ExtraDeliveryRegister(deliveryPersonId)
        }
        else
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ''

    } else if(event.target.id.includes('consumption')){ 
        if (event.target.value) // altera o status de consumo no relatorio
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ', 1 Consumo'
        else
            document.querySelector(`#textField-${event.target.id}`).innerHTML = ''

    } else 
        console.log('erro no if/else dos include')

}

function ExtraDeliveryRegister(deliveryPersonId) {
    const container = document.getElementById('extra-delivery-register')
    let div2 = document.createElement('div')
    let div3, input, label

    div2.classList.add('flex-container')

    label = document.createElement('label')
    label.classList.add('flex-item-name')
    label.textContent = document.querySelector(`#delivery-person-name-${deliveryPersonId}`).value

    div2.appendChild(label)

    for (let j = 0; j < 2; j++) {
        div3 = document.createElement('div')
        if (j == 0) {
            div3.classList.add('flex-item-number')
            input = document.createElement('input')
            input.setAttribute('type', 'text')
            input.setAttribute('name', 'extra-delivery-number')
            input.setAttribute('id', 'extra-delivery-number')
            input.setAttribute('class', 'float-input')
            input.setAttribute('required', '')

            label = document.createElement('label')
            label.setAttribute('for', 'extra-delivery-number')
            label.classList.add('float-label')
            label.textContent = 'Número do pedido'

            div3.appendChild(input)
            div3.appendChild(label)
        }
        else{
            div3.classList.add('flex-item-reason')
            input = document.createElement('input')
            input.setAttribute('type', 'text')
            input.setAttribute('name', 'reason-extra-delivery')
            input.setAttribute('id', 'reason-extra-delivery')
            input.setAttribute('class', 'float-input')
            input.setAttribute('required', '')

            label = document.createElement('label')
            label.setAttribute('for', 'reason-extra-delivery')
            label.classList.add('float-label')
            label.textContent = 'Motivo'

            div3.appendChild(input)
            div3.appendChild(label)
        }

        div2.appendChild(div3)

    }

    container.appendChild(div2)

    /*
        <div class="flex-container">
            <label class="flex-item-name">Guilherme Vieira</label>
            <div class="flex-item-number">
                <input type="text" name="extra-delivery-number" id="extra-delivery-number" class="float-input" required>
                <label for="delivery-extra" class="float-label">Número do pedido</label>
            </div>
            <div class="flex-item-reason">
                <input type="text" name="reason-extra-delivery" id="reason-extra-delivery" class="float-input" required>
                <label for="delivery-extra" class="float-label">Motivo</label>
            </div>
        </div>
    */
    
}

function UpdateDeliveries(event, deliveryPersonId) {
    const containerOfDeliveryPerson = document.querySelector(`#delivery-person-report-${deliveryPersonId}`)
    // altera a quantidade de entregas no relatorio, caso não haja entregas para aquele entregador, a visibilidade dele no relatorio é alterar como display none
    document.querySelector(`#textField-${event.target.id}`).innerHTML = event.target.value + ' Entregas' 
    if (event.target.value == '' && !(containerOfDeliveryPerson.className.includes('hidden'))) 
        containerOfDeliveryPerson.classList.toggle('hidden')
    else if(containerOfDeliveryPerson.className.includes('hidden'))
        containerOfDeliveryPerson.classList.toggle('hidden')
}

function PaymentCalculation(event, deliveryPersonId) {
    const costAssistance = 10
    const deliveryFee = 6
    let deliveries, extra, consumption

    if (document.querySelector(`#deliveries-${deliveryPersonId}`).value == '') {
        deliveries = 0
    }
    else{
        deliveries = parseFloat(document.querySelector(`#deliveries-${deliveryPersonId}`).value)
    }

    if (document.querySelector(`#extra-${deliveryPersonId}`).value == '') {
        extra = 0
    }
    else {
        extra = parseFloat(document.querySelector(`#extra-${deliveryPersonId}`).value)
    }

    if (document.querySelector(`#consumption-${deliveryPersonId}`).value == '') {
        consumption = 0
    } else {
        consumption = parseFloat(document.querySelector(`#consumption-${deliveryPersonId}`).value)
    }

    const totalPayment = ((deliveries + extra) * deliveryFee) + costAssistance - consumption;
    document.querySelector(`#textField-payment-${deliveryPersonId}`).textContent = `R$ ${totalPayment.toFixed(2)}`;

    /*
        cada entrega vale 6,00 reais, tem uma ajuda de custo de 10,00 reais e o consumo é descontado do valor final
        (((entregas + entregas extras) x 6) + 10) - consumo
    */
}
