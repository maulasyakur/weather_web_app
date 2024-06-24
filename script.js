const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "3b5a9364508c41dfc0e605277cb97bb5";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city){
        const weatherData = await getWeatherData(city);
        displayWeather(weatherData);
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){
    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(url);
        const responseJson = response.json();
        return responseJson;
    } catch(error){
        displayError("Cannot retrieve data")
    }
}

function displayWeather(data){
    const {
        name: city,
        main: {temp, humidity},
        weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch (true){
        case (weatherId >= 200 && weatherId <= 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId <= 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId <= 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId <= 700):
            return "❄️";
        case (weatherId >= 700 && weatherId <= 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId <= 809):
            return "☁️";
        default:
            return "❔";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}