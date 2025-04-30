export const formatViews = (views) => {
  const num = Number(views);
  if (isNaN(num)) return "Unknown";

  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";

  return num.toLocaleString("es-ES"); // Agrega puntos o comas según la región
};

export const formatDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "Unknown";

  const [, hours, minutes, seconds] = match.map(Number);
  const h = hours || 0;
  const m = minutes || 0;
  const s = seconds || 0;

  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
};

export const formatDate = (videoDate) =>
  new Date(videoDate).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

export const convertToSeconds = (duration) => {
  const regex = /PT(\d+)M(\d+)S/;
  const match = duration.match(regex);

  if (match) {
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2], 10);
    return minutes * 60 + seconds;
  } else {
    return 0; // Si no coincide con el formato esperado, devuelve 0
  }
};

export const formatDurationSecs = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes >= 90) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, "0")} h`;
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} min`;
};
