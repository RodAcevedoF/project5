import axios from "axios";

const API_URL = "https://api-to-do.duckdns.org/api/videos";

export const createVideo = async (videoData) => {
  try {
    const token = localStorage.getItem("token");

    const { channelTitle, ...rest } = videoData;
    const formattedData = { ...rest, channel: channelTitle };

    console.log("📤 Enviando formattedData:", formattedData);

    const response = await axios.post(
      "https://api-to-do.duckdns.org/api/videos",
      formattedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

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
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
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
    const token = localStorage.getItem("token");

    const hasFile = updateData.thumbnail instanceof File;

    let response;
    if (hasFile) {
      const formData = new FormData();
      for (let key in updateData) {
        if (updateData.hasOwnProperty(key)) {
          formData.append(key, updateData[key]);
        }
      }

      response = await axios.patch(`${API_URL}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      response = await axios.patch(`${API_URL}/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
    }

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
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

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
