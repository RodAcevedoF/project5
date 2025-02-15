import axios from "axios";

const API_KEY = "AIzaSyALGkaEf_WYxE-VRKt3HC-K1sOet6n7anE";

export const searchVideo = async (query) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search`;
    const params = {
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 10,
      key: API_KEY
    };

    const response = await axios.get(url, { params });

    if (response.data.items) {
      const videos = response.data.items.map((item) => {
        const snippet = item.snippet;
        return {
          videoId: item.id.videoId, // ID del video en YouTube
          title: snippet.title || "Sin título",
          channelTitle: snippet.channelTitle || "Canal desconocido",
          description: snippet.description || "Sin descripción",
          // Obtenemos la miniatura en alta resolución si está disponible
          thumbnail:
            snippet.thumbnails && snippet.thumbnails.high
              ? snippet.thumbnails.high.url
              : null,
          publishedAt: snippet.publishedAt || "",
          channelId: snippet.channelId || ""
        };
      });
      return videos;
    } else {
      return [];
    }
  } catch (error) {
    console.error(
      "Error al buscar videos públicos:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error al buscar videos públicos"
    };
  }
};
