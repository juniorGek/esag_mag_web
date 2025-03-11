import jsPDF from "jspdf";
import QRCode from "qrcode";

export async function generateTicketPDFs(tickets, event) {
  // Itération sur le tableau de tickets pour créer et télécharger un PDF par ticket
  for (let i = 0; i < tickets.length; i++) {
    const ticket = tickets[i];
    // Création d'un document au format A5 pour chaque ticket
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a5"
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Fond moderne en gris très clair
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Bordure subtile du ticket
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // Affichage du nom de l'événement (centré, en gras)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(33, 33, 33);
    doc.text(event.titre, pageWidth / 2, 25, { align: "center" });

    // Affichage de la date et du lieu en dessous
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Date : ${new Date(event.date).toLocaleDateString()}`, pageWidth / 2, 35, { align: "center" });
    doc.text(`Lieu : ${event.lieu}`, pageWidth / 2, 43, { align: "center" });

    // Ligne décorative pour séparer l'en-tête du QR code
    doc.setLineWidth(0.5);
    doc.setDrawColor(180, 180, 180);
    doc.line(10, 48, pageWidth - 10, 48);

    // Génération du QR code à partir d'un identifiant ou code spécifique au ticket
    // (Assurez-vous que chaque ticket possède une propriété "code" ou adaptez en conséquence)
    const qrCodeDataUrl = await QRCode.toDataURL(ticket.code);
    const qrSize = 50;
    const qrX = (pageWidth - qrSize) / 2;
    doc.addImage(qrCodeDataUrl, "PNG", qrX, 55, qrSize, qrSize);

    // Affichage d'une information propre au ticket (par exemple, son numéro)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(33, 33, 33);
    doc.text(`Ticket n°: ${ticket.code}`, pageWidth / 2, 115, { align: "center" });

    // Quelques motifs décoratifs pour une touche moderne
    doc.setFillColor(100, 149, 237); // bleu cornflower
    doc.circle(15, pageHeight - 15, 3, "F");
    doc.circle(pageWidth - 15, pageHeight - 15, 3, "F");

    // Message "NB" en italique et rouge, centré en bas avec découpage en lignes pour éviter le débordement
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.setTextColor(220, 20, 60); // rouge cramoisi
    const nbText = "NB : Votre ticket numérique est valable uniquement sur présentation de ce QR code.";
    const maxTextWidth = pageWidth - 20; // marge de 10mm de chaque côté
    const nbLines = doc.splitTextToSize(nbText, maxTextWidth);
    // Position verticale calculée pour que le bloc de texte tienne bien en bas
    const nbY = pageHeight - 20 - ((nbLines.length - 1) * 5);
    doc.text(nbLines, pageWidth / 2, nbY, { align: "center" });

    // Motif en filigrane avec une bordure en tirets pour un effet moderne
    doc.setDrawColor(211, 211, 211);
    doc.setLineDash([3, 3]);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    doc.setLineDash([]);

    // Génération d'une lettre majuscule aléatoire (A-Z)
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    // Génération d'un chiffre aléatoire entre 0 et 9
    const randomDigit = Math.floor(Math.random() * 10);

    // Sauvegarde et téléchargement automatique du PDF pour ce ticket
    doc.save(`ticket_${event.id}_${randomLetter}${randomDigit}.pdf`);
  }
}
