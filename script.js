var apiKey = "9ffe19106208ff88d659686f2e903261"
var getWeatherBtn = document.getElementById("user-form")
//when you have a form with submit inside you have to put event listener on form
var cityInput = document.getElementById("city")
//template literal so you dont have to concatenate
//var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`


console.log('Hello')

function getCurrentWeather(city) {
    console.log(city)
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(currentWeather) //returns response
    .then(function (response) {
        return response.json()
    
    }) .then(function (data) {
        console.log(data)
    })
}


function handleSearchSubmit(event) {
    console.log('clicked')
    event.preventDefault() //event is deprecated under some circumstances, so e is preferred
    if (!cityInput.value) { //so that it doesn't do anything if there is no input
        return
    } else {
        var city = cityInput.value.trim() //searchInput is an HTML element and so .value is input
        //.trim bc white space can sometimes mess up databases
        getCurrentWeather(city) //calls function as city as parameter
        cityInput.value = '' //clears search box by creating empty string
    }
}


getWeatherBtn.addEventListener("submit", handleSearchSubmit) //button inside of form needs to be submit

/*user is searching for city, give current data, give 5 day forecast, save their
search history as buttons, let them click buttons to go back to see weather again */