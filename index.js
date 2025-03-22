const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "0e443133ed38cb4564056b4f32c2cdf4";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeather(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      displayError("error");
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= ${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  console.log(response);
  //   const data = await response.json();
  //   return data;
}
function displayWeatherInfo(weather) {
  //   const { main, name, weather } = weather;
  //   const { temp, humidity } = main;
  //   const { description } = weather[0];
  //   card.innerHTML = `
  //     <h2>${name}</h2>
  //     <p>${description}</p>
  //     <p>Temp: ${temp}°C</p>
  //     <p>Humidity: ${humidity}%</p>
  //   `;
}
function getWeatherEmoji(weather) {
  //   const { description } = weather;
  //   if (description.includes("cloud")) {
  //     return "☁️";
  //   } else if (description.includes("rain")) {
  //     return "🌧";
  //   } else if (description.includes("sun")) {
  //     return "☀️";
  //   } else {
  //     return "🤷";
  //   }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
