import axios from "axios";
import { setState } from "./state";

export const getPopularCategories = async () => {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=books&maxResults=40&fields=items(volumeInfo/categories)`;
    const response = await axios.get(url);

    if (!response.data.items || !Array.isArray(response.data.items)) {
      console.warn("No categories found in the API response");
      return [];
    }

    const categories = response.data.items
      .flatMap((item) => item.volumeInfo.categories || [])
      .reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1; // Contador de categorías
        return acc;
      }, {});

    // Ordena las categorías por popularidad
    return Object.keys(categories).sort((a, b) => categories[b] - categories[a]);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Función para cargar categorías y almacenarlas en el estado
export const loadCategories = async () => {
  try {
    const categories = await getPopularCategories();
    setState("categories", categories); // Guarda las categorías en el estado centralizado
  } catch (error) {
    console.error("Error loading categories:", error);
    setState("categories", []); // En caso de error, asegura un arreglo vacío
  }
};
