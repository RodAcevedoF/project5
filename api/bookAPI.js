import { authAxios } from "../utils/authAxios";

export const createBook = async (bookData) => {
  try {
    const formData = new FormData();

    for (let key in bookData) {
      if (bookData.hasOwnProperty(key)) {
        if (Array.isArray(bookData[key])) {
          formData.append(key, JSON.stringify(bookData[key]));
        } else {
          formData.append(key, bookData[key]);
        }
      }
    }

    const response = await authAxios.post("/books", formData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating book:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Error creatin book" };
  }
};

export const getBooks = async (limit = 10, offset = 0) => {
  try {
    const response = await authAxios.get("books", {
      params: { limit, offset }
    });

    const books = Array.isArray(response.data?.data)
      ? response.data.data.filter((book) => book.id && book.title)
      : [];

    return books;
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
    const response = await authAxios.patch(`books/${id}`, updateData, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error updating book:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error updating book"
    };
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await authAxios.delete(`books/${id}`);

    if (response.status === 204) {
      return { success: true };
    }

    return { error: "Unexpected response from server." };
  } catch (error) {
    console.error(
      "Error deleting book:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error deleting book"
    };
  }
};

export const getBookCount = async () => {
  try {
    const response = await authAxios.get("books");
    const books = Array.isArray(response.data?.data) ? response.data.data : [];
    return books.length;
  } catch (error) {
    console.error("Error fetching book count:", error);
    return 0;
  }
};
