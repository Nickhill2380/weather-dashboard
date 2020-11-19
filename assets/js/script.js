var citySearchEl = document.querySelector("#city-search");
var cityNameEl = document.querySelector("#city-name");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");

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
    var cityWeather = "http://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" + city + "&appid=ecc3713fcc8bcf9a9b86ba74c250821b";
    
    fetch(cityWeather)
    .then(function(response){
        if (response.ok)  {
            response.json().then(function(data) {
                console.log(data);
                displayCurrentWeather(data);
            });
        } //else {
            //alert("Error: " + response.statusText)
        //}
    })
}

var displayCurrentWeather = function(city) {

    currentWeatherEl.textContent = "";

    var weatherCityEl = document.createElement("h2")
    weatherCityEl.textContent= city.name;

    currentWeatherEl.appendChild(weatherCityEl);

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

    /*var uvIndexEl = document.createElement("li");
        uvIndexEl.classList = "list-item flex-row justify-space-between align-left";
        uvIndexEl.textContent = */

     currentWeatherEl.appendChild(weatherStatsEl);
     weatherStatsEl.appendChild(temperatureEl);
     weatherStatsEl.appendChild(humidityEl);
     weatherStatsEl.appendChild(windSpeedEl);





}


citySearchEl.addEventListener("submit", formSubmitHandler);