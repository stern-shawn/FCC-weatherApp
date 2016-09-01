var units = 'imperial';
var unitLabel = 'F';
var city = '';
var latitude = 0;
var longitude = 0;
var tempF = 0;
var tempC = 0;

// // Set latitude and logitude if successful
// function success(position) {
//   //$("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
//   latitude = position.coords.latitude;
//   longitude = position.coords.longitude;
//   // Debug to prove that we can get the location data (geolocation only seems to work in https mode, yay)
//   // $("#weather-state").append("<p>Lat: " + latitude + "</p><p>Long: " + longitude + "</p>");
// }

// // Just in case the call to navigator fails (It always will because of https...)
// function error(err) {
//   console.warn('ERROR(' + err.code + '): ' + err.message);

//   // Get the location using a different api then...
//   $.get("http://ipinfo.io", function(location) {
//     console.log(location);

//     latitude = location.loc.split(",")[0];
//     longitude = location.loc.split(",")[1];

//     // $("#weather-state").append("<p>Lat: " + latitude + "</p><p>Long: " + longitude + "</p>");

//     city = location.city + ", " + location.region + ", " + location.country;
//     $("#city").html("<p>" + city + "</p>");
//   }, "jsonp");
// }

// // Options for call to getCurrentPosition
// var options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };

// Invoke to set global lat/long to current location
function getLocation() {
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(success, error, options);
  // }

  // Alternate location API since HTTPS is necessary for geolocation to work, and https seems to break the other functionality of codepen so yaaaaayy...
  var locationAPI = "http://ipinfo.io";
  $.get(locationAPI, function(location) {
    // .loc is comma separated string, need to split to get lat/long separately
    latitude = location.loc.split(",")[0];
    longitude = location.loc.split(",")[1];

    // Nest function here to avoid async issues
    getWeather();
  }, "jsonp"); // Set format to jsonp so .split will work
}

// Invoke to get weather state (rainy, sunny, cloudy, etc) and termperature at the current location
function getWeather() {
  var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=" + units + "&appid=d63b7095e1842b4853e6cb04f0b02e41";

  // Query OpenWeatherMap API for json object
  $.getJSON(weatherAPI, function(weather) {
    // Log weather object to determine what object keys to reference...
    // console.log(weather);

    // Set Temperature, default setup is to query in F. Store C for toggling
    tempF = Math.round(weather.main.temp);
    tempC = Math.round((tempF - 32) * (5/9));

    // Insert the current city, temperature, and weather status icons
    $("#city").html(weather.name);
    $("#temperature").html(tempF + " " + unitLabel);
    $("#weatherIcon").html("<i class='wi wi-owm-" + weather.weather[0].id + " fa-5x'></i>");
  }, "jsonp");
}

// Function to swap temperature display between Fahrenheit and Celsius
function swapUnits() {
  if (unitLabel === 'F') {
    unitLabel = 'C';
    $("#temperature").html(tempC + " " + unitLabel);
  } else {
    unitLabel = 'F';
    $("#temperature").html(tempF + " " + unitLabel);
  }
}

// Execute upon full page load
$(document).ready(function() {
  getLocation();
});
