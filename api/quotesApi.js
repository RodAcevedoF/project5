import axios from "axios";

export async function getBookQuote() {
  const url = "https://dummyjson.com/quotes/random";
  try {
    const response = await axios.get(url); 
    const customData = {
      quote: response.data.quote,
      author: response.data.author
    }
    return customData;
  } catch (error) {
    console.error('Error en la API de frases:', error);
    return null;
  }
}
 
