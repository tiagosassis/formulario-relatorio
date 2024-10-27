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

# Documentação da Função `createDisplayFieldsForDeliveryPerson()`

## Descrição
Cria um campo de texto para exibir informações do entregador no relatório.

- Gera uma estrutura HTML que contém informações como nome, pagamento, entregas, entregas extras e consumo.
- As informações são exibidas de forma organizada, com os campos visíveis apenas quando necessário.

## Dependências
- Nenhuma função externa é necessária para o funcionamento desta função.

## Parâmetros
- **`deliveryPersonId`**: Identificador único do entregador para o qual os campos de exibição estão sendo criados.

## Funcionamento
1. Cria um elemento `<div>` que servirá como contêiner para os dados do entregador. Este elemento é configurado para ser inicialmente oculto, utilizando a classe `hidden`.
2. Define o atributo `id` do `<div>` com base no `deliveryPersonId` passado como parâmetro.
3. Cria um elemento `<span>` para exibir o nome do entregador, configurando seu `id` de acordo com o `deliveryPersonId`.
4. Adiciona um `<br>` após o nome do entregador para organizar a exibição dos campos.
5. Cria elementos `<span>` para exibir informações de pagamento, entregas, entregas extras e consumo, utilizando `id`s únicos para cada um com base no `deliveryPersonId`.
6. Inclui elementos `<span>` ocultos para delimitar os campos de exibição (parenteses) quando necessário.
7. Anexa o `<div>` criado ao contêiner principal do relatório (`report-delivery`).

## Estrutura HTML gerada:
```html
    <div id="delivery-person-report-1" class="hidden">
        <span id="textField-delivery-person-name-1" class="class-update-name-1"></span>:
        <span id="textField-payment-1"></span><br>
        <span class="hidden">(</span><span id="textField-deliveries-1"></span>
        <span id="textField-extra-1"></span>
        <span id="textField-consumption-1"></span><span class="hidden">)</span>
    </div>
```

___

# Documentação da Função `createDisplayFieldsForExtraDelivery()`

## Descrição
Cria campos de exibição para entregas extras no relatório.

- Gera elementos DOM (spans) que mostram o nome do entregador, o número da entrega e o motivo para entregas extras.
- Os spans contêm a classe `class-update-name-${deliveryPersonId}`, permitindo a atualização simultânea do nome do entregador no relatório caso isso seja alterado no input.

## Dependências
- Nenhuma função externa é necessária para o funcionamento desta função.

## Parâmetros
- **`deliveryPersonId`**: O ID do entregador.
- **`numberOfExtra`**: O número de entregas extras a serem exibidas.
- **`div`**: O elemento DOM onde os campos de exibição serão adicionados.

## Funcionamento
1. Cria um loop que itera de 0 até `numberOfExtra`.
2. Para cada iteração, cria um novo elemento `<div>` que serve como contêiner para os campos de exibição das entregas extras.
3. Define a classe do `<div>` com base no `deliveryPersonId`.
4. Cria um `<span>` para exibir o nome do entregador, obtendo o valor do input correspondente no DOM.
5. Cria um `<span>` para exibir o número da entrega e outro `<span>` para o motivo da entrega extra.
6. Anexa os spans ao contêiner `<div>` e, em seguida, adiciona este contêiner ao elemento `div` passado como parâmetro.

## Observações
- A função não retorna nenhum valor; ela apenas modifica o DOM ao adicionar novos elementos.
- A estrutura gerada permite fácil acesso e manipulação das informações das entregas extras no relatório.


