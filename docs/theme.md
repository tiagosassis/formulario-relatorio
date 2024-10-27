# Documentação da Função `detectUserTheme()`

## Descrição
Detecta e aplica o tema preferido do usuário.

- Verifica se um tema foi salvo anteriormente no `localStorage`. Se houver um tema salvo, ele é aplicado (dark ou light).
- Caso contrário, a função detecta o tema preferido do navegador do usuário (modo claro ou escuro).
- Atualiza o ícone de tema correspondente.

## Dependências
- `toggleThemeIcon()`: Função responsável por atualizar o ícone do tema.

## Funcionamento
1. Obtém o tema salvo no `localStorage`.
2. Verifica se o navegador do usuário prefere um esquema de cores escuro.
3. Se houver um tema salvo e for 'dark', aplica a classe `dark-mode` ao elemento HTML e chama `toggleThemeIcon()`.
4. Se o tema salvo for diferente de 'dark', remove a classe `dark-mode` do elemento HTML.
5. Se não houver tema salvo e o usuário preferir um esquema escuro, aplica a classe `dark-mode` e chama `toggleThemeIcon()`.

## Observações
- A função aplica o tema preferido do usuário e garante que a interface fique consistente com suas preferências visuais.