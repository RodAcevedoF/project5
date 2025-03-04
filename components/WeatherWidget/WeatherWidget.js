import { getWeatherData } from "../../api/weatherApi";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const container = document.createElement("div");
  container.classList.add("weather-widget");

  const cont = document.createElement("div");
  cont.classList.add("weather-div");

  const txtCont = document.createElement("div");
  txtCont.classList.add("txt-div");

  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Cargando clima...";
  container.appendChild(loadingMessage);

  getWeatherData()
    .then((weather) => {
      if (!weather) throw new Error("No weather data found");

      // Remueve el mensaje de carga
      container.innerHTML = "";

      const cityElement = document.createElement("h3");
      const tempElement = document.createElement("p");
      const humidityElement = document.createElement("p");
      const feelsElement = document.createElement("p");
      const timeElement = document.createElement("p");
      const weatherIcon = document.createElement("img");

      weatherIcon.src = weather.iconUrl || "fallback-image.png";
      weatherIcon.alt = "Weather icon";
      weatherIcon.classList.add("weather-icon");

      cityElement.textContent = weather.city;
      tempElement.textContent = `Temp: ${weather.temperature}°C`;
      humidityElement.textContent = `Humidity: ${weather.humidity}%`;
      feelsElement.textContent = `Feel: ${weather.feel}°C`;
      const updateDynamicTime = () => {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        });
        timeElement.textContent = `Time: ${formattedTime}`;
      };

      updateDynamicTime();
      setInterval(updateDynamicTime, 1000);

      txtCont.appendChild(tempElement);
      txtCont.appendChild(humidityElement);
      txtCont.appendChild(feelsElement);
      txtCont.appendChild(timeElement);
      cont.appendChild(txtCont);
      cont.appendChild(weatherIcon);
      container.appendChild(cityElement);
      container.appendChild(cont);
    })
    .catch((error) => {
      console.error("Error cargando el clima", error);
      container.innerHTML = "<p>Error al cargar el clima</p>";
    });

  return container;
};

export default WeatherWidget;
