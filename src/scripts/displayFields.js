// displayFields.js
// Funções para criar e gerenciar os campos de exibição de dados inseridos pelos usuários.

export function createReportExtraEmployee(extraEmployeeId) {
    /**
     * Cria dinamicamente uma nova seção no relatório para exibir as informações dos funcionários extras.
     * O novo div contém três spans para exibir o nome, pagamento diário e chave Pix do funcionário.
     * 
     * @param {number} extraEmployeeId - O ID do funcionário extra utilizado para gerar os IDs dos elementos.
     * 
     * Estrutura HTML gerada:
     * <div id="report-freelancer-{extraEmployeeId}">
     *     <span id="textField-employee-name-{extraEmployeeId}">- </span>
     *     <span id="textField-employee-daily-payment-{extraEmployeeId}"></span>
     *     <span id="textField-employee-pix-key-{extraEmployeeId}"></span>
     * </div>
     */

    const container = document.getElementById('report-freelancer')
    const div = document.createElement('div')
    let span
    div.setAttribute('id', `report-freelancer-${extraEmployeeId}`)
    span = document.createElement('span')
    span.setAttribute('id', `textField-employee-name-${extraEmployeeId}`)
    div.appendChild(span)

    span = document.createElement('span')
    span.setAttribute('id', `textField-employee-daily-payment-${extraEmployeeId}`)
    div.appendChild(span)

    span = document.createElement('span')
    span.setAttribute('id', `textField-employee-pix-key-${extraEmployeeId}`)
    div.appendChild(span)

    container.appendChild(div)
}