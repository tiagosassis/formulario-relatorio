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
