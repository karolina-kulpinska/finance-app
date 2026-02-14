import jsPDF from "jspdf";
import "jspdf-autotable";

export function generatePaymentsPDF(payments) {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Historia płatności", 14, 18);

  const tableData = payments.map((p, i) => [
    i + 1,
    p.name || "-",
    p.amount != null ? p.amount + " zł" : "-",
    p.date || "-",
    p.category || "-",
    p.paid ? "TAK" : "NIE",
    p.bank || "-",
  ]);

  doc.autoTable({
    head: [["#", "Nazwa", "Kwota", "Data", "Kategoria", "Opłacone", "Bank"]],
    body: tableData,
    startY: 28,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [102, 126, 234] },
  });

  doc.save("historia-platnosci.pdf");
}
