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

getDailyWeather("buffalo");