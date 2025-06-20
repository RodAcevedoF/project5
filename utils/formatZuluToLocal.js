export const formatZuluToLocal = (zulu) => {
  if (!zulu) return "No data yet";
  const date = new Date(zulu);
  return date.toLocaleString();
};

export const formatZuluToLocalDateOnly = (zulu) => {
  if (!zulu) return "No data yet";
  const date = new Date(zulu);
  return date.toLocaleDateString(); // e.g. "6/20/2025" (USA) or "20/6/2025" (EU)
};
