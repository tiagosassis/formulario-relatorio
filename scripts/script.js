const currentDate = new Date()
const deliveryPersonExtra = document.querySelector('#delivery-person-extra')

let dateOfReport = document.querySelector('#date-of-report')

document.addEventListener('DOMContentLoaded', ()=>{
    const legend = document.querySelector('legend')
    let weekDay = currentDate.getDay()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let divDelivery = document.querySelectorAll('.delivery-person-container')
    
    if (currentDate.getHours() >= 5 && currentDate.getHours() <= 17) { // dia
        legend.innerText = 'Almoço ' + day + '/' + month
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
            legend.innerText = 'Noite ' + day + '/' + month
            dateOfReport.innerHTML = '*Noite ' + day + '/' + month + '*<br>'
        }else{
            legend.innerText = 'Noite ' + day + '/' + month
            dateOfReport.innerHTML = '*Noite ' + day + '/' + month + '*<br>'
        }
    }
    
})

function AddDeliveryPerson() { // função que torna visivel ou não o entregador extra
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

document.querySelector('.copy-button').addEventListener('click', function() {
    const report = document.getElementById('report');
    const reportContent = report.innerText || report.textContent;

    navigator.clipboard.writeText(reportContent).then(() => {
        showPopup();  // Função para exibir o popup
    }).catch((err) => {
        alert('Erro ao copiar: ' + err);
    });
});


function showPopup() { // Função para mostrar o popup e escondê-lo depois de 3 segundos
    const popup = document.getElementById('popup');
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000); // O popup desaparece após 3 segundos
}

function UpdateReport(event) {
    let payment = document.querySelector('#p-payment-1')
    let inputInfoType, data
    let deliveryPersonId = event.target.id.match(/\d+/g)[0]

    console.log(event)
    console.log(event.target.value)
    console.log(event.target.id)


    if (event.target.id.includes('name')) {
        document.querySelector(`#p-${event.target.id}`).innerHTML = event.target.value // altera nome do entregador no relatorio

    } else if(event.target.id.includes('deliveries')){
        document.querySelector(`#p-${event.target.id}`).innerHTML = event.target.value + ' Entregas' // altera a quantidade de entregas no relatorio

    } else if(event.target.id.includes('extra')){
        document.querySelector(`#p-${event.target.id}`).innerHTML = event.target.value + ' Extra'// altera a quantidade de entregas extras no relatorio

    } else if(event.target.id.includes('consumption')){ 
        if (event.target.value) // altera o status de consumo no relatorio
            document.querySelector(`#p-${event.target.id}`).innerHTML = '1 Consumo'
        else
            document.querySelector(`#p-${event.target.id}`).innerHTML = ''

    } else {
        // criar pagamento
        console.log('erro no ifelse dos include')
    }


    switch (deliveryPersonId) {
        case '1':
            

            break;

        case '2':
        
            break;

        case '3':
        
            break;

        case '4':
        
            break;

        case '5':
        
            break;

        case '6':
        
            break;
    
        default:
            console.log('Erro no switch')
            break;
    }

}

// function AddDeliveryPerson() {
//     const container = document.getElementById('delivery-persons-container')
//     const newHr = document.createElement('hr')
//     const button = document.getElementById('add-delivery-person')
//     let newDiv, newFieldset, newLabel, newInput, deliveryPersonId

//     newDiv = document.createElement('div')
//     newDiv.className = 'delivery-person-container'

//     for (let index = 0; index < 4; index++) {

//         switch (index) {
//             case 0:
//                 deliveryPersonId = 'delivery-person-name-' + Date.now() + index
//                 newLabel = document.createElement('label')
//                 newLabel.textContent = 'Nome'
//                 newLabel.setAttribute('for', deliveryPersonId)

//                 newInput = document.createElement('input')
//                 newInput.id = deliveryPersonId
//                 newInput.type = 'text'
//                 newInput.setAttribute('list', 'datalist-delivery-person')
//                 newInput.onfocus = function(){
//                     ClearInput(deliveryPersonId)
//                 }
//                 newInput.value = ''
//                 newInput.placeholder = 'Entregador'
//             break;
    
//             case 1:
//                 newLabel = document.createElement('label')
//                 newLabel.textContent = 'Entregas'
//                 newLabel.setAttribute('for', 'deliveries-' + Date.now() + index)

