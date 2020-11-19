var citySearchEl = document.querySelector("#city-search");
var cityNameEl = document.querySelector("#city-name");

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();

    if (cityName) {
        getDailyWeather(cityName);
        cityNameEl.value="";
    } else {
        alert("Please enter a City name");
    }
}


var getDailyWeather = function(city) {
    var cityWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ecc3713fcc8bcf9a9b86ba74c250821b";
    
    fetch(cityWeather)
    .then(function(response){
        if (response.ok)  {
            response.json().then(function(data) {
                console.log(data);
                console.log(data.main.temp)
            });
        } //else {
            //alert("Error: " + response.statusText)
        //}
    })
}

//getDailyWeather("buffalo");

citySearchEl.addEventListener("submit", formSubmitHandler);