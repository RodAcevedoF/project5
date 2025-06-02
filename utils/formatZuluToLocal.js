export const formatZuluToLocal = (zulu) => {
  if (!zulu) return "No data";
  const date = new Date(zulu);
  return date.toLocaleString(); // Usa la configuración local del navegador
};
