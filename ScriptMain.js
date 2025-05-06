import { API_key } from "./config.js";

const key = API_key;

const Location = document.getElementById("InputLocation");
const submit = document.getElementById("submit");

let LocationName;

submit.addEventListener("click", GetLocationName)
Location.addEventListener("keydown", (key) => {
    if (key.key === "Enter") {
        GetLocationName();
    }
})

function GetLocationName() {
    LocationName = Location.value;
    const LatLongAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${LocationName}&appid=${API_key}`;
    // console.log(LatLongAPI);
    GetLatLong(LatLongAPI);
}

async function GetLatLong(LatLongAPI) {
    try{
        const Response = await fetch(LatLongAPI);

        if (!Response.ok) {
            alert("Please Enter Valid City Name");
            throw new Error("Respond error: " + Response.statusText);
        }
        const LatLonData = await Response.json();
        let lat = LatLonData[0].lat;
        let lon = LatLonData[0].lon;

        // console.log(lat);
        // console.log(lon);

        CurrentWeather(lat, lon);

    }catch (error){
        console.error('GetLatLong() Error:', error);
    }
}

function CurrentWeather(lat, lon) {
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
    console.log(API);
    GetWeather(API)
}

async function GetWeather(API) {
    try {
        const Response = await fetch(API);

        if (!Response.ok) {
            throw new Error("Respond error: " + Response.statusText);
        }

        const WeatherData = await Response.json();

        console.log(WeatherData);
        const WeatherContainer = document.getElementById("Weather");

        const WeatherDiv = document.createElement("div");
        WeatherDiv.innerHTML = `
            <p>${WeatherData.name}</p>
        `;

        WeatherContainer.appendChild(WeatherDiv);

    } catch (error) {
        console.error('GetWeather() Error:', error);
    }
}