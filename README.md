# Show the Local Weather - FreeCodeCamp Project
---
## 1. What This Project Does
This is a simple app to display the weather at the location of the user. This requires the use of either the geolocation object or another API to determine the user's location, and another call to a weather API to grab weather data for said location. This was a fun/frustrating project in that it introduced me to the concept of asynchronous JavaScript calls, and the need to properly structure functions to handle it.

The user stories for this project are:

* User can see details for the weather at their current location
* User can see a different icon or background image depending on the weather
* User can push a button to toggle between units (Fahrenheit and Celsius)
* Use any libraries or APIs needed, [OpenWeatherMap API](https://openweathermap.org/current#geo) recommended, and give it your own personal style

The originally submitted version of the app fulfills all user stories, and the various iterations since will be improvements either in styling or in making the code more succinct.

## 2. How To Set This Up
If you want to clone this project for yourself, the process is very simple due to the structure of the project.

1. Either manually download and unzip files to a location, or clone this repo through Git.
2. Open the index.html file in your browser. This project is built on HTML5/CSS3/JavaScript/jQuery and the necessary resources from Bootstrap and FontAwesome are linked through the HTML file, so there is no need to install any packages through NPM.

## 3. Project Goals
As one of my early web development projects, this was a chance for me to:

* Continue working with HTML/CSS/Boostrrap for styling and creating a crisp, visually appealing user experience
* Practice using jQuery to monitor buttons for clicks and apply appropriate responses to the DOM
* Practice making AJAX calls which have dependencies on previous AJAX calls, thus requiring careful structuring of code...
* Practice parsing the resulting JSON objects and using said data to render new text/images to the DOM
* Continue producing well-documented code with repetitive functionality factored out into specific functions that minimize redundancy, keep code short, and increase readability/maintainability

Now that I'm coming back and reviewing past projects (such as this one), my new goals in addition to supporting the previous ones are:

* Redesign the app to fit into my growing design language/styling through color, layout, animations, and reduction of unnecessary elements
* Refactor any redundancies in my JavaScript and make old code compliant with current linters (such as AirBnB's standards)

## 4. Link to Live Site
The latest version of the site can be viewed [here](http://codepen.io/Bromomatic/full/qNZBjM/)! Unfortunately the JSON from OpenWeatherMapAPI is delivered by http instead of https, and the code will not work if hosted on gh-pages.

## 5. Roadmap
TODO:

* ~~Establish flow of load page -> get user location -> get weather for location -> render to DOM~~
* ~~Successfully get user location~~
* ~~Successfully get weather for user location~~
* ~~Resolve asynchronous behavior... initial weather currently always uses the value of global lat/long coordinates instead of user values~~
* ~~Render City/State/Country, temperature, and weather icon to DOM~~
* ~~Enable F/C toggle button~~
* ~~Initial build of app on CodePen and submission to FreeCodeCamp~~
* Clean up redundant divs, classes, and CSS attributes
* Restyle app
* Add animations
