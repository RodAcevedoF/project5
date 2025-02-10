import axios from "axios";

const API_URL = "https://api-to-do.duckdns.org/api/todos";

export const createTodo = async (todoData) => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    for (let key in todoData) {
      if (todoData.hasOwnProperty(key)) {
        formData.append(key, todoData[key]);
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
    console.error("Error creating todo:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error creating todo" };
  }
};

export const getTodos = async (limit = 10, offset = 0) => {
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
    console.error("Error getting todos:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error getting todos" };
  }
};

export const updateTodo = async (id, updateData) => {
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
    console.error("Error updating todo:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error updating todo" };
  }
};

export const deleteTodo = async (id) => {
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
      console.error("Error deleting todo:", error.response?.data || error.message);
      return { error: error.response?.data?.error || "Error deleting todo" };
    }
  };

export const getTodoFile = async (filename) => {
  try {
    const response = await axios.get(`${API_URL}/file/${filename}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error getting todo file:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error getting file" };
  }
};
