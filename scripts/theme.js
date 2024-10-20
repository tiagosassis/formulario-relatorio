const html = document.querySelector('html')
const darkModeIcon = document.querySelector('span.dark-mode')
const lightModeIcon = document.querySelector('span.light-mode')

export function detectUserTheme() {
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
    
    html.classList.toggle('dark-mode')

    toggleThemeIcon()

    html.classList.contains('dark-mode') ? localStorage.setItem('theme', 'dark') : localStorage.setItem('theme', 'light')
}

function toggleThemeIcon() {
    darkModeIcon.classList.toggle('hidden')
    lightModeIcon.classList.toggle('hidden')
}