const normalizeUrl = (value) => {
  if (!value || value.trim() === "") return null; // 👈 esto es clave
  return value.startsWith("http://") || value.startsWith("https://")
    ? value.trim()
    : `https://${value.trim()}`;
};

export default normalizeUrl;
