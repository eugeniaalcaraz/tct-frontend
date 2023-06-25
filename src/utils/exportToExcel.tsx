import ExcelJS from "exceljs";

export const exportToExcel = (headers, rows) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.columns = headers;
    rows.map((row) => sheet.addRow(row));
    workbook.xlsx.writeBuffer().then(function (data) {
        const blob = new Blob([data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "productos.xlsx";
        anchor.click();
        window.URL.revokeObjectURL(url);
    });
};
