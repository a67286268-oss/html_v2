const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");


async function searchWeather() {

    const city = cityInput.value;

    result.textContent = "검색 중...";

    const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const geoData = await geoResponse.json();

    if (!geoData.results) {
        result.textContent = "도시를 찾을 수 없습니다.";
        return;
    }

    const place = geoData.results[0];

    const lat = place.latitude;
    const lon = place.longitude;

    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
    );

    const weatherData = await weatherResponse.json();

    const temperature =
        weatherData.current.temperature_2m;

    const weatherCode =
        weatherData.current.weather_code;

    result.innerHTML = `
        <div class="city">
            ${place.name}
        </div>

        <div>
            위도 : ${lat}<br>
            경도 : ${lon}
        </div>

        <hr>

        <div class="temperature">
            ${temperature}°C
        </div>

        <div>
            날씨 코드 : ${weatherCode}
        </div>
    `;
}
searchBtn.addEventListener("click", searchWeather);