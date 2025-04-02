import axios from "axios";

const API_URL = "https://service.todo-api.site/api/books";

export const createBook = async (bookData) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    for (let key in bookData) {
      if (bookData.hasOwnProperty(key)) {
        if (Array.isArray(bookData[key])) {
          // Procesar arreglos (ej.: categorías)
          formData.append(key, JSON.stringify(bookData[key]));
        } else {
          formData.append(key, bookData[key]);
        }
      }
    }

    const response = await axios.post(API_URL, formData, {
      headers: { Authorization: `Bearer ${token}` },
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
    }); // Verifica que la respuesta sea un arreglo de libros
   const books = Array.isArray(response.data.data) 
      ? response.data.data.filter(book => book.id && book.title) // Solo incluir libros válidos
      : [];
      const books2 = Array.isArray(response.data.data) 
      ? response.data.data.filter(book => book.id && book.title) // Solo incluir libros válidos
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
    const token = localStorage.getItem("token");

    const hasFile = updateData.cover_image instanceof File;

    let response;
    if (hasFile) {
      const formData = new FormData();
      for (let key in updateData) {
        if (updateData.hasOwnProperty(key)) {
          if (Array.isArray(updateData[key])) {
            // Si el campo es un arreglo (ej: categorías), convertirlo a JSON
            formData.append(key, JSON.stringify(updateData[key]));
          } else {
            formData.append(key, updateData[key]);
          }
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

export const getBookCount = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.data.length; // Devuelve el número de libros guardados por el usuario
  } catch (error) {
    console.error('Error obteniendo el número de libros:', error);
    return 0;
  }
};
