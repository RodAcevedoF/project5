import axios from "axios";

const API_KEY = "424d07b523ca4860b52104831252602";
const DEFAULT_LOCATION = "Madrid";

// Crear una instancia de axios sin el interceptor
const axiosNoAuthWeather = axios.create();

export const getWeatherData = async () => {
  try {
    let location = DEFAULT_LOCATION;

    if ("geolocation" in navigator) {
      try {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        location = `${lat},${lon}`;
      } catch (error) {
        console.warn(
          "No se pudo obtener la ubicación, usando ubicación predeterminada."
        );
      }
    }

    const response = await axiosNoAuthWeather.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: { key: API_KEY, q: location, aqi: "no" }
      }
    );

    const { current, location: loc } = response.data;

    return {
      city: loc.name,
      temperature: current.temp_c,
      humidity: current.humidity,
      feel: current.feelslike_c,
      iconUrl: current.condition.icon ? `https:${current.condition.icon}` : ""
    };
  } catch (error) {
    console.error("Error obteniendo el clima:", error);
    return null;
  }
};
