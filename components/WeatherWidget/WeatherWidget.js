import { getWeatherData, weatherIconMap } from "../../api/weatherApi";
import "./WeatherWidget.css";

const createWeatherElement = (label, value, iconSrc, alt) => {
  const div = document.createElement("div");
  div.classList.add("weather-div");

  const text = document.createElement("p");
  text.textContent = `${label}: ${value}`;

  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.alt = alt;

  div.appendChild(text);
  div.appendChild(icon);

  return div;
};

const WeatherWidget = async () => {
  const container = document.createElement("section");
  container.classList.add("weather-widget");

  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Loading weather...";
  container.appendChild(loadingMessage);

  try {
    const weather = await getWeatherData();
    if (!weather) throw new Error("No weather data found");

    container.innerHTML = "";

    const cityElement = document.createElement("h3");
    cityElement.textContent = weather.city;

    const locationIcon = document.createElement("img");
    locationIcon.src = "/icon/weathericons/locationicon.png";
    locationIcon.alt = "location icon";
    locationIcon.classList.add("weather-icon");

    const cityDiv = document.createElement("div");
    cityDiv.classList.add("weather-div");
    cityDiv.appendChild(cityElement);
    cityDiv.appendChild(locationIcon);
    container.appendChild(cityDiv);

    const weatherIcon =
      weatherIconMap[weather.iconKey] ||
      "/icon/weathericons/fallbackweather.png";

    container.appendChild(
      createWeatherElement(
        "Temp",
        `${weather.temperature}°C`,
        weatherIcon,
        "Weather icon"
      )
    );
    container.appendChild(
      createWeatherElement(
        "Humidity",
        `${weather.humidity}%`,
        "/icon/weathericons/humidityicon.png",
        "humidity icon"
      )
    );
    container.appendChild(
      createWeatherElement(
        "Feel",
        `${weather.feel}°C`,
        "/icon/weathericons/feelsicon.png",
        "feels icon"
      )
    );

    const timeElement = document.createElement("p");
    timeElement.classList.add("time-element");
    const updateDynamicTime = () => {
      const currentTime = new Date();
      timeElement.textContent = `Time: ${currentTime.toLocaleTimeString(
        "es-ES",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }
      )}`;
    };
    updateDynamicTime();
    setInterval(updateDynamicTime, 1000);

    const timeIcon = "/icon/weathericons/timeicon.png";
    const timeDiv = document.createElement("div");
    timeDiv.classList.add("weather-div");
    const timeImg = document.createElement("img");
    timeImg.src = timeIcon;
    timeImg.alt = "time icon";
    timeDiv.appendChild(timeElement);
    timeDiv.appendChild(timeImg);
    container.appendChild(timeDiv);
  } catch (error) {
    console.error("Error loading weather", error);
    container.innerHTML = `<p class="weather-error">Error loading weather</p>`;
  }

  return container;
};

export default WeatherWidget;
