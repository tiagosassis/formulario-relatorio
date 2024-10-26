// inputFieldsManager.js
// Funções para manipular e atualizar input's do formulário em tempo real.

import { createInputFieldsForExtraDelivery } from "./formFields.js"

export function manageExtraDeliveryInputs(deliveryPersonId, numberOfExtra) {
    /**
     * Gerencia a criação e remoção de campos de entrada para entregas extras de um entregador.
     * Se a div correspondente ao entregador já existe, ajusta o número de campos com base na nova quantidade especificada
     * Cria novos campos se o número aumentou, remove campos se o número diminuiu, e não faz nada se o número permanecer o mesmo.
     * Se a div não existir, cria-a e gera os campos de entrada necessários.
     * 
     * @param {number} deliveryPersonId - ID do entregador associado às entregas extras.
     * @param {number} numberOfExtra - Número de entregas extras a serem registradas.
     */

    const container = document.getElementById('section-extra-delivery')
    let div = document.getElementById(`div-delivery-person-${deliveryPersonId}`)

    if (div) {
        let register = document.querySelectorAll(`.register-${deliveryPersonId}`)
        let currentRegister = numberOfExtra - register.length
        if (currentRegister > 0) {
            createInputFieldsForExtraDelivery(div, currentRegister, deliveryPersonId)
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
        div.setAttribute('id', `div-delivery-person-${deliveryPersonId}`)

        createInputFieldsForExtraDelivery(div, numberOfExtra, deliveryPersonId)

        container.appendChild(div)
    }
}