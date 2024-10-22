const html = document.querySelector('html')
const darkModeIcon = document.querySelector('span.dark-mode')
const lightModeIcon = document.querySelector('span.light-mode')

export function detectUserTheme() {
    /**
     * Detecta e aplica o tema preferido do usuário.
     * Verifica se o tema foi salvo anteriormente no localStorage. Se houver um tema salvo, ele é aplicado (dark ou light).
     * Caso contrário, a função detecta o tema preferido do navegador do usuário (modo claro ou escuro).
     * Atualiza o ícone de tema correspondente.
     */
    const savedTheme = localStorage.getItem('theme')
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if(savedTheme){
        if (savedTheme === 'dark') {
            html.classList.add(`${savedTheme}-mode`)
            toggleThemeIcon()
        }
        else {
            html.classList.remove('dark-mode')
        }
    } else if (prefersDarkScheme) {
        html.classList.add('dark-mode')
        toggleThemeIcon()
    }
}

export function darkMode() {
    /**
     * Alterna entre o modo claro e escuro do site.
     * Atualiza o ícone do tema e salva a preferência do usuário no localStorage.
     */

    html.classList.toggle('dark-mode')

    toggleThemeIcon()

    html.classList.contains('dark-mode') ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light')
}

function toggleThemeIcon() {
    /**
     * Alterna a exibição dos ícones de tema claro e escuro.
     * Mostra o ícone correspondente ao tema ativo (dark ou light mode).
     */
    
    darkModeIcon.classList.toggle('hidden')
    lightModeIcon.classList.toggle('hidden')
}