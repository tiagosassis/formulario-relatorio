# Documentação da Função `copyContent()`

## Descrição
Copia o conteúdo do relatório final para a área de transferência e exibe um popup de confirmação.

- **Parâmetros:** Nenhum.

## Dependências
- Requer a função `showPopup()` para exibir a confirmação de cópia bem-sucedida.
- Depende da função `switchDisplay()` para alternar a visibilidade do conteúdo antes e depois da cópia.

## Funcionamento
1. Obtém o conteúdo do relatório através do elemento com o ID `report-content`.
2. Alterna a visibilidade do conteúdo com a função `switchDisplay()` mudando o display no css para 'content' e deixando o texto no formatação correta para ser copiado
para garantir que a área correta seja copiada.
3. Copia o texto obtido para a área de transferência utilizando `navigator.clipboard.writeText`.
4. Em caso de sucesso, chama a função `showPopup()` para exibir o popup de confirmação.
5. Caso ocorra algum erro, exibe um alerta informando o problema ao usuário.
6. Alterna novamente a visibilidade do conteúdo ao final.

___

# Documentação da Função `showPopup()`

## Descrição
Exibe um popup de confirmação e o oculta automaticamente após 3 segundos.

- A função adiciona e remove a classe `show` ao elemento popup para controlar sua visibilidade temporária.

## Dependências
- **Elemento com ID `popup`**: Deve estar presente no HTML e configurado para a aparência de "mostrar/ocultar" com a classe `show`.

## Parâmetros
- Nenhum parâmetro é necessário para o funcionamento desta função.

## Funcionamento
1. Seleciona o elemento com o ID `popup` no DOM.
2. Adiciona a classe `show` ao elemento, tornando-o visível na página.
3. Utiliza `setTimeout` para remover a classe `show` do elemento após 3 segundos, ocultando-o automaticamente.

___

# Documentação da Função `switchDisplay()`

## Descrição
Alterna a visibilidade dos elementos `<span>`, ajustando o layout para uma melhor formatação do texto copiado.

- Adiciona ou remove a classe `content` de cada `<span>` selecionado para alterar sua visibilidade.

## Dependências
- Nenhuma função externa é necessária para o funcionamento desta função.

## Parâmetros
- Nenhum parâmetro é necessário para o funcionamento desta função.

## Funcionamento
1. Seleciona todos os elementos `<span>` na página usando `document.querySelectorAll('span')`.
2. Para cada `<span>`, utiliza `classList.toggle('content')` para alternar a presença da classe `content`, controlando sua visibilidade e formatação para que o texto seja copiado.