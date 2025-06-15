export const formatZuluToLocal = (zulu) => {
  if (!zulu) return "No data yet";
  const date = new Date(zulu);
  return date.toLocaleString();
};
