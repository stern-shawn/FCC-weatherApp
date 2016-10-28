var units = 'imperial'
var unitLabel = 'F'
var city = ''
var latitude = 0
var longitude = 0
var tempF = 0
var tempC = 0

// Invoke to set global lat/long to current location
function getLocation() {
  // Alternate location API since HTTPS is necessary for geolocation to work, and https seems to break the other functionality of codepen so yaaaaayy...
  var locationAPI = "http://ipinfo.io"
  $.get(locationAPI, function(location) {
    // .loc is comma separated string, need to split to get lat/long separately
    latitude = location.loc.split(",")[0]
    longitude = location.loc.split(",")[1]

    // Nest function here to avoid async issues
    getWeather()
  }, "jsonp") // Set format to jsonp so .split will work
}

// Invoke to get weather state (rainy, sunny, cloudy, etc) and termperature at the current location
function getWeather() {
  var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=" + units + "&appid=d63b7095e1842b4853e6cb04f0b02e41"
  $.getJSON(weatherAPI, function(weather) {
    // Set Temperature, default setup is to query in F. Store C for toggling
    tempF = Math.round(weather.main.temp)
    tempC = Math.round((tempF - 32) * (5/9))

    let description = weather.weather[0].description
    // Capitalize the first letter
    description = description.charAt(0).toUpperCase() + description.slice(1)

    // Populate the current city, temperature, and weather status icons
    $("#city").html(weather.name)
    $("#temperature").html(tempF + "<sup>o</sup> " + unitLabel)
    $("#weatherIcon").html("<i class='wi wi-owm-" + weather.weather[0].id + " fa-5x'></i>")
    $("#weatherDescription").html(description)

    // Hide placeholder and display the complete weather data
    $('#loadingText').hide()
    $('#weatherInfo, #buttons').fadeIn()
  }, "jsonp")
}

// Function to swap temperature display between Fahrenheit and Celsius
function swapUnits() {
  if (unitLabel === 'F') {
    unitLabel = 'C'
    $("#temperature").hide().html(tempC + "<sup>o</sup> " + unitLabel).fadeIn()
  } else {
    unitLabel = 'F'
    $("#temperature").hide().html(tempF + "<sup>o</sup> " + unitLabel).fadeIn()
  }
}

// Execute upon full page load
$(document).ready(function() {
  $('#weatherInfo, #buttons').hide()
  getLocation()
})
