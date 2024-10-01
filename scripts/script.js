document.addEventListener('DOMContentLoaded', ()=>{
    const currentDate = new Date()
    const h1 = document.querySelector('h1')
    let dateOfReport = document.querySelector('#date-of-report')
    let weekDay = currentDate.getDay()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let divDelivery = document.querySelectorAll('.delivery-person-container')
    
    if (currentDate.getHours() >= 5 && currentDate.getHours() <= 17) { // dia
        h1.innerText = 'Almoço ' + day + '/' + month
        dateOfReport.innerHTML = '*Almoço ' + day + '/' + month + '*<br>'
        divDelivery[0].style.display = 'none'; // caso seja de dia, os entregadores da noite não aparecem
        divDelivery[1].style.display = 'none';
        divDelivery[2].style.display = 'none';
        return
    } else{ // noite
        divDelivery[3].style.display = 'none'; // desaparece com o entregador do dia
        switch (weekDay) { // define qual entregador estara de folga
            case 1:
                divDelivery[4].style.display = 'none';
                break;
        
            case 2:
                divDelivery[1].style.display = 'none';
                break;
        
            case 3:
                divDelivery[0].style.display = 'none';
                break;
        
            case 4:
                divDelivery[2].style.display = 'none';
                break;
        }
        if(currentDate.getHours() >= 0 && currentDate.getHours() <= 4){
            day--
            h1.innerText = 'Noite ' + day + '/' + month
            dateOfReport.innerHTML = '*Noite ' + day + '/' + month + '*<br>'
        }else{
            h1.innerText = 'Noite ' + day + '/' + month
            dateOfReport.innerHTML = '*Noite ' + day + '/' + month + '*<br>'
        }
    }
    
})

function AddDeliveryPerson() { // função que torna visivel ou não o entregador extra
    const deliveryPersonExtra = document.querySelector('#delivery-person-extra')
    const button = document.querySelector('#add-delivery-person')

    if (deliveryPersonExtra.style.display == 'flex') {
        button.value = 'Adicionar entregador'
        deliveryPersonExtra.style.display = 'none'
    } else {
        button.value = 'Remover entregador'
        deliveryPersonExtra.style.display = 'flex'
    }

}

function ClearInput(idInput) { // limpa o input para selecionar outro entregador
    let input = document.getElementById(idInput)
    input.value = ''
    setTimeout(() => {
        input.focus();
    }, 0)
}

function CopyContent() {
    const report = document.getElementById('report-content');
    const spans = report.querySelectorAll('span');
    
    // Muda o display para contents antes de copiar
    spans.forEach(span => {
        span.style.display = 'contents';
    });

    // Copia o conteúdo
    const reportContent = report.innerText;

    navigator.clipboard.writeText(reportContent).then(() => {
        showPopup(); // Função para exibir o popup
    }).catch((err) => {
        alert('Erro ao copiar: ' + err);
    });

    // Reverta o display para block após a cópia
    spans.forEach(span => {
        span.style.display = 'block';
    });
}


function showPopup() { // Função para mostrar o popup e escondê-lo depois de 3 segundos
    const popup = document.getElementById('popup');
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // O popup desaparece após 3 segundos
}

function UpdateReport(event) {
    const deliveryPersonId = event.target.id.match(/\d+/g)[0]

    PaymentCalculation(event, deliveryPersonId)


    document.querySelector(`#p-delivery-person-name-${deliveryPersonId}`).innerHTML = document.querySelector(`#delivery-person-name-${deliveryPersonId}`).value + ':' // altera nome do entregador no relatorio

    if(event.target.id.includes('deliveries')){
        document.querySelector(`#p-${event.target.id}`).innerHTML = event.target.value + ' Entregas' // altera a quantidade de entregas no relatorio
        if (event.target.value == 0 || event.target.value == '') {
            document.querySelector(`#delivery-person-report-${deliveryPersonId}`).style.display = 'none'
        } else {
            document.querySelector(`#delivery-person-report-${deliveryPersonId}`).style.display = 'flex'
        }

    } else if(event.target.id.includes('extra')){
        if (event.target.value) // altera o status de consumo no relatorio
            document.querySelector(`#p-${event.target.id}`).innerHTML = ', ' + event.target.value + ' Extra' // altera a quantidade de entregas extras no relatorio
        else
            document.querySelector(`#p-${event.target.id}`).innerHTML = ''
        

    } else if(event.target.id.includes('consumption')){ 
        if (event.target.value) // altera o status de consumo no relatorio
            document.querySelector(`#p-${event.target.id}`).innerHTML = ', 1 Consumo'
        else
            document.querySelector(`#p-${event.target.id}`).innerHTML = ''
    } else 
        console.log('erro no if/else dos include')

    

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

    document.querySelector(`#p-payment-${deliveryPersonId}`).innerHTML = 'R$ ' + eval((((deliveries + extra) * deliveryFee) + costAssistance) - consumption)

    /*
        cada entrega vale 6,00 reais, tem uma ajuda de custo de 10,00 reais e o consumo é descontado do valor final
        (((entregas + entregas extras) x 6) + 10) - consumo
    */
}
