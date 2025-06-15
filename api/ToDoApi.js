import { authAxios } from "../utils/authAxios";

export const createTodo = async (todoData) => {
  try {
    const response = await authAxios.post("todos", todoData);
    return { success: true, data: response.data };
  } catch (error) {
    const data = error.response?.data || {};
    console.error("Error creating todo:", data);

    return {
      success: false,
      error: data.errors?.[0] || data.error || "Error creating todo",
      errors: data.errors || []
    };
  }
};

export const getTodos = async (limit = 10, offset = 0) => {
  try {
    const response = await authAxios.get("todos", {
      params: { limit, offset }
    });
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error(
      "Error getting todos:",
      error.response?.data || error.message
    );
    const data = error.response?.data || {};
    return {
      success: false,
      error: data.error || "Error getting todos"
    };
  }
};

export const updateTodo = async (id, updateData) => {
  try {
    const response = await authAxios.put(`todos/${id}`, updateData);

    return response.data;
  } catch (error) {
    console.error(
      "Error updating todo:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Error updating todo" };
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await authAxios.delete(`todos/${id}`);

    if (response.status === 204) {
      return { success: true };
    }

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting todo:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Error deleting todo" };
  }
};
