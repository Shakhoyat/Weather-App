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
  //   console.log(response);
  if (!response.ok) {
    throw new Error("City not found");
  }
  const weatherData = await response.json();
  //   console.log(weatherData);
  return weatherData;
}

function displayWeatherInfo(weather) {
  console.log(weather);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = weather;
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
