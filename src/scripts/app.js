import { darkMode, detectUserTheme } from "./theme.js"
import { copyContent } from "./clipboard.js"
import { createDateTimeInfo, deliveryPersonDatalist } from "./utils.js"
import { createInputFieldsForExtraEmployee, createInputFieldsForDeliveryPerson } from "./formFields.js"
import { handleExtraEmployeeData, handleExtraDeliveryData, handleDeliveryPersonData } from "./formDataHandler.js"
import { removeExtraEmployee } from "./fieldManager.js"
import { exportReportToExcel } from "./reportData.js";

document.addEventListener('DOMContentLoaded', () =>{
    configDeliveryPerson()
    detectUserTheme()

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    })

    // Listener global para inputs de moeda
    document.addEventListener("focus", (event) => {
        const input = event.target
        setTimeout(()=>{
            if (input.classList.contains("currency-input") && input.value === "") {
                input.value = formatter.format(0); // Exibe "R$ 0,00" se o campo estiver vazio
            }
        }, 200)
    }, true)

    document.addEventListener("blur", (event) => {
        const input = event.target
        if (input.classList.contains("currency-input") && (input.value == "R$ 0,00" || input.value === "" || input.value === " ")) {
            input.value = ''; // Limpa o input se o usuário não digitar nenhum valor
        }
    }, true)

    document.addEventListener("input", (event) => {
        const input = event.target
        if (input.classList.contains("currency-input")) {
            const value = input.value.replace(/\D/g, "")
            const number = parseFloat(value) / 100
            input.value = formatter.format(number) // Formata o valor
        }
    }, true)
})
document.getElementById('section-delivery-person').addEventListener('input', handleDeliveryPersonData)
document.getElementById('section-extra-delivery').addEventListener('input', handleExtraDeliveryData)
document.getElementById('copy-button').addEventListener('click', copyContent)
document.getElementById('add-delivery-person-button').addEventListener('click', createInputFieldsForDeliveryPerson)
document.getElementById('theme').addEventListener('click', darkMode)
document.getElementById('add-extra-employee').addEventListener('click', createInputFieldsForExtraEmployee)
document.getElementById('remove-extra-employee').addEventListener('click', removeExtraEmployee)
document.getElementById('section-extra-employee').addEventListener('input', handleExtraEmployeeData)
document.getElementById('download-report').addEventListener('click', exportReportToExcel)

export const activeDeliveryPersons = [
    {name: 'Byane', turn: ['Night'], dayOff: 'Wednesday'},
    {name: 'Guilherme Vieira', turn: ['Morning', 'Night'], dayOff: 'Tuesday'},
    {name: 'Kaio', turn: ['Night'], dayOff: 'Thursday'},
    {name: 'Keven', turn: ['Morning', 'Night'], dayOff: 'Monday'}
]

let currentDeliveryPersonCount = activeDeliveryPersons.length // necessário para criar o ID único para extradores extras criados pelo usuário

export function getCurrentDeliveryPersonCount() {
    return currentDeliveryPersonCount;
}

export function setCurrentDeliveryPersonCount(newCount) {
    currentDeliveryPersonCount = newCount;
}

function configDeliveryPerson() {
    /**
     * Configura o relatório de entregadores para o turno atual (Almoço ou Noite).
     * Atualiza título e data do relatório, cria campos de entrada para entregadores ativos 
     * e adiciona campo para o primeiro funcionário diarista.
     * 
     * Dependências: createDateTimeInfo(), deliveryPersonDatalist(), createInputFieldsForDeliveryPerson(), createInputFieldsForExtraEmployee()
     * Variáveis globais: activeDeliveryPersons (Array de entregadores).
     */
    
    const time = createDateTimeInfo()

    const h1 = document.querySelector('h1')
    const dateOfReport = document.getElementById('date-of-report')

    deliveryPersonDatalist() // cria a datalist de entregador e coloca no html do relatorio
    
    if (time.turn === 'Morning') { // dia
        h1.innerText = `Relatório Almoço ${time.day} / ${time.month}`
        dateOfReport.innerHTML = '*Almoço ' + time.day + '/' + time.month + '*<br>'

    } else if(time.turn === 'Night'){ // noite
        h1.innerText = `Relatório Noite ${time.day} / ${time.month}`
        dateOfReport.innerHTML = `*Noite ${time.day} / ${time.month}*<br>`

    } else {
        console.warn('erro na função configDeliveryPerson()')
    }

    activeDeliveryPersons.forEach((person, index) =>{
        if (!(person.dayOff == time.weekDay) && (person.turn[0] == time.turn || person.turn[1] == time.turn)) {
            createInputFieldsForDeliveryPerson(index, person.name)
        }
    })
    createInputFieldsForExtraEmployee()
}
