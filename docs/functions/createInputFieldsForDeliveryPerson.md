# Documentação da Função `createInputFieldsForDeliveryPerson`

## Descrição
Cria uma estrutura de entrada de dados para o entregador e a adiciona na seção "section-delivery-person" com campos para nome, quantidade de entregas, valor extra e consumo diário.

## Parâmetros
- **`deliveryPersonId`** (number): O identificador numérico do entregador.
- **`name`** (string, opcional): O nome do entregador.

## Estrutura HTML Resultante
```html
<div class="flex-row-wrap delivery-person-container container-relative">
    <div class="flex-item-delivery-person-name">
        <input class="float-input" type="text" id="delivery-person-name-5" list="datalist-delivery-person" value="" required>
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
        <input class="float-input" type="number" id="consumption-5" required>
        <label class="float-label" for="consumption-5">Consumo</label>
    </div>
</div>
