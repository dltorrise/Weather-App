//I wish I could format the Search History and the 4-day forecast better
//make position of search history fixed and a bit further from margin
//add outline to search history
//change sizes of boxes
// make Today bigger
//make weather capital
//make dates days of week

//just for fun

window.onload = function(){
    var originalTitle = document.title;
    var animatedTitles = ['☀', '☁', '☔', '⚡', '❄'];
    var index = 0;
document.title = animatedTitles[index] + originalTitle + ' ' + animatedTitles[index];
    index++;
setInterval(
      function(){
        document.title = animatedTitles[index]+ originalTitle + ' ' + animatedTitles[index];
        index++;
        if(index == animatedTitles.length){
          index = 0;
        }
      },
      1000
    );
  }

//DOM elements

var apiKey = "9ffe19106208ff88d659686f2e903261"
var getWeatherBtn = document.getElementById("user-form") //when you have a form with submit inside you have to put event listener on form
var cityInput = document.getElementById("city") 
var resultsContainer = document.getElementById("results")
var fiveDayContainer = document.getElementById("five-day")
var searchHistory = document.getElementById("search-history")
var todayWeather = document.getElementById("today-weather")


//variables
//histoire is the french word for history. I cannot use history bc apparently
//it is a keyword in the console


let histoire = JSON.parse(localStorage.getItem("searchHistory")) //makes an array

if (histoire===null) {
    histoire = [] //makes sure we only create an empty array if nothing is there
}



//functions

