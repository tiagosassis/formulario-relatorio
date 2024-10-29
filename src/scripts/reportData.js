export const reportData = []

export function updateReportDataFromInputs() {
    // Limpa o array antes de preencher novamente
    reportData.length = 0

    document.querySelectorAll(".excel-sheet-data").forEach(div => {
        const deliveryPersonId = div.querySelector("div > input").id.match(/\d+/g)[0];
        const name = div.querySelector(`#delivery-person-name-${deliveryPersonId}`).value
        const payment = document.querySelector(`#textField-payment-${deliveryPersonId}`).textContent

        const rowData = {
            Nome: name,
            Pagamento: payment
        }
        reportData.push(rowData);
    })
}

export function exportReportToExcel() {
    updateReportDataFromInputs();
    const filename = "Relatorio.xlsx";

    // Crie uma nova planilha e adicione os dados do relatório
    const worksheet = XLSX.utils.json_to_sheet(reportData, { origin: { r: 1, c: 1 } });

    // Crie o workbook e adicione a worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Relatório");

    // Gera o arquivo e faz o download
    XLSX.writeFile(workbook, filename);
}
