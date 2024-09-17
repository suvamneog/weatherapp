// Example Project Flow:

// 	1.	User enters a city name in the input field.  DONE
// 	2.	User clicks the “Get Weather” button (or presses Enter). DONE
// 	3.	The app fetches weather data from OpenWeatherMap for the entered city. DONE
// 	4.	If successful, the app displays the weather information (temperature, description, etc.).
// 	5.	If the city is not found, an error message is displayed.

const cityValue = document.querySelector("#cityInput");
const searchButton = document.querySelector("#getWeather");
const result = document.querySelector("#weatherResult");
function getWeather() {
    const apiKey = "495f65a73dcff2fb6a935b8864e440ca";
    const city = cityValue.value; 
    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(apiUrl).then(response=> {
    if(!response.ok) {
        return response.json().then(err => { throw new Error(err.message);
        }); }
        return response.json();
    })

.then(data => {
    // const coord = data.coord;
    const temperature = data.main.temp;
    const cityName = data.name;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const weatherDescription = data.weather[0].description;
    result.innerHTML=
    `<h2>${cityName}</h2>
    <h3>Description: ${weatherDescription}</h3>
    <p>Temperature: ${temperature}°C</p>
    <p>Temp-min: ${tempMin}°C</p>
    <p>Temp-max: ${tempMax}°C</p>`;
})
.catch(error => {
    result.innerHTML=
    `<p>Error:${error.message}`;
});
}


searchButton.addEventListener("click", getWeather);
cityValue.addEventListener("keypress",(e)=>
{
    if(e.key==="Enter") {
        getWeather();
    }
});
