import { API_key } from "./config.js";

const Location = document.getElementById("InputLocation");
const submit = document.getElementById("submit");

window.onload = () => {
    document.getElementById('InputLocation').value = '';
}

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

        // console.log(WeatherData);
        const WeatherContainer = document.getElementById("WeatherContainer");

        const WeatherDiv = document.createElement("div");
        WeatherDiv.id = "Weather";
        WeatherDiv.className = "col-6 col-md-3 mb-3";
        WeatherDiv.innerHTML = `
            <div id="WeatherDiv" class="card shadow-lg p-3 rounded">
                <h4><strong>${WeatherData.location.name}</strong></h4>
                <p>${WeatherData.location.country}</p>
                <p><strong>${WeatherData.current.temp_c} °C</strong></p>
                <img src=${WeatherData.current.condition.icon}></img>
                <p><strong>${WeatherData.current.condition.text}</strong></p>
            </div>
        `;

        WeatherContainer.appendChild(WeatherDiv);

    } catch (error) {
        console.error('GetWeather() Error:', error);
        const Error = new bootstrap.Toast(document.getElementById('alert'));
        Error.show();
    }
}

let CloseAll = document.getElementById("CloseAll");
CloseAll.addEventListener("click", () => {
    let clear = document.getElementById("WeatherContainer");
    clear.innerHTML = "";
})