//                 newInput = document.createElement('input')
//                 newInput.id = 'deliveries-' + Date.now() + index
//                 newInput.type = 'number'
//                 newInput.placeholder = 'Quantindade de Entregas'
//             break;
    
//             case 2:
//                 newLabel = document.createElement('label')
//                 newLabel.textContent = 'Extra'
//                 newLabel.setAttribute('for', 'extra-' + Date.now() + index)

//                 newInput = document.createElement('input')
//                 newInput.id = 'extra-' + Date.now() + index
//                 newInput.type = 'number'
//                 newInput.placeholder = 'Quantindade de Extra'
//             break;
    
//             case 3:
//                 newLabel = document.createElement('label')
//                 newLabel.textContent = 'Consumo'
//                 newLabel.setAttribute('for', 'consumption-' + Date.now() + index)

//                 newInput = document.createElement('input')
//                 newInput.id = 'consumption-' + Date.now() + index
//                 newInput.type = 'text'
//                 newInput.placeholder = 'Valor de Consumo'
//             break;
        
//             default:
//                 console.log("alguem problema ocorreu")
//                 break;
//         }

//         newFieldset = document.createElement('fieldset')

//         newFieldset.appendChild(newLabel)
//         newFieldset.appendChild(newInput)
//         newDiv.appendChild(newFieldset)
//         container.appendChild(newDiv)
//     }

//     newDiv.appendChild(newHr)
//     container.insertBefore(newDiv, button)
// }

// function UpdateReport(event) {
//     const element = event.target.id
//     let div, p, deliveryPerson

//     deliveryPerson = element.match(/\d+/g)[0]
//     let index = document.getElementById(`div-${deliveryPerson}`)

// let teste
//     if(index){
//         switch (deliveryPerson) {
//             case '1':
                
//                 break;
    
//             case '2':
            
//                 break;
    
//             case '3':
            
//                 break;
    
//             case '4':
            
//                 break;
    
//             case '5':
//                 if (element.includes('name')) {
//                 }
//                 if (element.includes('deliveries')) {
//                     p = document.getElementById(`p-deliveries-${deliveryPerson}`)
//                     let quantityDeliveries = parseFloat(document.getElementById(element).value)
//                     let quantityDeliveriesExtra = parseFloat(document.getElementById('extra-5').value)
//                     let consumption = parseFloat(document.getElementById('consumption-5').value)

                    

//                     if(quantityDeliveries == NaN){
//                         quantityDeliveries = 0
//                     }
//                     if(quantityDeliveriesExtra == NaN){
//                         quantityDeliveriesExtra = 0
//                     }
//                     if(consumption == NaN){
//                         consumption = 0
//                     }
//                     p.innerHTML = `${quantityDeliveries}<br>${quantityDeliveriesExtra}<br>${consumption}<br>`
//                     console.log(typeof consumption)
//                     //p.innerHTML = 'R$: ' + ((((quantityDeliveries + quantityDeliveriesExtra) * 6) + 10) - consumption)
//                 }
//                 break;
    
//             default:
//                 break;
//         }

//     } else {
//         console.log('Campo não existe')
//     } 

//     div = document.createElement('div')
//     div.id = 'div-' + deliveryPerson

//     for (let i = 0; i < 5; i++) {
//         p = document.createElement('p')
//         switch (i) {
//             case 0:
//                 p.id = 'p-name-' + deliveryPerson
//                 break;
            
//             case 1:
//                 p.id = 'p-payment-' + deliveryPerson
//                 break;

//             case 2:
//                 p.id = 'p-deliveries-' + deliveryPerson
//                 break;

//             case 3:
//                 p.id = 'p-extra-' + deliveryPerson
//                 break;

//             case 4:
//                 p.id = 'p-consumption-' + deliveryPerson
//                 break;

//             default:
//                 console.log('Algum erro ocorreu')
//                 break;

//         }
//         div.appendChild(p)
//     }

//     formattedReport.appendChild(div)

//     if (element.includes('name')) {

//     } else if(element.includes('deliveries')){
        
//     } else if(element.includes('extra')){

//     } else if(element.includes('consumption')){

//     } else {
//         formattedReport.innerHTML += 'erro'

//     }
// }

// Kaio: R$ 22,60
// (17 entregas, 1 consumo, 2 extras)


