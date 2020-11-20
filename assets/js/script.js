var citySearchEl = document.querySelector("#city-search");
var cityNameEl = document.querySelector("#city-name");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");
var apiKey = "ecc3713fcc8bcf9a9b86ba74c250821b"
var cityHistoryEl = document.querySelector("#city-history");
var searchHistory = [];

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();

    if (cityName) {
        getCurrentWeather(cityName);
        fiveDayForecast(cityName);
        storeCity(cityName);
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
    
    var weatherCityEl = document.createElement("h2")
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + city.weather[0].icon + ".png");
    weatherCityEl.textContent= city.name;
    
    currentWeatherEl.appendChild(weatherCityEl);
    weatherCityEl.appendChild(weatherIcon);

    var temperatureEl = document.createElement("p");
        temperatureEl.classList = "list-item flex-row justify-space-between align-left";
        temperatureEl.textContent = "Temperature: " + city.main.temp + " F"; 

    var humidityEl = document.createElement("p");
        humidityEl.classList = "list-item flex-row justify-space-between align-left";
        humidityEl.textContent = "Humidity: " + city.main.humidity + "%";

    var windSpeedEl = document.createElement("p");
        windSpeedEl.classList = "list-item flex-row justify-space-between align-left";
        windSpeedEl.textContent = "Wind Speed: " + city.wind.speed + " mph";

    

     
     currentWeatherEl.appendChild(temperatureEl);
     currentWeatherEl.appendChild(humidityEl);
     currentWeatherEl.appendChild(windSpeedEl);





}

var displayUVIndex = function(uvIndex) {

    var uvIndexEl = document.createElement("p");
        uvIndexEl.classList = "list-item flex-row justify-space-between align-left uv-Index";
        uvIndexEl.textContent = "UV Index: " + uvIndex.value

        currentWeatherEl.appendChild(uvIndexEl);
}


var fiveDayForecast = function(city){

    forecastEl.textContent= "";

    fetch(
        "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey
    )
    .then(function(response){
        if (response.ok)  {
            response.json().then(function(data) {
                
                var forecastArray = data.list
               
                var forecastTitleEl = document.createElement("h3");
                forecastTitleEl.textContent = "5-Day Forecast"
                forecastTitleEl.classList="card forecast-container col-12"

                forecastEl.appendChild(forecastTitleEl);

            for( var i=0; i < forecastArray.length; i += 8 ) {
                
                var forecastCardEl = document.createElement("div");
                
                forecastCardEl.classList="card-body col-2";

                forecastEl.appendChild(forecastCardEl)

                var dateEl = document.createElement("h4")

                var forecastDate = forecastArray[i].dt_txt;

                dateEl.textContent = forecastDate.split(" ",1)
                
                var iconEl = document.createElement("img")
                
                iconEl.setAttribute("src", "http://openweathermap.org/img/wn/" + forecastArray[i].weather[0].icon + ".png");
                
                var tempEl = document.createElement("p")
                tempEl.textContent = "Temp: " + forecastArray[i].main.temp + "F";

                var humidityForecastEl = document.createElement("p")
                humidityForecastEl.textContent= "Humidity: " + forecastArray[i].main.humidity + "%";

                forecastCardEl.appendChild(dateEl);
                forecastCardEl.appendChild(iconEl);
                forecastCardEl.appendChild(tempEl);
                forecastCardEl.appendChild(humidityForecastEl);
                forecastEl.appendChild(forecastCardEl)
            }
        })
    }
    
    })

};

var historySearch = function(event) {
        var citySearch = event.target.textContent

        getCurrentWeather(citySearch);
        fiveDayForecast(citySearch);


};

var storeCity = function(cityName) {

    var cityBtn = document.createElement("btn");
    cityBtn.textContent = cityName;
    cityBtn.classList = "col-12"

    cityHistoryEl.appendChild(cityBtn);

    searchHistory.push(cityName);

    localStorage.setItem("cities", JSON.stringify(searchHistory));

}

var loadCity = function () {

    storedSearches = JSON.parse(localStorage.getItem("cities"));

    if (!storedSearches){
        storedSearches= [];
    }

    for( var i = 0; i< storedSearches.length; i++) {

        storeCity(storedSearches[i]);
    }
};

loadCity();

cityHistoryEl.addEventListener("click", historySearch)
citySearchEl.addEventListener("submit", formSubmitHandler);