# Documentação da Função `createDateTimeInfo()`

## Descrição
Cria um objeto com informações sobre a data e hora atuais, incluindo o turno do dia e o dia da semana.

- Ajusta a data para o dia anterior se a hora atual estiver entre meia-noite e 5 da manhã, isso deve acontecer pois, caso o usuário vá criar o relatorio da noite após a meia noite, não terá que alterar a data no relatorio
- Determina o turno do dia como "Morning" se a hora estiver entre 5:00 e 17:00, e "Night" caso contrário.
- Identifica o dia da semana correspondente ao valor do dia da semana retornado pelo método `getDay()` do objeto Date, convertendo-o em uma string representativa (ex: "Monday").
- Retorna um objeto contendo as seguintes propriedades:
  - `currentHour`: A hora atual no formato 24 horas.
  - `turn`: O turno do dia ("Morning" ou "Night").
  - `weekDay`: O dia da semana (ex: "Monday", "Tuesday").
  - `day`: O dia do mês com dois dígitos.
  - `month`: O mês atual com dois dígitos.

## Dependências
- Nenhuma função externa é necessária para o funcionamento desta função.

## Funcionamento
1. Cria uma instância do objeto Date para obter a data e hora atuais.
2. Ajusta a data para o dia anterior caso a hora atual esteja entre meia-noite e 5 da madrugada.
3. Define o turno do dia baseado na hora atual.
4. Identifica o dia da semana e o formata como uma string representativa.
5. Cria e retorna um objeto contendo as informações de data e hora.

## Estrutura do Objeto Retornado
```javascript
{
    currentHour: 14, // Hora atual em formato 24 horas
    turn: 'Morning', // Turno do dia
    weekDay: 'Monday', // Dia da semana
    day: '27', // Dia do mês com dois dígitos
    month: '10' // Mês atual com dois dígitos
}
```

___