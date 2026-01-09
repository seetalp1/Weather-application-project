function displayCityWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateTimeElement = document.querySelector("#date-and-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#temperature-icon");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  dateTimeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
  displayForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "aeee30f44oc8t5f407da27a74746b34b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayCityWeather);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  searchCity(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes},`;
}

function getForecase(city) {
  let apiKey = "aeee30f44oc8t5f407da27a74746b34b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-weekday">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${day.temperature.maximum}</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("London");
