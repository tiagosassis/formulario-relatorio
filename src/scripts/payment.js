import { createDateTimeInfo } from "./utils.js"

function paymentRules(deliveryValues, time) {
    /**
     * Define as regras de pagamento para as entregas com base no turno e no dia da semana.
     * 
     * - Durante a noite (turno "Night"), se for sexta-feira, sábado ou domingo, a ajuda de custo será de R$ 20,00.
     * - No almoço (turno "Morning"), se for domingo, a ajuda de custo será de R$ 20,00.
     * - Em todos os casos, a taxa de entrega padrão é R$ 6,00.
     * 
     * @param {Object} deliveryValues - Objeto contendo os valores da entrega, como taxa e ajuda de custo.
     * @param {Object} time - Objeto contendo as informações de tempo, incluindo turno e dia da semana.
     */
    deliveryValues.deliveryFee = 6
    
    if (time.turn === 'Night') {
        if (time.weekDay == 'Friday' || time.weekDay == 'Saturday' || time.weekDay == 'Sunday') // sexta, sabado e domingo a noite a ajuda de custo é R$ 20,00
            deliveryValues.costAssistance = 20
        
    } else if (time.turn === 'Morning') {
        if (time.weekDay == 'Sunday') // domingo no almoço a ajuda de custo é R$ 20,00
            deliveryValues.costAssistance = 20

    } else {
        console.warn('erro na função paymentRules()')
    }
}

export function paymentCalculation(deliveryPersonId) {
    /**
     * Calcula o pagamento de um entregador com base no número de entregas, extras, turno e consumo.
     * Ajusta o pagamento com base em regras de turno e ajuda de custo, e exibe o resultado no relatório.
     * 
     * @param {string} deliveryPersonId - ID do entregador para identificar os campos de entrada de dados.
     */
    const time = createDateTimeInfo()
    let deliveries, extra, consumption, totalPayment
    let deliveryValues = {
        deliveryFee: 6,
        costAssistance: 10
    }

    paymentRules(deliveryValues, time)

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

    if (time.turn === 'Morning') {
        if ((deliveries + extra) < 10) 
            totalPayment = 60
        else 
            totalPayment = ((deliveries + extra) * deliveryValues.deliveryFee) + deliveryValues.costAssistance - consumption
    } else if (time.turn === 'Night') 
        totalPayment = ((deliveries + extra) * deliveryValues.deliveryFee) + deliveryValues.costAssistance - consumption
    else 
        console.warn('erro na função paymentCalculation()')
    
    document.querySelector(`#textField-payment-${deliveryPersonId}`).textContent = `R$ ${totalPayment.toFixed(2).replace('.', ',')}`
}