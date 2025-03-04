import axios from "axios";

const API_KEY = "AIzaSyALGkaEf_WYxE-VRKt3HC-K1sOet6n7anE";

export const searchVideo = async (query, pageToken = "") => {
  try {
    const url = "https://www.googleapis.com/youtube/v3/search";
    const params = {
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 10,
      key: API_KEY,
      pageToken, // Cadena vacía si es la primera búsqueda
    };

    const response = await axios.get(url, { params, headers: { "Cache-Control": "no-cache" } });
    if (response.data.items) {
      const videos = response.data.items.map((item) => {
        const { title, channelTitle, description, publishedAt, thumbnails } = item.snippet;
        return {
          videoId: item.id.videoId,
          title: title || "Sin título",
          channelTitle: channelTitle || "Canal desconocido",
          description: description || "Sin descripción",
          thumbnail: thumbnails && thumbnails.high ? thumbnails.high.url : null,
          publishedAt: publishedAt || "",
          channelId: item.snippet.channelId || "",
        };
      });
      return {
        videos,
        nextPageToken: response.data.nextPageToken || "",
        totalResults: response.data.pageInfo.totalResults || 0,
      };
    }
    return { videos: [], nextPageToken: "", totalResults: 0 };
  } catch (error) {
    console.error("Error al buscar videos:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error al buscar videos" };
  }
};
