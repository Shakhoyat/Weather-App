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
      displayError(
        "An error occurred while fetching the weather data. Please try again."
      );
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

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const discriptionDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `Temperature: ${(temp - 273.15).toFixed(2)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  discriptionDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(weather);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  discriptionDisplay.classList.add("discriptionDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(discriptionDisplay);
  card.appendChild(weatherEmoji);
}
function getWeatherEmoji(weatherid) {
  switch (true) {
    case weatherid >= 200 && weatherid < 300:
      return "⛈️";
    case weatherid >= 300 && weatherid < 400:
      return "🌧️";
    case weatherid >= 500 && weatherid < 600:
      return "🌧️";
    case weatherid >= 600 && weatherid < 700:
      return "❄️";
    case weatherid >= 700 && weatherid < 800:
      return "🌫️";
    case weatherid === 800:
      return "☀️";
    case weatherid > 800 && weatherid < 810:
      return "☁️";
    default:
      return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
