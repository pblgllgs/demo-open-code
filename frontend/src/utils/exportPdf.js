import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function addHeader(doc, title) {
  doc.setFillColor(55, 48, 163);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text(title, 14, 19);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString("es-CL"), 196, 19, { align: "right" });
  doc.setTextColor(0, 0, 0);
}

export function exportUsersPdf(users) {
  const doc = new jsPDF();
  addHeader(doc, "Reporte de Usuarios");

  doc.setFontSize(11);
  doc.text(`Total: ${users.length}  |  Admins: ${users.filter((u) => u.role === "ADMIN").length}  |  Activos: ${users.filter((u) => u.active !== false).length}`, 14, 38);

  const rows = users.map((u) => [
    u.id,
    u.name,
    u.email,
    u.role,
    u.active !== false ? "Activo" : "Inactivo",
  ]);

  autoTable(doc, {
    startY: 44,
    head: [["ID", "Nombre", "Email", "Rol", "Estado"]],
    body: rows,
    styles: { fontSize: 9, cellPadding: 3 },
    headStyles: { fillColor: [55, 48, 163], textColor: 255 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 12 },
      3: { cellWidth: 20 },
      4: { cellWidth: 22 },
    },
  });

  doc.save("usuarios.pdf");
}

export function exportWorksPdf(works) {
  const doc = new jsPDF();
  addHeader(doc, "Reporte de Portafolio");

  doc.setFontSize(11);
  doc.text(`Total de proyectos: ${works.length}`, 14, 38);

  const rows = works.map((w) => [
    w.id,
    w.title,
    w.category,
    w.tags || "-",
    w.codeLink ? "Si" : "No",
    w.projectLink ? "Si" : "No",
  ]);

  autoTable(doc, {
    startY: 44,
    head: [["ID", "Titulo", "Categoria", "Tags", "Codigo", "Proyecto"]],
    body: rows,
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [55, 48, 163], textColor: 255 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    columnStyles: {
      0: { cellWidth: 10 },
      2: { cellWidth: 28 },
      3: { cellWidth: 45 },
    },
  });

  let y = doc.lastAutoTable.finalY + 10;
  if (y > 260) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Detalles por proyecto:", 14, y);
  y += 6;
  doc.setTextColor(0);

  works.forEach((w) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(9);
    doc.setFont(undefined, "bold");
    doc.text(`${w.title} (${w.category})`, 14, y);
    y += 5;
    doc.setFont(undefined, "normal");
    const descLines = doc.splitTextToSize(w.description || "", 180);
    doc.text(descLines, 14, y);
    y += descLines.length * 4 + 3;
  });

  doc.save("portafolio.pdf");
}
