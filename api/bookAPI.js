import axios from "axios";

const API_URL = "https://service.todo-api.site/api/books";

export const createBook = async (bookData) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    for (let key in bookData) {
      if (bookData.hasOwnProperty(key)) {
        formData.append(key, bookData[key]);
      }
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error creando el libro:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Error creando el libro" };
  }
};

export const getBooks = async (limit = 10, offset = 0) => {
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
      "Error obteniendo los libros:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error obteniendo los libros"
    };
  }
};

export const updateBook = async (id, updateData) => {
  try {
    const token = localStorage.getItem("token");

    const hasFile = updateData.cover_image instanceof File;

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
      "Error actualizando el libro:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error actualizando el libro"
    };
  }
};

export const deleteBook = async (id) => {
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
      "Error eliminando el libro:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error eliminando el libro"
    };
  }
};
