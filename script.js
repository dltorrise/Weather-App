

var apiKey = "9ffe19106208ff88d659686f2e903261"
var getWeatherBtn = document.getElementById("user-form")
//when you have a form with submit inside you have to put event listener on form
var cityInput = document.getElementById("city")
//template literal so you dont have to concatenate
var resultsContainer = document.getElementById("results")
var fiveDayContainer = document.getElementById("five-day")
var searchHistory = document.getElementById("search-history")
// var latitude
// var longitude

let histoire = JSON.parse(localStorage.getItem("searchHistory")) //makes an array

if (histoire===null) {
    histoire = []
}

console.log(histoire)

//if there is a local storage then it can't be local storage




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
                //Creating elements
                var cityName = document.createElement('h3');
                var icon = document.createElement('img');
                icon.classList.add("icon") //add icon class
                var temperature = document.createElement('p');
                var humidity = document.createElement('p');
                var windSpeed = document.createElement('p');
    
                //Setting the text of the h3 element and p element.
                cityName.textContent = data.name
                //iconName = data.weather.icon
                //icon.src = `https://openweathermap.org/img/wn/${iconName}@2x.png`;
                temperature.textContent = data.main.temp;
                windSpeed.textContent = data.wind.speed
                humidity.textContent = data.main.humidity

                console.log(temperature);

                //appends onto screen
                resultsContainer.append("City Name: " + city);
                //resultsContainer.append(icon)
                resultsContainer.append("Temperature: ")
                resultsContainer.append(temperature)
                resultsContainer.append("Wind Speed: ")
                resultsContainer.append(windSpeed)
                resultsContainer.append("Humidity: ")
                resultsContainer.append(humidity)
                
                //future weather function
                var lat = data.coord.lat
                var lon = data.coord.lon
                getFutureWeather(lat, lon)

                //local storage
                console.log(typeof histoire)
                console.log(histoire)
                histoire.push(city) // pushes city into array don't have to reassign them bc mutable
                console.log(typeof histoire) // will always say it's object if it's an array
                localStorage.setItem("searchHistory", JSON.stringify(histoire)) // puts history array in local storage
                showSearchHistory()

        });
};

showSearchHistory()


function showSearchHistory() {
    searchHistory.textContent = "Search History"
    var listOfCities = document.createElement('ul') //creates box for list
    searchHistory.appendChild(listOfCities) //appends it to search container
    for (i=0; i<histoire.length; i++) {
        var nameOfCity = document.createElement('li')
        nameOfCity.addEventListener("click", buttonClickHandler)
        nameOfCity.textContent = histoire[i]
        nameOfCity.setAttribute('data-city', histoire[i])
        console.log(nameOfCity.getAttribute('data-city'))
        listOfCities.appendChild(nameOfCity)
    }
}

function getFutureWeather(lat, lon) {
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(fiveDayUrl)
    .then(function (response) {
        return response.json()
     }) .then(function (data) {
        console.log(data)
 //just need to append onto screen
        for (i=0; i<5; i++) {
            //Creating elements
            var date = document.createElement('h3');
            var icon = document.createElement('img');
            icon.classList.add("icon") //add icon class
            var temperature = document.createElement('p');
            var humidity = document.createElement('p');
            var windSpeed = document.createElement('p');

            //Setting the text of the h3 element and p element.
            date.textContent = data.list[i].dt_txt
            //iconName = data.weather.icon
            //icon.src = `https://openweathermap.org/img/wn/${iconName}@2x.png`;
            temperature.textContent = data.list[i].main.temp;
            windSpeed.textContent = data.list[i].wind.speed
            humidity.textContent = data.list[i].main.humidity

            console.log(temperature);

            //appends onto screen
            resultsContainer.append("Date: " + date);
            //resultsContainer.append(icon)
            resultsContainer.append("Temperature: ")
            resultsContainer.append(temperature)
            resultsContainer.append("Wind Speed: ")
            resultsContainer.append(windSpeed)
            resultsContainer.append("Humidity: ")
            resultsContainer.append(humidity)
        }
                
     });
};

function handleSearchSubmit(event) {
    resultsContainer.textContent = '' // clears out last weather
    console.log('clicked')
    event.preventDefault() //event is deprecated under some circumstances, so e is preferred
    if (!cityInput.value) { //so that it doesn't do anything if there is no input
        return
    } else {
        var city = cityInput.value.trim() //searchInput is an HTML element and so .value is input
        //.trim bc white space can sometimes mess up databases
        getCurrentWeather(city) //calls function as city as parameter
        //getFutureWeather(lat, lon)
        cityInput.value = '' //clears search box by creating empty string
    }
}

var buttonClickHandler = function (event) {
    var pastResult = event.target.getAttribute('data-city');
    console.log(pastResult)
    getCurrentWeather(pastResult)
  };

getWeatherBtn.addEventListener("submit", handleSearchSubmit) //button inside of form needs to be submit
searchHistory.addEventListener("click", buttonClickHandler)

/*user is searching for city, give current data, give 5 day forecast, save their
search history as buttons, let them click buttons to go back to see weather again */

//main issues
//getting the search results to work correctly
//rendering the icon

//easy stuff (though potentially time consuming)
//rendering five day results
//formatting
