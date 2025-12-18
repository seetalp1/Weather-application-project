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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("London");

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
