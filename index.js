const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "0e443133ed38cb4564056b4f32c2cdf4";

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value;
  if (city) {
  } else {
    displayError("Please enter a city");
  }
});

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();
  return data;
}
function displayWeather(weather) {
  const { main, name, weather } = weather;
  const { temp, humidity } = main;
  const { description } = weather[0];
  card.innerHTML = `
    <h2>${name}</h2>
    <p>${description}</p>
    <p>Temp: ${temp}°C</p>
    <p>Humidity: ${humidity}%</p>
  `;
}
function getWeatherEmoji(weather) {
  const { description } = weather;
  if (description.includes("cloud")) {
    return "☁️";
  } else if (description.includes("rain")) {
    return "🌧";
  } else if (description.includes("sun")) {
    return "☀️";
  } else {
    return "🤷";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay = message;
}
