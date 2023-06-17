export const exportToExcel = (filename, rows) => {
    const processRow = (row) => {
      let finalVal = "";
      for (let j = 0; j < row.length; j++) {
        let innerValue =
          row[j] === null || row[j] === undefined ? "" : row[j].toString();
        if (row[j] instanceof Date) {
          innerValue = row[j].toLocaleString();
        }
        let result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
        if (j > 0) finalVal += ",";
        finalVal += result;
      }
      return finalVal + "\n";
    };
  
    let xlsFile = "";
    for (let i = 0; i < rows.length; i++) {
      xlsFile += processRow(rows[i]);
    }
  
    const blob = new Blob([xlsFile], {
      type: "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64",
    });
  
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };