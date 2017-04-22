var owmBaseURL = 'http://api.openweathermap.org/data/2.5/weather?',
    owmAPIKey = '31ed34cbcb1d480a9de746e8a88e71ea';

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationFound);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function locationFound(position){
  getWeatherData(position.coords.latitude, position.coords.longitude);
}

function getWeatherData(lat, lng) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', owmBaseURL + "lat=" + lat + "&lon=" + lng + "&APPID=" + owmAPIKey);
  xhr.addEventListener('load', function(event) {
    let weatherData = JSON.parse(event.target.response);
    console.log(weatherData);
  });
  xhr.send();
}

document.addEventListener('DOMContentLoaded', function(){
  getUserLocation();
});
