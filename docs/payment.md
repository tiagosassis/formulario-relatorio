# Documentação da Função `paymentCalculation()`

## Descrição
Calcula o pagamento de um entregador com base no número de entregas, extras, turno e consumo. Ajusta o pagamento com base em regras de turno e ajuda de custo, e exibe o resultado no relatório.

- **Parâmetros:**
  - `{string} deliveryPersonId` - ID do entregador para identificar os campos de entrada de dados.

## Dependências
- Requer a função `createDateTimeInfo()` para obter informações sobre a data e hora atuais.
- Requer a função `paymentRules(deliveryValues, time)` para aplicar as regras de pagamento.

## Funcionamento
1. Chama a função `createDateTimeInfo()` para obter o turno atual.
2. Define os valores de taxa de entrega e ajuda de custo.
3. Chama `paymentRules()` para ajustar as regras de pagamento com base nos valores e no turno.
4. Obtém os valores de entregas, extras e consumo do DOM, definindo-os como zero se estiverem vazios.
5. Calcula o pagamento total com base nas regras:
   - Para o turno "Morning", se o total de entregas e extras for menor que 10, o pagamento total será R$ 60. Caso contrário, calcula-se o pagamento com base nas entregas e extras.
   - Para o turno "Night", calcula-se o pagamento com base nas entregas e extras, adicionando a ajuda de custo e subtraindo o consumo.
6. Atualiza o campo de texto no DOM com o total de pagamento formatado.

___

# Documentação da Função `paymentRules()`

## Descrição
Define as regras de pagamento para as entregas com base no turno e no dia da semana.

- Durante a noite (turno "Night"), se for sexta-feira, sábado ou domingo, a ajuda de custo será de R$ 20,00.
- No almoço (turno "Morning"), se for domingo, a ajuda de custo será de R$ 20,00.
- Em todos os casos, a taxa de entrega padrão é R$ 6,00.

## Parâmetros
- **`deliveryValues`**: Objeto contendo os valores da entrega, como taxa (`deliveryFee`) e ajuda de custo (`costAssistance`).
- **`time`**: Objeto contendo as informações de tempo, incluindo turno (`turn`) e dia da semana (`weekDay`).

## Funcionamento
1. Define a taxa de entrega padrão como R$ 6,00.
2. Se o turno for "Night":
   - Verifica se o dia da semana é sexta-feira, sábado ou domingo. Se for, define a ajuda de custo como R$ 20,00.
3. Se o turno for "Morning":
   - Verifica se o dia da semana é domingo. Se for, define a ajuda de custo como R$ 20,00.
4. Se o turno não for reconhecido, uma mensagem de erro é registrada no console.
