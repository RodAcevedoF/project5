import axios from "axios";

export const searchBook = async (query, startIndex = 0, maxResults = 10) => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      query
    )}&startIndex=${startIndex}&maxResults=${maxResults}&random=${Math.random()}`;

    const response = await axios.get(url, {
      headers: { "Cache-Control": "no-cache" }
    });

    if (response.data.items) {
      const books = response.data.items.map((item) => {
        const {
          title,
          authors,
          description,
          publisher,
          publishedDate,
          imageLinks,
          industryIdentifiers
        } = item.volumeInfo;

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
          author: authors ? authors.join(", ") : "Unknown author",
          description: description || "No description",
          publisher: publisher || "",
          publishedDate: publishedDate || "",
          cover_image: imageLinks ? imageLinks.thumbnail : null,
          isbn
        };
      });

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
