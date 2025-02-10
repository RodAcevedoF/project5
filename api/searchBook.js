import axios from "axios";

export const searchBook = async (query) => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}`;
    const response = await axios.get(url);

    if (response.data.items) {
      const books = response.data.items.map((item) => {
        const volumeInfo = item.volumeInfo;
        return {
          apiId: item.id, // Id proveniente de la API pública.
          title: volumeInfo.title || "Sin título",
          author: volumeInfo.authors
            ? volumeInfo.authors.join(", ")
            : "Autor desconocido",
          // Usamos description para mostrar una descripción breve.
          description: volumeInfo.description || "Sin descripción",
          // Datos adicionales:
          publisher: volumeInfo.publisher || "",
          publishedDate: volumeInfo.publishedDate || "",
          // Se obtiene la imagen de portada si existe.
          cover_image: volumeInfo.imageLinks
            ? volumeInfo.imageLinks.thumbnail
            : null
        };
      });
      return books;
    } else {
      return [];
    }
  } catch (error) {
    console.error(
      "Error searching public books:",
      error.response?.data || error.message
    );
    return {
      error: error.response?.data?.error || "Error searching public books"
    };
  }
};
