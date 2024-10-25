# Documentação da Função `createInputFieldsForDeliveryPerson()`

## Descrição
Cria uma estrutura de entrada de dados para o entregador na seção "section-delivery-person".

- **Parâmetros:**
  - `{number} deliveryPersonId` - O identificador numérico do entregador. Se não for um número, será gerado automaticamente.
  - `{string} name` - O nome do entregador (opcional).

## Dependências
- Requer a função `createTextField(deliveryPersonId)` para criar o campo de exibição correspondente aos dados do entregador.

## Funcionamento
1. Verifica se `deliveryPersonId` é um número. Se não for, gera um ID baseado na contagem atual de entregadores e inicializa `name` como uma string vazia.
2. Cria um `div` que contém quatro campos de entrada: nome, quantidade de entregas, valor extra e consumo diário.
3. Cada campo de entrada é configurado com um ID específico baseado no `deliveryPersonId`.
4. Adiciona o `div` gerado à seção correspondente no DOM.

## Estrutura HTML resultante
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
