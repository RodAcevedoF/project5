import axios from "axios";

export const searchBook = async (
  query = "",
  startIndex = 0,
  maxResults = 10,
  category = "",
  maxPages = Infinity
) => {
  try {
    // Construye dinámicamente el parámetro de búsqueda
    let searchQuery = query ? encodeURIComponent(query) : "";
    if (category) {
      searchQuery += (searchQuery ? "+" : "") + `subject:${encodeURIComponent(category)}`;
    }

    // Construye la URL de la API
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}&random=${Math.random()}`;

    const response = await axios.get(url, {
      headers: { "Cache-Control": "no-cache" }
    });

    if (response.data.items) {
      const books = response.data.items
        .map((item) => {
          const {
            title,
            authors = [],
            description,
            publisher,
            publishedDate,
            imageLinks,
            industryIdentifiers,
            pageCount,
            categories
          } = item.volumeInfo;

          // Verifica si publishedDate es solo el año (ej. "2023")
          let fullPublishedDate = publishedDate;
          if (publishedDate && /^\d{4}$/.test(publishedDate)) {
            fullPublishedDate = `${publishedDate}-01-01`;
          }

          const isbn = industryIdentifiers
            ? industryIdentifiers.find((id) => id.type === "ISBN_13")?.identifier ||
              industryIdentifiers.find((id) => id.type === "ISBN_10")?.identifier ||
              "ISBN not available"
            : "ISBN not available";

          return {
            apiId: item.id,
            title: title || "No Title",
            author: authors.length > 0 ? authors[0] : "Unknown author",
            description: description || "No description",
            publisher: publisher || "No description",
            publish_date: fullPublishedDate || "No description",
            cover_image: imageLinks ? imageLinks.thumbnail : null,
            isbn,
            pages: pageCount || null,
            categories: categories || []
          };
        })
        .filter((book) => book.pages === null || book.pages <= maxPages); // Filtra por cantidad de páginas

      return { books, totalItems: response.data.totalItems };
    }

    return { books: [], totalItems: 0 };
  } catch (error) {
    console.error("Error retrieving books:", error.response?.data || error.message);
    return { error: error.response?.data?.error || "Error retrieving books" };
  }
};
