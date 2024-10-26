# Documentação da Função `createDisplayFieldsForDeliveryPerson()`

## Descrição
Cria dinamicamente um campo de texto no relatório para exibir informações dos entregadores.

- **Parâmetro:**
  - `{number} deliveryPersonId` - O identificador único do entregador, usado para gerar os IDs dos elementos de exibição.

## Dependências
- **Container DOM:** A função requer o elemento com o ID `report-delivery` no DOM, onde o novo `div` com as informações do entregador será inserido.

## Funcionamento
1. Localiza o container principal do relatório de entregadores (`report-delivery`).
2. Cria um `div` para exibir os detalhes do entregador, contendo:
   - **Nome do Entregador:** Um `span` com o ID `textField-delivery-person-name-{deliveryPersonId}` e a classe `class-update-name-{deliveryPersonId}`, que exibe o nome do entregador, a classe é utilizada para atualiza o nome do entregador em multiplos campos simultaneamente caso haja alteração.
   - **Pagamento Total:** Um `span` com o ID `textField-payment-{deliveryPersonId}`, que exibe o pagamento total do entregador.
   - **Outros Detalhes:** Três `spans` adicionais para exibir o número de entregas, o número de entregas extras (entregas não integradas ao sistema do estabelecimento), e o consumo diário do entregador, usando os IDs `textField-deliveries-{deliveryPersonId}`, `textField-extra-{deliveryPersonId}`, e `textField-consumption-{deliveryPersonId}`, respectivamente. Esses campos são delimitados por parênteses que permanecem ocultos até o preenchimento.
3. Adiciona o `div` criado ao container `report-delivery` no DOM.

## Estrutura HTML resultante
```html
<div id="delivery-person-report-{deliveryPersonId}" class="hidden">
    <span id="textField-delivery-person-name-{deliveryPersonId}" class="class-update-name-{deliveryPersonId}"></span>:
    <span id="textField-payment-{deliveryPersonId}"></span><br>
    <span class="hidden">(</span><span id="textField-deliveries-{deliveryPersonId}"></span>
    <span id="textField-extra-{deliveryPersonId}"></span>
    <span id="textField-consumption-{deliveryPersonId}"></span><span class="hidden">)</span>
</div>
```

# Documentação da Função `createDisplayFieldsForExtraDelivery()`

## Descrição
Cria dinamicamente campos de exibição no relatório para mostrar informações das entregas extras associadas a um entregador específico.

- **Parâmetros:**
  - `{number} deliveryPersonId` - O identificador único do entregador, utilizado para gerar os IDs dos elementos de exibição.
  - `{number} numberOfExtra` - O número de entregas extras que devem ser exibidas.
  - `{HTMLElement} div` - O elemento DOM onde os campos gerados serão inseridos.

## Dependências
- **Container DOM:** A função requer um elemento `div` já existente no DOM onde os campos de exibição para as entregas extras serão adicionados.

## Funcionamento
1. Itera pelo número de entregas extras (`numberOfExtra`) para criar um novo `div` para cada entrega.
2. Cada `div` contém três `spans` para:
   - **Nome do Entregador:** Um `span` com o ID `report-extra-delivery-name-{deliveryPersonId}-{i}` e a classe `class-update-name-{deliveryPersonId}`, preenchido com o nome do entregador, a clase é utilizada para atualizar o nome do entregador em multiplos campos em tempo real.
   - **Número da Entrega Extra:** Um `span` com o ID `report-extra-delivery-number-{deliveryPersonId}-{i}` que exibe o número da entrega extra.
   - **Motivo da Entrega Extra:** Um `span` com o ID `report-extra-delivery-reason-{deliveryPersonId}-{i}` para exibir o motivo associado a essa entrega.
3. Adiciona o `div` criado ao container `div` fornecido.

## Estrutura HTML resultante
```html
<div class="register-content-{deliveryPersonId}">
    <span id="report-extra-delivery-name-{deliveryPersonId}-{i}" class="class-update-name-{deliveryPersonId}"></span>
    <span id="report-extra-delivery-number-{deliveryPersonId}-{i}"></span>
    <span id="report-extra-delivery-reason-{deliveryPersonId}-{i}"></span>
</div>
```

# Documentação da Função `createDisplayFieldsForExtraEmployee()`

## Descrição
Cria dinamicamente uma seção no relatório para exibir as informações de um ou mais funcionários extras.

- **Parâmetro:**
  - `{number} extraEmployeeId` - O identificador único do funcionário extra, usado para associar os IDs dos elementos de exibição.

## Dependências
- **Container DOM:** A função requer o elemento com o ID `report-freelancer` no DOM, onde o novo `div` com as informações do funcionário extra será inserido.

## Funcionamento
1. Localiza o container principal do relatório de funcionários extras (`report-freelancer`).
2. Cria um `div` contendo três `spans`:
   - **Nome do Funcionário:** Um `span` com o ID `textField-employee-name-{extraEmployeeId}`, iniciado com o valor `-` necessário para formatar o relatorio.
   - **Pagamento Diário:** Um `span` com o ID `textField-employee-daily-payment-{extraEmployeeId}`, para exibir o pagamento diário do funcionário.
   - **Chave Pix:** Um `span` com o ID `textField-employee-pix-key-{extraEmployeeId}`, para exibir a chave Pix do funcionário.
3. Adiciona o `div` criado ao container `report-freelancer` no DOM.

## Estrutura HTML resultante
```html
    <div id="report-freelancer-{extraEmployeeId}">
        <span id="textField-employee-name-{extraEmployeeId}">- </span>
        <span id="textField-employee-daily-payment-{extraEmployeeId}"></span>
        <span id="textField-employee-pix-key-{extraEmployeeId}"></span>
    </div>
```
