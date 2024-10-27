# Documentação da Função `handleExtraEmployeeData()`

## Descrição
Atualiza os campos de exibição no relatório em tempo real com os dados inseridos nos inputs de nome, pagamento e chave Pix dos funcionários extras. Caso haja um nome inserido, a seção correspondente no relatório é tornada visível, caso não haja, ficara com display none.

## Parâmetros
- **event**: O evento 'input' que dispara a atualização.

## Funcionamento
1. Extrai o ID do funcionário extra do input que acionou o evento usando uma expressão regular.
2. Seleciona os inputs de nome, pagamento diário e chave Pix com base no ID extra extraído.
3. Seleciona os campos de exibição correspondentes para nome, pagamento e chave Pix no relatório.
4. Atualiza o texto de cada campo de exibição com os valores dos inputs, formatando o pagamento como moeda:
   - Se o campo de nome tiver um valor, atualiza o campo de exibição com o nome; caso contrário, limpa o campo.
   - Se o campo de pagamento diário tiver um valor, atualiza o campo de exibição com o pagamento formatado; caso contrário, limpa o campo.
   - Se o campo de chave Pix tiver um valor, atualiza o campo de exibição com a chave Pix; caso contrário, limpa o campo.
5. Verifica se o campo de nome contém texto:
   - Se sim, torna a seção do relatório correspondente visível.
   - Se não, oculta a seção do relatório.

## Estrutura HTML esperada
```html
    <div id="report-freelancer" class="hidden">
        <div id="textField-employee-name-{extraEmployeeId}"></div>
        <div id="textField-employee-daily-payment-{extraEmployeeId}"></div>
        <div id="textField-employee-pix-key-{extraEmployeeId}"></div>
    </div>
```

___

# Documentação da Função `handleDeliveryData()`

## Descrição
Atualiza a quantidade de entregas no relatório e altera a visibilidade do entregador conforme a quantidade informada.

## Parâmetros
- **event**: O evento de entrada que contém a nova quantidade de entregas.
- **deliveryPersonId**: O ID do entregador cujas entregas estão sendo atualizadas.

## Funcionamento
1. A função acessa o elemento de exibição correspondente ao ID do input que acionou o evento, usando `event.target.id`, e atualiza seu conteúdo para mostrar a nova quantidade de entregas seguida da palavra "Entregas".
2. Verifica se a quantidade informada no input é diferente de zero:
   - Se for, a função chama `toggleClassHidden` para ocultar a seção do relatório do entregador, tornando-a visível.
   - Se não, a seção do relatório do entregador é mantida oculta.

___

# Documentação da Função `refreshPersonNameInDisplayOnChange()`

## Descrição
Atualiza o nome do entregador em todos os elementos da página que possuem a classe `class-update-name-${deliveryPersonId}` com o valor do input correspondente.

## Parâmetros
- **deliveryPersonId**: O ID do entregador cujo nome está sendo atualizado.

## Funcionamento
1. A função seleciona todos os elementos da página que têm a classe `class-update-name-${deliveryPersonId}`.
2. Para cada elemento encontrado, o conteúdo interno é atualizado para refletir o novo nome do entregador, que é obtido a partir do valor do input correspondente identificado pelo ID `#delivery-person-name-${deliveryPersonId}`.

___

# Documentação da Função `handleExtraDeliveryData()`

## Descrição
Atualiza os campos de exibição no relatório em tempo real com os dados inseridos nos inputs de número de pedido e motivo de entregas extras. A função altera o texto exibido conforme os valores inseridos pelo usuário.

## Parâmetros
- **event**: O evento de entrada que dispara a atualização. Contém informações sobre o elemento que gerou o evento.

## Funcionamento
1. A função extrai o `deliveryPersonId` e o `extraDeliveryIndex` do ID do input que gerou o evento.
2. Dependendo da classe do input que disparou o evento, a função realiza as seguintes ações:
   - **Se o input for do tipo número**:
     - Seleciona o span correspondente ao número da entrega extra e atualiza seu conteúdo com o número inserido, prefixado por " N".
   - **Se o input for do tipo motivo**:
     - Seleciona o span correspondente ao motivo da entrega extra e atualiza seu conteúdo com o motivo inserido, capitalizando a primeira letra.
3. Se o input não corresponder a nenhum dos tipos esperados, a função registra um erro no console.

___

# Documentação da Função `handleDeliveryPersonData()`

## Descrição
Atualiza o relatório final com as informações inseridas nos inputs de entregas, entregas extras e consumo. A função capta informações a partir do ID do input que gerou o evento e, com base nesses dados, realiza as seguintes operações:

- Calcula o pagamento do entregador(a) por meio da função `paymentCalculation()`.
- Atualiza o nome do entregador automaticamente utilizando a função `refreshPersonNameInDisplayOnChange()`.

## Parâmetros
- **event**: O evento de entrada que dispara a atualização. Contém informações sobre o elemento que gerou o evento.

## Funcionamento
1. A função extrai o `deliveryPersonId` do ID do input que gerou o evento.
2. Chama a função `paymentCalculation(deliveryPersonId)` para calcular o pagamento do entregador com base nas entregas, entregas extras e consumo.
3. Chama a função `refreshPersonNameInDisplayOnChange(deliveryPersonId)` para atualizar o nome do entregador em todos os elementos da página.
4. Realiza verificações com base no ID do input que disparou o evento:
   - **Se o input estiver relacionado a entregas**:
     - Chama a função `handleDeliveryData(event, deliveryPersonId)` para atualizar a quantidade de entregas.
   - **Se o input estiver relacionado a entregas extras**:
     - Atualiza a quantidade de entregas extras no relatório.
     - Chama `manageExtraDeliveryInputs(deliveryPersonId, event.target.value)` para gerenciar os inputs de entregas extras.
     - Chama `manageExtraDeliveryDisplay(deliveryPersonId, event.target.value)` para gerenciar a exibição das entregas extras.
     - Exibe ou oculta a seção de entregas extras com base na quantidade atual.
   - **Se o input estiver relacionado ao consumo**:
     - Atualiza o status de consumo no relatório com base no valor inserido.

## Dependências
- Requer as funções `paymentCalculation(deliveryPersonId)`, `refreshPersonNameInDisplayOnChange(deliveryPersonId)`, `handleDeliveryData(event, deliveryPersonId)`, `manageExtraDeliveryInputs(deliveryPersonId, quantity)` e `manageExtraDeliveryDisplay(deliveryPersonId, quantity)` para executar corretamente suas operações.
