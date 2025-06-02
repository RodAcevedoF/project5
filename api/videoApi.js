import { authAxios } from "../utils/authAxios";

export const createVideo = async (videoData) => {
  try {
    const response = await authAxios.post("videos", videoData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creando el video:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error creando el video"
    };
  }
};

export const getVideos = async (limit = 10, offset = 0) => {
  try {
    const response = await authAxios.get("videos", {
      params: { limit, offset }
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error obteniendo los videos:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error obteniendo los videos"
    };
  }
};

export const updateVideo = async (id, updateData) => {
  try {
    const response = await authAxios.patch(`videos/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(
      "Error actualizando el video:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error actualizando el video"
    };
  }
};

export const deleteVideo = async (id) => {
  try {
    const response = await authAxios.delete(`videos/${id}`);
    if (response.status === 204) {
      return { success: true };
    }
    return response.data;
  } catch (error) {
    console.error(
      "Error eliminando el video:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error eliminando el video"
    };
  }
};
