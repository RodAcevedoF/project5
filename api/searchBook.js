import axios from "axios";

const axiosNoAuth = axios.create();

export const searchBook = async (
  query = "",
  startIndex = 0,
  maxResults = 12,
  category = "",
  maxPages = Infinity
) => {
  try {
    let searchQuery = query ? encodeURIComponent(query) : "";
    if (category) {
      searchQuery +=
        (searchQuery ? "+" : "") + `subject:${encodeURIComponent(category)}`;
    }
    const url = `${
      import.meta.env.VITE_GOOGLE_BOOKS_URL
    }/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${maxResults}&random=${Math.random()}`;

    const response = await axiosNoAuth.get(url, {
      headers: { "Cache-Control": "no-cache" }
    });

    if (response.data.items) {
      const books = response.data.items
        .map((item) => {
          const info = item.volumeInfo || {};
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
          } = info;

          let fullPublishedDate = publishedDate;
          if (/^\d{4}$/.test(publishedDate)) {
            fullPublishedDate = `${publishedDate}-01-01`;
          } else if (/^\d{4}-\d{2}$/.test(publishedDate)) {
            fullPublishedDate = `${publishedDate}-01`;
          }

          const isbn = industryIdentifiers
            ? industryIdentifiers.find((id) => id.type === "ISBN_13")
                ?.identifier ||
              industryIdentifiers.find((id) => id.type === "ISBN_10")
                ?.identifier ||
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
            pages: pageCount || 0,
            categories: categories || []
          };
        })
        .filter(
          (book) =>
            book.pages === "Unknown" ||
            (typeof book.pages === "number" && book.pages <= maxPages)
        );

      return { books, totalItems: response.data.totalItems };
    }
    return { books: [], totalItems: 0 };
  } catch (error) {
    console.error(
      "Error retrieving books:",
      error.response?.data || error.message
    );
    return { error: error.response?.data?.error || "Error retrieving books" };
  }
};
