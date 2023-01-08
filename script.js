var apiKey = "9ffe19106208ff88d659686f2e903261"
var getWeatherBtn = document.getElementById("user-form")
//when you have a form with submit inside you have to put event listener on form
var cityInput = document.getElementById("city")
//template literal so you dont have to concatenate
var resultsContainer = document.getElementById("results")
var fiveDayContainer = document.getElementById("five-day")
// var latitude
// var longitude
console.log(resultsContainer)


console.log('Hello')

function getCurrentWeather(city) {
    console.log(city)
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(currentWeather) //returns response
    .then(function (response) {
        return response.json()
    
    }) .then(function (data) {
        //city name, the date, an icon representation of weather conditions, 
        //the temperature, the humidity, and the wind speed
        console.log(data)
            //Creating a h3 element and a p element
                var cityName = document.createElement('h3');
                var icon = document.createElement('img');
                icon.classList.add("icon") //add icon class
                var temperature = document.createElement('p');
                var humidity = document.createElement('p');
                var windSpeed = document.createElement('p');
    
            //Setting the text of the h3 element and p element.
                cityName.textContent = data.name
                iconName = data.weather.icon
                //icon.src = `https://openweathermap.org/img/wn/${iconName}@2x.png`;
                temperature.textContent = data.main.temp;
                windSpeed.textContent = data.wind.speed
                humidity.textContent = data.main.humidity

                console.log(temperature);
   
            //Appending the dynamically generated html to the div associated with the id="users"
            //Append will attach the element as the bottom most child.
                resultsContainer.append("City Name: " + city);
                resultsContainer.append(icon)
                resultsContainer.append("Temperature: ")
                resultsContainer.append(temperature)
                resultsContainer.append("Wind Speed: ")
                resultsContainer.append(windSpeed)
                resultsContainer.append("Humidity: ")
                resultsContainer.append(humidity)
                
                var lat = data.coord.lat
                var lon = data.coord.lon
                getFutureWeather(lat, lon)
        });
};


function getFutureWeather(lat, lon) {
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(fiveDayUrl)
    .then(function (response) {
        return response.json()
    
    }) .then(function (data) {
        console.log(data)
                
    });
};

function handleSearchSubmit(event) {
    console.log('clicked')
    resultsContainer.textContent = '' // clears out last weather
    event.preventDefault() //event is deprecated under some circumstances, so e is preferred
    if (!cityInput.value) { //so that it doesn't do anything if there is no input
        return
    } else {
        var city = cityInput.value.trim() //searchInput is an HTML element and so .value is input
        //.trim bc white space can sometimes mess up databases
        getCurrentWeather(city) //calls function as city as parameter
        getFutureWeather(lat, lon)
        cityInput.value = '' //clears search box by creating empty string
    }
}


getWeatherBtn.addEventListener("submit", handleSearchSubmit) //button inside of form needs to be submit

/*user is searching for city, give current data, give 5 day forecast, save their
search history as buttons, let them click buttons to go back to see weather again */