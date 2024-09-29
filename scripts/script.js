const currentDate = new Date()
const addEntregador = document.getElementById('addEntregador')

let weekDay = currentDate.getDay()
let day = currentDate.getDate()
let month = currentDate.getMonth() + 1
let deliveryPerson

document.addEventListener('DOMContentLoaded', ()=>{
    const legend = document.querySelector('legend')
    let divDelivery = document.querySelectorAll('.div-entregadores')
    if (currentDate.getHours() >= 5 && currentDate.getHours() <= 17) { // dia
        legend.innerText = 'Almoço ' + day + '/' + month
        divDelivery[0].style.display = 'none'; // caso seja de dia, os entregadores da noite não aparecem
        divDelivery[1].style.display = 'none';
        divDelivery[2].style.display = 'none';
        return
    } else{ // noite
        divDelivery[3].style.display = 'none'; // desaparece com o entregador do dia
        switch (weekDay) { // define qual entregador estara de folga
            case 1:
                deliveryPerson = document.getElementById('div-entregador5')
                deliveryPerson.style.display = 'none'
                break;
        
            case 2:
                deliveryPerson = document.getElementById('div-entregador2')
                deliveryPerson.style.display = 'none'
                break;
        
            case 3:
                deliveryPerson = document.getElementById('div-entregador1')
                deliveryPerson.style.display = 'none'
                break;
        
            case 4:
                deliveryPerson = document.getElementById('div-entregador3')
                deliveryPerson.style.display = 'none'
                break;
        }
        if(currentDate.getHours() >= 0 && currentDate.getHours() <= 4){
            day--
            legend.innerText = 'Noite ' + day + '/' + month
        }else{
            legend.innerText = 'Noite ' + day + '/' + month
        }
    }
    
})

function ClearInput(idInput) { // limpa o input para selecionar outro entregador
    let input = document.getElementById(idInput)
    input.value = ''
    setTimeout(() => {
        input.focus();
    }, 0)
}

addEntregador.addEventListener('click', () => {
    const container = document.getElementById('container-entregadores')
    const newHr = document.createElement('hr')
    let newDiv, newFieldset, newLabel, newInput
    let button = document.getElementById('addEntregador')

    newDiv = document.createElement('div')
    newDiv.id = 'div-' + Date.now()
    newDiv.className = 'div-entregadores'

    for (let index = 0; index < 4; index++) {

        switch (index) {
            case 0:
                newLabel = document.createElement('label')
                newLabel.textContent = 'Nome'
                newLabel.setAttribute('for', Date.now() + index)

                newInput = document.createElement('input')
                newInput.id = 'input-' + Date.now() + index
                newInput.type = 'text'
                newInput.setAttribute('list', 'datalist-entregadores')
                newInput.onfocus = "ClearInput('entregador1')"
                newInput.value = ''
                newInput.placeholder = 'Entregador'
            break;
    
            case 1:
                newLabel = document.createElement('label')
                newLabel.textContent = 'Entregas'
                newLabel.setAttribute('for', Date.now() + index)

                newInput = document.createElement('input')
                newInput.id = 'input-' + Date.now() + index
                newInput.type = 'number'
                newInput.placeholder = 'Quantindade de Entregas'
            break;
    
            case 2:
                newLabel = document.createElement('label')
                newLabel.textContent = 'Extra'
                newLabel.setAttribute('for', Date.now() + index)

                newInput = document.createElement('input')
                newInput.id = 'input-' + Date.now() + index
                newInput.type = 'number'
                newInput.placeholder = 'Quantindade de Extra'
            break;
    
            case 3:
                newLabel = document.createElement('label')
                newLabel.textContent = 'Consumo'
                newLabel.setAttribute('for', Date.now() + index)

                newInput = document.createElement('input')
                newInput.id = 'input-' + Date.now() + index
                newInput.type = 'text'
                newInput.placeholder = 'Valor de Consumo'
            break;
        
            default:
                console.log("alguem problema ocorreu")
                break;
        }

        newFieldset = document.createElement('fieldset')

        newFieldset.appendChild(newLabel)
        newFieldset.appendChild(newInput)
        newDiv.appendChild(newFieldset)
        container.appendChild(newDiv)
    }

    newDiv.appendChild(newHr)
    container.insertBefore(newDiv, button)
});


/*
document.getElementById('copiarRelatorio').addEventListener('click', function() {
            const relatorio = document.getElementById('relatorioFormatado');
            const range = document.createRange();
            range.selectNode(relatorio);
            window.getSelection().removeAllRanges(); // Limpa a seleção atual
            window.getSelection().addRange(range); // Seleciona o conteúdo

            // Tenta copiar o conteúdo
            try {
                const sucesso = document.execCommand('copy');
                if (sucesso) {
                    alert('Relatório copiado para a área de transferência!');
                } else {
                    alert('Falha ao copiar.');
                }
            } catch (err) {
                alert('Erro ao copiar: ' + err);
            }

            window.getSelection().removeAllRanges(); // Limpa a seleção
*/


