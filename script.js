var units = 'imperial';
var unitLabel = 'F';
var city = '';
var latitude = 0;
var longitude = 0;

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
  $.get("http://ipinfo.io", function(location) {
    console.log(location);

    latitude = location.loc.split(",")[0];
    longitude = location.loc.split(",")[1];

    // $("#weather-state").append("<p>Lat: " + latitude + "</p><p>Long: " + longitude + "</p>");

    city = location.city + ", " + location.region + ", " + location.country;

    $("#city").html("<p>" + city + "</p>");

    // Nest function here to avoid async issues
    getWeather();

  }, "jsonp");
}

// Invoke to get weather state (rainy, sunny, cloudy, etc) and termperature at the current location
function getWeather() {
  var jsonUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=" + units + "&appid=d63b7095e1842b4853e6cb04f0b02e41";
  console.log(jsonUrl);
  // Query OpenWeatherMap API for json object
  $.getJSON(jsonUrl, function(weather) {
    console.log(weather);

    // Set Temperature
    currentTemperature = Math.round(weather.main.temp);

    if (units === 'imperial') {
      unitLabel = 'F';
    } else {
      unitLabel = 'C';
    }

    $("#temperature").html("<p>" + currentTemperature + " " + unitLabel + "</p>");

    // Set Weather Icon
    $("#weather-state").html("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");
  });
}

// Function to swap temperature units between Fahrenheit and Celsius
function swapUnits() {
  if (unitLabel === 'F') {
    unitLabel = 'C';
    units = 'metric';
    currentTemperature = Math.round((currentTemperature - 32) * (5/9));
  } else {
    unitLabel = 'F';
    units = 'imperial'
    currentTemperature = Math.round((currentTemperature * (9/5)) + 32);
  }

  $("#temperature").html("<p>" + currentTemperature + " " + unitLabel + "</p>");
}

// Execute upon full page load
$(document).ready(function() {
  getLocation();
  // getWeather();
});

// Execute if button is pressed and user wants to view current temperature in different units
// $('#switchUnits').on('click', function() {
//   if (unitLabel === 'F') {
//     unitLabel = 'C';
//     currentTemperature = Math.round((currentTemperature - 32) * (5/9));
//   } else {
//     unitLabel = 'F';
//     currentTemperature = Math.round((currentTemperature * (9/5)) + 32);
//   }

//   $("#temperature").html("<p>" + currentTemperature + " " + unitLabel + "</p>");
// });

// Execute if button is pressed and user wants to refresh current weather data
// $('#refresh').on('click', getWeather());
