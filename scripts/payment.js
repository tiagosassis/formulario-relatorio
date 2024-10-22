import { createDateTimeInfo } from "./utils.js"

function paymentRules(deliveryValues, time) {
    deliveryValues.deliveryFee = 6
    
    if (time.turn === 'Night') {
        if (time.weekDay == 'Friday' || time.weekDay == 'Saturday' || time.weekDay == 'Sunday') // sexta, sabado e domingo a noite a ajuda de custo é R$ 20,00
            deliveryValues.costAssistance = 20
        
    } else if (time.turn === 'Morning') {
        if (time.weekDay == 'Sunday') // domingo no almoço a ajuda de custo é R$ 20,00
            deliveryValues.costAssistance = 20

    } else {
        console.log('erro na função paymentRules()')
    }
}

export function paymentCalculation(deliveryPersonId) {
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
        console.log('erro na função paymentCalculation()')
    
    document.querySelector(`#textField-payment-${deliveryPersonId}`).textContent = `R$ ${totalPayment.toFixed(2).replace('.', ',')}`

    /*
        essa função calcula o pagamento conforme a quantidade de entregas e extras de cada entregador e coloca o resultado já no relatorio para ser copiado
        cada entrega vale 6,00 reais, tem uma ajuda de custo de 10,00 reais de segunda a quinta e 20,00 de sexta a domingo e o consumo é descontado do valor final
        (((entregas + entregas extras) x 6) + 10) - consumo
    */
}