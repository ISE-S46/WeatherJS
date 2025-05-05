import { API_key } from "./config.js";

const lat = 13.736717;
const lon = 100.523186;
const key = API_key;

const API = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + key;

console.log(API);

async function GetWeather() {
    try {
        const Response = await fetch(API);

        if (!Response.ok) {
            throw new Error("Respond error: " + Response.statusText);
        }

        const WeatherData = await Response.json();
        
        console.log(WeatherData);
        const WeatherContainer = document.getElementById("Weather");

    } catch (error) {
        console.error('GetWeather() Error:', error);
    }
}

GetWeather();