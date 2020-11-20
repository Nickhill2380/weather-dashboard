var citySearchEl = document.querySelector("#city-search");
var cityNameEl = document.querySelector("#city-name");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");
var apiKey = "ecc3713fcc8bcf9a9b86ba74c250821b"

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();

    if (cityName) {
        getCurrentWeather(cityName);
        cityNameEl.value="";
    } else {
        alert("Please enter a City name");
    }
}


var getCurrentWeather = function(city) {
    var cityWeather = "http://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" + city + "&appid=" + apiKey
    
    fetch(cityWeather)
    .then(function(response){
        if (response.ok)  {
            response.json().then(function(data) {
                console.log(data);
                displayCurrentWeather(data);
                var cityLat = data.coord.lat;
                var cityLon = data.coord.lon;

            return fetch(
                    "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + apiKey
                )
                .then(function(response){
                    return response.json();
                })
                .then(function(response){
                    console.log(response);
                    displayUVIndex(response);
                })

                
            });
        } else {
            alert("Error: " + response.cod);
        }

       
    })
    
}

var displayCurrentWeather = function(city) {

    currentWeatherEl.textContent = "";
    console.log(city.weather[0].icon)
    var weatherCityEl = document.createElement("h2")
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + city.weather[0].icon + ".png");
    weatherCityEl.textContent= city.name;
    
    currentWeatherEl.appendChild(weatherCityEl);
    weatherCityEl.appendChild(weatherIcon);

    var weatherStatsEl = document.createElement("ul");
        weatherStatsEl.classList = "list-item flex-row justify-space-between align-left";

    var temperatureEl = document.createElement("li");
        temperatureEl.classList = "list-item flex-row justify-space-between align-left";
        temperatureEl.textContent = "Temperature: " + city.main.temp + " F"; 

    var humidityEl = document.createElement("li");
        humidityEl.classList = "list-item flex-row justify-space-between align-left";
        humidityEl.textContent = "Humidity: " + city.main.humidity + "%";

    var windSpeedEl = document.createElement("li");
        windSpeedEl.classList = "list-item flex-row justify-space-between align-left";
        windSpeedEl.textContent = "Wind Speed: " + city.wind.speed + " mph";

    

     currentWeatherEl.appendChild(weatherStatsEl);
     currentWeatherEl.appendChild(temperatureEl);
     currentWeatherEl.appendChild(humidityEl);
     currentWeatherEl.appendChild(windSpeedEl);





}

var displayUVIndex = function(uvIndex) {

    var uvIndexEl = document.createElement("li");
        uvIndexEl.classList = "list-item flex-row justify-space-between align-left uv-Index";
        uvIndexEl.textContent = "UV Index: " + uvIndex.value

        currentWeatherEl.appendChild(uvIndexEl);
}


citySearchEl.addEventListener("submit", formSubmitHandler);