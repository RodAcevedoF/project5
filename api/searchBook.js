import axios from "axios";

export const searchBook = async (query, startIndex = 0, maxResults = 10) => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}&random=${Math.random()}`;
    
    const response = await axios.get(url, { headers: { "Cache-Control": "no-cache" } });
    
    if (response.data.items) {
      const books = response.data.items.map(item => {
        const { title, authors, description, publisher, publishedDate, imageLinks } = item.volumeInfo;
        return {
          apiId: item.id,
          title: title || "Sin título",
          author: authors ? authors.join(", ") : "Autor desconocido",
          description: description || "Sin descripción",
          publisher: publisher || "",
          publishedDate: publishedDate || "",
          cover_image: imageLinks ? imageLinks.thumbnail : null
        };
      });
      return { books, totalItems: response.data.totalItems };
    }
    return { books: [], totalItems: 0 };
  } catch (error) {
    console.error("Error buscando libros:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error buscando libros" };
  }
};
