import axios from "axios";
import { getState, setState } from "./state";

export const getPopularCategories = async () => {
  try {
    // Definimos un array de palabras clave para obtener un abanico más amplio de categorías
    const keywords = [
      "fiction",
      "science",
      "history",
      "art",
      "technology",
      "romance",
      "travel"
    ];

    // Creamos un array de promesas, cada una con una consulta usando una palabra clave diferente
    const requests = keywords.map((keyword) => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=40&fields=items(volumeInfo/categories)`;
      return axios.get(url);
    });

    // Ejecutamos todas las solicitudes de forma concurrente
    const responses = await Promise.all(requests);

    // Combinamos todos los items obtenidos de cada respuesta
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

    // Extraemos y contamos las categorías
    const categoryCount = allItems
      .flatMap((item) => item.volumeInfo.categories || [])
      .reduce((acc, category) => {
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});

    // Ordenamos las categorías por la cantidad de veces que aparecen (popularidad)
    const sortedCategories = Object.keys(categoryCount).sort(
      (a, b) => categoryCount[b] - categoryCount[a]
    );

    return sortedCategories;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return [];
  }
};

// Función para cargar las categorías y almacenarlas en el estado centralizado
export const loadCategories = async () => {
  try {
    const categories = await getPopularCategories();
    setState("bookCategories", categories);
  } catch (error) {
    console.error("Error al cargar las categorías:", error);
    setState("categories", []);
  }
};
