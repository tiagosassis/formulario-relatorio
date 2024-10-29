import { createDateTimeInfo } from "./utils.js";

export const reportData = [];

export function updateReportDataFromInputs() {
    // Limpa o array antes de preencher novamente
    reportData.length = 0;

    const time = createDateTimeInfo();

    document.querySelectorAll(".excel-sheet-data").forEach(div => {
        const deliveryPersonId = div.querySelector("div > input").id.match(/\d+/g)[0];
        const name = div.querySelector(`#delivery-person-name-${deliveryPersonId}`).value;
        const payment = document.querySelector(`#textField-payment-${deliveryPersonId}`).textContent;

        // Cria um objeto com as informações de nome e pagamento
        const rowData = { Nome: name, Pagamento: payment };
        reportData.push(rowData);
    });
}

export function exportReportToExcel() {
    updateReportDataFromInputs();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Relatório");

    // Define o cabeçalho principal com o turno e data na primeira célula
    const time = createDateTimeInfo();
    const headerTitle = time.turn === 'Morning' 
        ? `Almoço ${time.day} / ${time.month}` 
        : `Noite ${time.day} / ${time.month}`;

    // Adiciona o título do turno e data e mescla as duas colunas
    worksheet.mergeCells('B1:C1');
    worksheet.getCell('B1').value = headerTitle;
    worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };

    // Adiciona as colunas "Nome" e "Pagamento" abaixo do cabeçalho
    worksheet.getCell('B2').value = 'Nome';
    worksheet.getCell('C2').value = 'Pagamento';

    // Insere os dados de nome e pagamento a partir da linha 3 e aplica a cor amarela às células de pagamento
    reportData.forEach((data, index) => {
        const rowIndex = index + 3;
        worksheet.getCell(`B${rowIndex}`).value = data.Nome;
        worksheet.getCell(`C${rowIndex}`).value = data.Pagamento;

        // Define a cor de preenchimento da célula de pagamento
        worksheet.getCell(`C${rowIndex}`).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF00' } // Amarelo marca-texto
        };
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
