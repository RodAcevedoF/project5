import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_BASE = import.meta.env.VITE_WEATHER_API_BASE;
const DEFAULT_LOCATION = import.meta.env.VITE_WEATHER_DEFAULT_LOCATION;

const axiosNoAuthWeather = axios.create();

export const weatherIconMap = {
  clear_day: "/icon/weathericons/sunicon.png",
  clear_night: "/icon/weathericons/moonicon.png",
  cloudy: "/icon/weathericons/cloudyicon.png",
  cloudyNight: "/icon/weathericons/cloudynighticon.png",
  rain: "/icon/weathericons/rainyicon.png",
  snow: "/icon/weathericons/snowicon.png",
  foggyDay: "/icon/weathericons/foggydayicon.png",
  foggyNight: "/icon/weathericons/foggyNighticon.png",
  cold: "/icon/weathericons/coldicon.png",
  hot: "/icon/weathericons/hoticon.png",
  sunset: "/icon/weathericons/sunseticon.png"
};

const resolveIconKey = ({ is_day, temp_c, conditionText }) => {
  const desc = conditionText.toLowerCase();

  if (temp_c >= 30) return "hot";
  if (temp_c <= 5) return "cold";

  if (desc.includes("clear") || desc.includes("sunny")) {
    return is_day ? "clear_day" : "clear_night";
  }

  if (desc.includes("cloud") || desc.includes("overcast")) {
    return is_day ? "cloudy" : "cloudyNight";
  }

  if (desc.includes("rain") || desc.includes("drizzle")) return "rain";
  if (desc.includes("snow")) return "snow";
  if (desc.includes("fog") || desc.includes("mist")) {
    return is_day ? "foggyDay" : "foggyNight";
  }

  return is_day ? "clear_day" : "clear_night";
};

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
      } catch {
        console.warn("Could not find your location, using default location.");
      }
    }

    const response = await axiosNoAuthWeather.get(API_BASE, {
      params: { key: API_KEY, q: location, aqi: "no" }
    });

    const { current, location: loc } = response.data;

    const iconKey = resolveIconKey({
      is_day: current.is_day === 1,
      temp_c: current.temp_c,
      conditionText: current.condition.text
    });

    return {
      city: loc.name,
      temperature: current.temp_c,
      humidity: current.humidity,
      feel: current.feelslike_c,
      iconKey
    };
  } catch (error) {
    console.error("Error obtaining weather data:", error);
    return null;
  }
};
