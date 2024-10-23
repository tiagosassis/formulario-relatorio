export function copyContent() {
    /**
     * Copia o conteúdo do relatório para a área de transferência e exibe um popup de confirmação.
     */
    const report = document.getElementById('report-content')
    
    switchDisplay()

    const reportContent = report.innerText;

    navigator.clipboard.writeText(reportContent).then(() => {
        showPopup(); // Função para exibir o popup
    }).catch((err) => {
        alert('Erro ao copiar: ' + err)
    })

    switchDisplay()
}

function showPopup() {
    /**
     * Exibe um popup de confirmação e o oculta após 3 segundos.
     */
    const popup = document.getElementById('popup')
    popup.classList.add('show')
    
    setTimeout(() => {
        popup.classList.remove('show')
    }, 3000); // O popup desaparece após 3 segundos
}

function switchDisplay() {
    /**
     * Alterna a visibilidade dos spans, ajustando o layout para melhor formatação do texto copiado.
     */
    const spans = document.querySelectorAll('span')
    spans.forEach(span => {
        span.classList.toggle('content')
    })
}