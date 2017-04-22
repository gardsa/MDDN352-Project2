var owmBaseURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/',
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
  // getCurrentWeatherData(49.2827, -123.1207);
  // getForecastWeatherData(49.2827, -123.1207);
}

// Back-up if CORS header hack stops working
//
// function getUserLocation() {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'http://ip-api.com/json');
//   xhr.addEventListener('load', function(event) {
//     geoIPJSON = JSON.parse(event.target.response);
//     console.log(geoIPJSON);
//     locationFound(geoIPJSON);
//   });
//   xhr.send();
// }
//
// function locationFound(geoIPJSON){
//   getCurrentWeatherData(geoIPJSON.lat, geoIPJSON.lon);
//   getForecastWeatherData(geoIPJSON.lat, geoIPJSON.lon);
// }

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
  renderWind();
  renderCloud();
}

function renderForecastWeatherInfo() {
  renderForecastTemp();
}

function renderCurrentTemp() {
  var gridElem = document.getElementById('gridMain'),
      currentTemp = Math.round(currentData.main.temp);

  gridElem.innerHTML += '<div class="current-temp">' + currentTemp + '<sup>&deg;</sup></div>';
}

function renderForecastTemp() {
  var gridElem = document.getElementById('gridMain'),
      highTemp = Math.round(forecastData.list[0].temp.max),
      lowTemp = Math.round(forecastData.list[0].temp.min);

  gridElem.innerHTML += '<div class="forecast-temp"><div class="high">' + highTemp + '<sup>&deg;</sup></div><div class="low">' + lowTemp + '<sup>&deg;</sup></div></div>';
}

function renderWind() {
  var gridElem = document.getElementById('grid1'),
      speed = Math.round(currentData.wind.speed * 3.6),
      degrees = currentData.wind.deg;

  gridElem.innerHTML = '<div class="current-wind"><div class="speed">' + speed + '</div><div class="units">km/h</div></div><img id="direction" src="assets/wind-direction-icon.svg"></img>';

  var directionElem = document.getElementById('direction');
  if(navigator.userAgent.match("Chrome")){
		directionElem.style.WebkitTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Firefox")){
		directionElem.style.MozTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("MSIE")){
		directionElem.style.msTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Opera")){
		directionElem.style.OTransform = "rotate("+degrees+"deg)";
	} else {
		directionElem.style.transform = "rotate("+degrees+"deg)";
	}
}

function renderCloud() {
  var gridElem = document.getElementById('grid2'),
      cloudCover = currentData.clouds.all;

  gridElem.innerHTML += '<img id="cloud-circle" src="assets/circle-icon.svg"></img>'

  if (cloudCover == 0){
    gridElem.innerHTML += '<div class="current-cloud">clear</div>'
  }
  else {
    gridElem.innerHTML += '<div class="canvas-container"><canvas id="cloud-canvas" width="100" height="100"></canvas></div>';

    var c = document.getElementById("cloud-canvas"),
    ctx = c.getContext("2d");

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(c.width/2, c.height/2);
    ctx.arc(c.width/2, c.height/2, c.height/2, 0, (Math.PI*2*(cloudCover/100)), false);
    ctx.lineTo(c.width/2, c.height/2);
    ctx.fill();
  }
}

function renderRain() {
  var gridElem = document.getElementById('grid3');
}

document.addEventListener('DOMContentLoaded', function(){
  getUserLocation();
});
