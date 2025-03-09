export const formatDate = (dateString) => {
  if (!dateString) return ''; // Vérifie que la chaîne est définie
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ''; // Vérifie que la date est valide
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).format(date);
};
