var owmBaseURL = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/',
    owmAPIKey = '31ed34cbcb1d480a9de746e8a88e71ea',
    currentData,
    forecastData;

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationFound);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function locationFound(position){
  getCurrentWeatherData(position.coords.latitude, position.coords.longitude);
  getForecastWeatherData(position.coords.latitude, position.coords.longitude);
}

function getCurrentWeatherData(lat, lng) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', owmBaseURL + "weather?lat=" + lat + "&lon=" + lng + "&units=metric&APPID=" + owmAPIKey);
  xhr.addEventListener('load', function(event) {
    currentData = JSON.parse(event.target.response);
    console.log(currentData);
    renderCurrentWeatherInfo();
  });
  xhr.send();
}

function getForecastWeatherData(lat, lng) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', owmBaseURL + "forecast/daily?lat=" + lat + "&lon=" + lng + "&units=metric&APPID=" + owmAPIKey);
  xhr.addEventListener('load', function(event) {
    forecastData = JSON.parse(event.target.response);
    console.log(forecastData);
    renderForecastWeatherInfo();
  });
  xhr.send();
}

function renderCurrentWeatherInfo() {
  var location = document.getElementById('location'),
      descriptionElem = document.getElementById('description');
  location.innerHTML = currentData.name;
  description.innerHTML = currentData.weather[0].main;
  renderCurrentTemp();
}

function renderForecastWeatherInfo() {
  renderForecastTemp();
}

function renderCurrentTemp() {
  var gridElem = document.getElementById('gridMain'),
      currentTemp = currentData.main.temp;

  gridElem.innerHTML += '<div class="current-temp">' + currentTemp + '<sup>&deg;</sup></div>';
}

function renderForecastTemp() {
  var gridElem = document.getElementById('gridMain'),
      highTemp = Math.round(forecastData.list[0].temp.max),
      lowTemp = Math.round(forecastData.list[0].temp.min);
  console.log(highTemp);
  console.log(lowTemp);
  gridElem.innerHTML += '<div class="forecast-temp"><div class="high">' + highTemp + '</div><div class="low">' + lowTemp + '</div></div>';
}

function renderWind() {

}

function renderCloud() {

}

function renderRain() {

}

document.addEventListener('DOMContentLoaded', function(){
  getUserLocation();
});
