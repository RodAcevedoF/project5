import axios from "axios";

const API_URL = "https://service.todo-api.site/api/videos";

export const createVideo = async (videoData) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(API_URL, videoData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

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
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: { limit, offset }
    });
    console.log(response.data);
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
    const token = localStorage.getItem("accessToken");

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
    const token = localStorage.getItem("accessToken");

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
