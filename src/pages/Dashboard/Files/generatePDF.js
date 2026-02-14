import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

export function generateFilesPDF(files) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Zestawienie plików", 14, 18);

  const tableData = files.map((f, i) => [
    String(i + 1),
    String(f.name || ""),
    String(f.attachmentName || ""),
    String(f.date || ""),
    String(f.category || "-"),
  ]);

  autoTable(doc, {
    head: [["#", "Nazwa płatności", "Plik", "Data", "Kategoria"]],
    body: tableData,
    startY: 28,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [102, 126, 234] },
  });

  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    const link = document.createElement("a");
    link.href = url;
    link.download = "zestawienie-plikow.pdf";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
}
