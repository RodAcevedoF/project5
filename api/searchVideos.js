import axios from "axios";

const API_KEY = "AIzaSyALGkaEf_WYxE-VRKt3HC-K1sOet6n7anE";
const axiosNoAuth = axios.create();

export const searchVideo = async (
  query,
  pageToken = "",
  videoDuration = "medium",
  order = "relevance"
) => {
  try {
    const searchUrl = "https://www.googleapis.com/youtube/v3/search";

    const searchParams = {
      part: "snippet",
      q: query,
      type: "video",
      maxResults: 10,
      key: API_KEY,
      pageToken,
      videoDuration,
      order
    };

    const searchResponse = await axiosNoAuth.get(searchUrl, {
      params: searchParams,
      headers: { "Cache-Control": "no-cache" }
    });

    const searchItems = searchResponse.data.items || [];

    // Extraer IDs de los videos encontrados
    const videoIds = searchItems.map((item) => item.id.videoId).join(",");

    if (!videoIds) {
      return { videos: [], nextPageToken: "", totalResults: 0 };
    }

    // Segunda llamada para obtener detalles (duración y vistas)
    const videosUrl = "https://www.googleapis.com/youtube/v3/videos";
    const videosParams = {
      part: "contentDetails,statistics",
      id: videoIds,
      key: API_KEY
    };

    const videosResponse = await axiosNoAuth.get(videosUrl, {
      params: videosParams
    });

    const videoDetailsMap = new Map();
    videosResponse.data.items.forEach((item) => {
      videoDetailsMap.set(item.id, {
        duration: item.contentDetails.duration,
        views: item.statistics.viewCount
      });
    });

    // Combinar datos
    const videos = searchItems.map((item) => {
      const id = item.id.videoId;
      const {
        title,
        channelTitle,
        description,
        publishedAt,
        thumbnails,
        channelId
      } = item.snippet;
      const details = videoDetailsMap.get(id) || {};

      return {
        video_id: id,
        title: title || "Sin título",
        channel: channelTitle || "Canal desconocido",
        description: description || "Sin descripción",
        thumbnail: thumbnails?.high?.url || null,
        created_at: publishedAt || "",
        channelId: channelId || "",
        duration: details.duration || "Desconocido",
        views: details.views || "0"
      };
    });

    return {
      videos,
      nextPageToken: searchResponse.data.nextPageToken || "",
      totalResults: searchResponse.data.pageInfo.totalResults || 0
    };
  } catch (error) {
    console.error(
      "Error al buscar videos:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Error al buscar videos" };
  }
};
