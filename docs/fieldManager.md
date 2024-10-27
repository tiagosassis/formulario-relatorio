# Documentação da Função `manageExtraDeliveryInputs()`

## Descrição
Gerencia a criação e remoção de campos de entrada para entregas extras de um entregador. A função ajusta dinamicamente os campos com base no número de entregas extras especificado, criando novos campos quando o número aumenta e removendo campos quando o número diminui. Se a div correspondente ao entregador não existir, a função a cria e gera os campos necessários.

## Parâmetros
- **deliveryPersonId**: O ID do entregador associado às entregas extras.
- **numberOfExtra**: O número de entregas extras a serem registradas.

## Funcionamento
1. A função verifica se a div correspondente ao `deliveryPersonId` já existe no DOM.
2. Se a div existir:
   - Conta o número atual de campos de entrada (registros) existentes para o entregador.
   - Calcula a diferença entre o número desejado (`numberOfExtra`) e o número atual de registros.
   - Se o número de registros a ser criado for positivo, chama a função `createInputFieldsForExtraDelivery(div, currentRegister, deliveryPersonId)` para criar novos campos.
   - Se o número de registros for negativo, remove os campos existentes até que a quantidade desejada seja alcançada.
   - Se o número de registros permanecer o mesmo, a função não realiza nenhuma ação.
3. Se a div não existir:
   - Cria uma nova div para o entregador, define suas classes e ID.
   - Chama a função `createInputFieldsForExtraDelivery(div, numberOfExtra, deliveryPersonId)` para gerar os campos de entrada necessários.
   - Adiciona a nova div ao container de entregas extras.

## Dependências
- Requer a função `createInputFieldsForExtraDelivery(div, numberOfExtra, deliveryPersonId)` para criar os campos de entrada necessários.

___

# Documentação da Função `manageExtraDeliveryDisplay()`

## Descrição
Gerencia a exibição dos campos de entrega extra de um entregador no relatório. A função ajusta dinamicamente os campos visíveis com base no número de entregas extras especificado, criando novos campos quando o número aumenta e removendo campos quando o número diminui. Se a div correspondente ao entregador não existir, a função a cria e gera os campos necessários.

## Parâmetros
- **deliveryPersonId**: O ID do entregador associado às entregas extras.
- **numberOfExtra**: O número de entregas extras a serem exibidas no relatório.

## Funcionamento
1. A função verifica se a div correspondente ao `deliveryPersonId` já existe no DOM.
2. Se a div existir:
   - Conta o número atual de campos de exibição (registros) existentes para o entregador.
   - Calcula a diferença entre o número desejado (`numberOfExtra`) e o número atual de registros.
   - Se o número de registros a ser criado for positivo, chama a função `createDisplayFieldsForExtraDelivery(deliveryPersonId, currentRegister, div)` para criar novos campos de exibição.
   - Se o número de registros for negativo, remove os campos existentes até que a quantidade desejada seja alcançada.
   - Se o número de registros permanecer o mesmo, a função não realiza nenhuma ação.
3. Se a div não existir:
   - Cria uma nova div para o entregador, define suas classes e ID.
   - Chama a função `createDisplayFieldsForExtraDelivery(deliveryPersonId, numberOfExtra, div)` para gerar os campos de exibição necessários.
   - Adiciona a nova div ao container de exibição de entregas extras.

## Dependências
- Requer a função `createDisplayFieldsForExtraDelivery(deliveryPersonId, numberOfExtra, div)` para criar os campos de exibição necessários.

___

# Documentação da Função `removeExtraEmployee()`

## Descrição
Remove o último funcionário extra da seção de entrada e do relatório. A função verifica se há funcionários extras registrados antes de tentar realizar a remoção. Se não houver funcionários para remover, emite um aviso no console.

## Funcionamento
1. Seleciona todos os elementos `div` dentro da seção de funcionários extras (`#section-extra-employee`).
2. Verifica se há funcionários extras a serem removidos:
   - Se a lista estiver vazia, emite um aviso no console informando que não há funcionários extras para remover e termina a execução.
3. Obtém o ID do último funcionário extra usando uma expressão regular para extrair o número do ID do elemento correspondente.
4. Remove a div de entrada correspondente ao último funcionário extra.
5. Remove a div de relatório associada ao último funcionário extra usando o ID obtido anteriormente.

## Dependências
- Esta função presume que as divs dos funcionários extras têm uma estrutura específica para que os IDs possam ser extraídos corretamente.