function getCurrentWeather(city) {
    var currentWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`
    fetch(currentWeather) //returns response
    .then(function (response) {
        return response.json()
    
    }) .then(function (data) {
        //city name, the date, an icon representation of weather conditions, 
        //the temperature, the humidity, and the wind speed
        console.log(data)
                //Creating elements
                var icon1 = document.createElement('img');
                var weatherDescription = document.createElement('i')
                icon1.classList.add("icon-one") //to make this one bigger
                var temperature = document.createElement('p');
                var humidity = document.createElement('p');
                var windSpeed = document.createElement('p');
    
                //Setting the text of the h3 element and p element.
                todayWeather.innerHTML = ''
                todayWeather.innerHTML = "Today's weather in " + city
                todayWeather.classList.add("text-center")
                let {icon, description} = data.weather[0]
                icon1.src = "https://openweathermap.org/img/wn/"+ icon + ".png"
                weatherDescription.textContent = description
                weatherDescription.classList.add("text-uppercase")
                weatherDescription.classList.add("mb-3")
                temperature.textContent = data.main.temp;
                windSpeed.textContent = data.wind.speed
                humidity.textContent = data.main.humidity

                //appends onto screen
                resultsContainer.classList.add("card", "container", "bg-primary", "text-white")
                resultsContainer.innerHTML = '' //clears it out every single time
                resultsContainer.append(icon1)
                resultsContainer.append(weatherDescription)
                resultsContainer.append("Temperature (°F): ")
                resultsContainer.append(temperature)
                resultsContainer.append("Wind Speed (MPH): ")
                resultsContainer.append(windSpeed)
                resultsContainer.append("Humidity (%): ")
                resultsContainer.append(humidity)
                
                //future weather function
                var lat = data.coord.lat
                var lon = data.coord.lon
                getFutureWeather(lat, lon)

                //local storage
                 // pushes city into array don't have to reassign them bc mutable
                console.log(typeof histoire) // will always say it's object if it's an array
                if (histoire.includes(city)){
                    return
                } else {
                    histoire.push(city)
                    localStorage.setItem("searchHistory", JSON.stringify(histoire)) // puts history array in local storage
                    showSearchHistory()
                }
        });
};


function showSearchHistory() {
    searchHistory.textContent = "Search History"
    searchHistory.classList.add("h5", "bg-primary", "text-white")
    var listOfCities = document.createElement('ul') //creates box for list
    searchHistory.appendChild(listOfCities) //appends it to search container
    for (i=0; i<histoire.length; i++) {
        if (histoire.length>5) {
          histoire.shift() //removes first element  
        }
        var nameOfCity = document.createElement('li')
        nameOfCity.classList.add("list-group-item")
        nameOfCity.addEventListener("click", buttonClickHandler)
        nameOfCity.textContent = histoire[i]
        nameOfCity.setAttribute('data-city', histoire[i])
        listOfCities.appendChild(nameOfCity)
    }
}

function getFutureWeather(lat, lon) {
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch(fiveDayUrl)
    .then(function (response) {
        return response.json()
     }) .then(function (data, icon) {
        console.log(data)
        var today = dayjs()
        var tomorrow = today.add(1, 'day');
        console.log(tomorrow)
        var dayAfterTomorrow = today.add(2, 'day');
        var dayAfterThat = today.add(3, 'day')
        var andTheDayAfterThat = today.add(4, 'day')
        var dates = ["Tomorrow", dayAfterTomorrow.format('dddd'), dayAfterThat.format('dddd'), andTheDayAfterThat.format('dddd')] //maybe not the dryest method
        console.log(dates)
        fiveDayContainer.innerHTML = ''
        var fiveDayForecast = document.createElement('h3')
        fiveDayForecast.innerHTML = "Next Four Days"
        fiveDayForecast.classList.add("text-center")
        fiveDayContainer.appendChild(fiveDayForecast)
        for (i=0; i<25; i+=8) { //iterates through every 8 elements bc array from this website returns every 3 hours
            //Creating a weather container div
            console.log(i)
            var weatherContainer = document.createElement('div');
            weatherContainer.classList.add("card", "col-md-6", "text-center", "bg-primary", "text-white")
            //Creating elements
            var date = document.createElement('h5');
            var weatherDescription = document.createElement('i')
            weatherDescription.classList.add("mb-3") //add lower margin
            var icon1 = document.createElement('img');
            var temperature = document.createElement('p');
            var humidity = document.createElement('p');
            var windSpeed = document.createElement('p');
            //setting the text of the h3 element and p element.
            date.textContent = dates[i/8];
            date.classList.add("mt-2")
            let {icon, description} = data.list[i].weather[0]
            icon1.src = "https://openweathermap.org/img/wn/"+ icon + ".png"
            temperature.textContent = (((data.list[i].main.temp)-273.15)*(9/5) +32).toFixed(2)
            windSpeed.textContent = data.list[i].wind.speed;
            humidity.textContent = data.list[i].main.humidity;
            weatherDescription.textContent = description
            weatherDescription.classList.add("text-uppercase")
            //appending elements to the weather container div
            weatherContainer.appendChild(date);
            weatherContainer.append(icon1);
            weatherContainer.appendChild(weatherDescription)
            var tempText = document.createElement('p')
            tempText.textContent = "Temperature (°F): "
            weatherContainer.appendChild(tempText)
            weatherContainer.appendChild(temperature);
            var windText = document.createElement('p')
            windText.textContent = "Wind Speed (MPH): "
            weatherContainer.appendChild(windText)
            weatherContainer.appendChild(windSpeed);
            var humidityText = document.createElement('p')
            humidityText.textContent = "Humidity (%): "
            weatherContainer.appendChild(humidityText)
            weatherContainer.appendChild(humidity);
            //append the weather container div to results container
            fiveDayContainer.appendChild(weatherContainer);
        }
                
     });
};

function handleSearchSubmit(event) {
    resultsContainer.textContent = '' // clears out last weather
    //fiveDayContainer.textContent = ''
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

var buttonClickHandler = function (event) {
    if (event.target = document.querySelector('li')) {
        var pastResult = event.target.getAttribute('data-city');
        getCurrentWeather(pastResult)
    } 
  };


//event listeners

getWeatherBtn.addEventListener("submit", handleSearchSubmit) //button inside of form needs to be submit
searchHistory.addEventListener("click", buttonClickHandler)


//function calls 
showSearchHistory()


