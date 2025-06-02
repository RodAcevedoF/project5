import { authAxios } from "../utils/authAxios";

const API_URL = "https://service.todo-api.site/api/todos";

export const createTodo = async (todoData) => {
  try {
    const response = await authAxios.post("todos", todoData);

    return response.data;
  } catch (error) {
    console.error(
      "Error creating todo:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Error creating todo" };
  }
};

export const getTodos = async (limit = 10, offset = 0) => {
  try {
    const response = await authAxios.get("todos", {
      params: { limit, offset }
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error getting todos:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Error getting todos" };
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
