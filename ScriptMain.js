import { API_key } from "./config.js";

const Location = document.getElementById("InputLocation");
const submit = document.getElementById("submit");

submit.addEventListener("click", GetLocationName)
Location.addEventListener("keydown", (key) => {
    if (key.key === "Enter") {
        GetLocationName();
    }
})

async function GetLocationName() {
    let LocationName = Location.value;
    const API = `http://api.weatherapi.com/v1/current.json?key=${API_key}&q=${LocationName}`;

    // console.log(API);

    GetWeather(API);
}

async function GetWeather(API) {
    try {
        const Response = await fetch(API);

        if (!Response.ok) {
            throw new Error("Respond error: " + Response.statusText);
        }

        const WeatherData = await Response.json();

        console.log(WeatherData);
        const WeatherContainer = document.getElementById("WeatherContainer");

        const WeatherDiv = document.createElement("div");
        WeatherDiv.id = "Weather";
        WeatherDiv.className = "col-6 col-md-3 mb-3";
        WeatherDiv.innerHTML = `
            <div id="WeatherDiv" class="card">
                <p>${WeatherData.location.name}</p>
                <p>${WeatherData.location.country}</p>
                <p>${WeatherData.current.temp_c} °C</p>
                <img src=${WeatherData.current.condition.icon}></img>
                <p>${WeatherData.current.condition.text}</p>
            </div>
        `;

        WeatherContainer.appendChild(WeatherDiv);

    } catch (error) {
        console.error('GetWeather() Error:', error);
    }
}