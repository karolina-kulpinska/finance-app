import jsPDF from "jspdf";
import "jspdf-autotable";

export function generateFilesPDF(files) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Zestawienie plików", 14, 18);

  const tableData = files.map((f, i) => [
    i + 1,
    f.name,
    f.attachmentName,
    f.date,
    f.category || "-",
  ]);

  doc.autoTable({
    head: [["#", "Nazwa płatności", "Plik", "Data", "Kategoria"]],
    body: tableData,
    startY: 28,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [102, 126, 234] },
  });

  doc.save("zestawienie-plikow.pdf");
}
