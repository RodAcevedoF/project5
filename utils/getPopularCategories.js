import axios from "axios";
import { setState } from "./state";

export const getPopularCategories = async () => {
  try {
    const keywords = [
      "fiction",
      "science",
      "history",
      "art",
      "technology",
      "romance",
      "travel"
    ];

    const requests = keywords.map((keyword) => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=40&fields=items(volumeInfo/categories)`;
      return axios.get(url);
    });

    const responses = await Promise.all(requests);

    const allItems = responses.reduce((acc, response) => {
      if (response.data?.items && Array.isArray(response.data.items)) {
        return acc.concat(response.data.items);
      }
      return acc;
    }, []);

    if (allItems.length === 0) {
      console.warn(
        "No se han encontrado categorías en las respuestas de la API."
      );
      return [];
    }

    const categoryCount = allItems
      .flatMap((item) => item.volumeInfo.categories || [])
      .reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

    const sortedCategories = Object.keys(categoryCount).sort(
      (a, b) => categoryCount[b] - categoryCount[a]
    );

    return sortedCategories;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return [];
  }
};

export const loadCategories = async () => {
  try {
    const categories = await getPopularCategories();
    setState("bookCategories", categories);
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
    setState("categories", []);
  }
};
