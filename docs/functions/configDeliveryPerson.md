# Documentação da Função `configDeliveryPerson`

## Descrição
Configura o relatório de entregadores para o turno atual (Almoço ou Noite).

- Atualiza o título e a data do relatório.
- Cria campos de entrada para entregadores ativos conforme o turno.
- Adiciona campo para o primeiro funcionário diarista.

## Dependências
- `createDateTimeInfo()`
- `deliveryPersonDatalist()`
- `createInputFieldsForDeliveryPerson()`
- `addExtraEmployee()`

## Variáveis Globais
- **`activeDeliveryPersons`**: Array contendo informações dos entregadores.

## Funcionamento
1. Obtém a informação do horário atual (turno e data) usando a função `createDateTimeInfo()`.
2. Atualiza o título do relatório e a data exibida, dependendo do turno (Almoço ou Noite).
3. Cria uma lista de entregadores ativos, ignorando aqueles que estão de folga no dia.
4. Para cada entregador ativo, chama a função `createInputFieldsForDeliveryPerson()` para criar campos de entrada.
5. Chama a função `addExtraEmployee()` para adicionar um campo para o primeiro funcionário diarista.

## Observações
- Caso ocorra um erro no turno, uma mensagem de erro será registrada no console.