import axios from "axios";

// Asegúrate de ajustar la URL base a la de tu API
const API_URL = "https://api-to-do.duckdns.org/api/books";

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
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating book:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error creating book" };
  }
};

export const getBooks = async (limit = 10, offset = 0) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      params: { limit, offset },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting books:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error getting books" };
  }
};

export const updateBook = async (id, updateData) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    for (let key in updateData) {
      if (updateData.hasOwnProperty(key)) {
        formData.append(key, updateData[key]);
      }
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating book:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error updating book" };
  }
};

export const deleteBook = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return { success: true };
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error deleting book" };
  }
};
