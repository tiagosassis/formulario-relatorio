import { createDateTimeInfo } from "./utils.js"

export const reportData = [];

export function updateReportDataFromInputs() {
    // Limpa o array antes de preencher novamente
    reportData.length = 0;

    const time = createDateTimeInfo();

    document.querySelectorAll(".excel-sheet-data").forEach(div => {
        const deliveryPersonId = div.querySelector("div > input").id.match(/\d+/g)[0];
        const name = div.querySelector(`#delivery-person-name-${deliveryPersonId}`).value;
        const payment = document.querySelector(`#textField-payment-${deliveryPersonId}`).textContent;

        const rowData = {};
        if (time.turn === 'Morning') { // dia
            rowData[`Almoço ${time.day} / ${time.month}`] = name;
        } else { // noite
            rowData[`Noite ${time.day} / ${time.month}`] = name;
        }
        rowData[""] = payment;

        reportData.push(rowData);
    });
}

export function exportReportToExcel() {
    updateReportDataFromInputs();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Relatório");

    // Define a posição inicial para começar a tabela na célula B2
    const startRow = 3;
    const startColumn = 3;

    // Adiciona os dados da tabela a partir de B2
    reportData.forEach((data, rowIndex) => {
        const row = worksheet.getRow(startRow + rowIndex);
        let colIndex = startColumn;
        for (const key in data) {
            row.getCell(colIndex).value = data[key];
            colIndex++;
        }
        row.commit(); // Confirma a adição de cada linha
    });

    // Gera o arquivo e faz o download
    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "Relatorio.xlsx";
        link.click();
    });
}
