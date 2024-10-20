export function copyContent() { // copia o relatorio pronto
    const report = document.getElementById('report-content')
    
    switchDisplay()

    // Copia o conteúdo
    const reportContent = report.innerText;

    navigator.clipboard.writeText(reportContent).then(() => {
        showPopup(); // Função para exibir o popup
    }).catch((err) => {
        alert('Erro ao copiar: ' + err)
    })

    switchDisplay()
}

function showPopup() { // Função para mostrar o popup e escondê-lo depois de 3 segundos
    const popup = document.getElementById('popup')
    popup.classList.add('show')
    
    setTimeout(() => {
        popup.classList.remove('show')
    }, 3000); // O popup desaparece após 3 segundos
}

function switchDisplay() {
    const spans = document.querySelectorAll('span')
    
    // Muda o display para contents para mudar a disposição dos caracteres e o texto copiado ficar mais organizado
    spans.forEach(span => {
        span.classList.toggle('content')
    })
}