# Documentação da Função `createInputFieldsForDeliveryPerson()`

## Descrição
Cria uma estrutura de entrada de dados para o entregador na seção "section-delivery-person".

- **Parâmetros:**
  - `{number} deliveryPersonId` - O identificador numérico do entregador. Se não for um número, será gerado automaticamente.
  - `{string} name` - O nome do entregador (opcional).

## Dependências
- Requer a função `createDisplayFieldsForDeliveryPerson(deliveryPersonId)` para criar o campo de exibição correspondente aos dados do entregador.

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
```

___

# Documentação da Função `createInputFieldsForExtraDelivery()`

## Descrição
Cria campos de entrada para entregas extras de um entregador. Esta função gera automaticamente campos de entrada para o número do pedido e o motivo da entrega extra, baseando-se na quantidade de entregas extras especificadas.

## Parâmetros
- **div1**: Elemento pai para os novos campos.
- **numberOfExtra**: Quantidade de entregas extras a serem criadas.
- **deliveryPersonId**: ID do entregador.

## Funcionamento
1. Seleciona todos os registros de entregas extras do entregador com o ID `deliveryPersonId`.
2. Converte `numberOfExtra` em um número inteiro.
3. Calcula a quantidade total de entregas extras a serem criadas, somando o valor atual de registros (`i`) e `numberOfExtra`.
4. Para cada entrega extra:
   - Cria um `div` com classes `flex-row-wrap`, `register-${deliveryPersonId}` e `flex-container-extra`.
   - Adiciona um `label` que exibe o nome do entregador.
   - Para cada entrega extra, cria dois campos:
     - Campo para o número do pedido:
       - `input` do tipo `number`.
       - Atributos `name`, `class`, `required` e `id` definidos.
       - `label` associado.
     - Campo para o motivo da entrega extra:
       - `input` do tipo `text`.
       - Atributos `name`, `class`, `required` e `id` definidos.
       - `label` associado.
5. Adiciona cada `div` de entrega extra ao elemento pai `div1`.

## Estrutura HTML criada
```html
    <div class="flex-row-wrap register-{deliveryPersonId} flex-container-extra">
        <label class="flex-item-label-name class-update-name-{deliveryPersonId}">{Nome do Entregador}</label>
        <div class="flex-item-order-number">
            <input type="number" name="extra-delivery-number" class="float-input request-number-extra" required id="{deliveryPersonId}-{i}-extra-delivery-number-{deliveryPersonId}-{i}">
            <label for="extra-delivery-number-{deliveryPersonId}-{i}" class="float-label">Nº do pedido</label>
        </div>
        <div class="flex-item-extra-reason">
            <input type="text" name="reason-extra-delivery" class="float-input reason-delivery-extra" required id="reason-extra-delivery-{deliveryPersonId}-{i}">
            <label for="reason-extra-delivery-{deliveryPersonId}-{i}" class="float-label">Motivo</label>
        </div>
    </div>
```
___

# Documentação da Função `createInputFieldsForExtraEmployee()`

## Descrição
Adiciona um novo funcionário extra ao formulário, criando campos de entrada para nome, pagamento diário e chave Pix. Esta função gera automaticamente IDs exclusivos para os campos de entrada com base na quantidade de funcionários extras já existentes.

## Funcionamento
1. Seleciona o contêiner onde os campos de entrada serão adicionados (`#section-extra-employee`).
2. Conta quantos funcionários extras já foram adicionados para gerar um novo ID exclusivo (`extraEmployeeId`).
3. Cria um `div` com a classe `flex-row-wrap extra-employee`, que será o contêiner para os campos de entrada.
4. Para cada campo de entrada (nome, diária e chave Pix):
   - Cria um `div` com a classe correspondente.
   - Cria um campo de entrada (`input`) com o `id`, `name` e `required` definidos.
   - Cria um `label` associado ao campo de entrada.
   - Adiciona o `input` e o `label` ao `div`.
5. Adiciona o `div` contendo os campos de entrada ao contêiner.
6. Chama a função `createDisplayFieldsForExtraEmployee(extraEmployeeId)` para criar a div onde as informações do funcionário extra serão exibidas no relatório.

## Estrutura HTML gerada
```html
    <div class="flex-row-wrap extra-employee">
        <div class="flex-item-employee-name">
            <input type="text" name="extra-employee-name-{extraEmployeeId}" id="extra-employee-name-{extraEmployeeId}" class="float-input" required>
            <label for="extra-employee-name-{extraEmployeeId}" class="float-label">Nome</label>
        </div>
        <div class="flex-item-daily-payment">
            <input type="number" name="extra-employee-daily-payment-{extraEmployeeId}" id="extra-employee-daily-payment-{extraEmployeeId}" class="float-input" required>
            <label for="extra-employee-daily-payment-{extraEmployeeId}" class="float-label">Diária</label>
        </div>
        <div class="flex-item-pix-key">
            <input type="text" name="extra-employee-pix-key-{extraEmployeeId}" id="extra-employee-pix-key-{extraEmployeeId}" class="float-input" required>
            <label for="extra-employee-pix-key-{extraEmployeeId}" class="float-label">Chave Pix</label>
        </div>
    </div>
```


