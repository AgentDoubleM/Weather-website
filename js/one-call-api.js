let search = "";
let backup = "Berlin";
let lat = "";
let lon = "";
const celcius = "°C"
const fahrenheit = "°F"



function oneCallApiMetric() {
  checkInput();

  const url1 = "https://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=f75f3ea4fb1c1bfa8c349231332528f1";

  var request1 = new XMLHttpRequest()
  request1.open('GET', url1, true)
  request1.onload = function() {
    // Begin accessing JSON data here
    var coordinates = JSON.parse(this.response)
    if (request1.status >= 200 && request1.status < 400) {

      if (coordinates.length === 0) {
        window.alert("Input is not a valid location! Please try again!")
      } else {
        const city = coordinates[0].name;
        const country = coordinates[0].country;
        lat = coordinates[0].lat;
        lon = coordinates[0].lon;

        backup = city;

        // formatting
        console.log("")
        console.log("------------")
        console.log("First Fetch:")
        console.log("------------")
        console.log("")

        // Printing all the fetched data onto the console
        console.log(city);
        console.log(country);
        console.log(lat);
        console.log(lon);


        // formatting for fun
        console.log("")
        console.log("==================")
        console.log("")

        document.getElementById("city").innerHTML = city;


        const url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=ce9abe2ffe57c4047cfc6522690f250e&units=metric"

        var request2 = new XMLHttpRequest()
        request2.open('GET', url2, true)
        request2.onload = function() {
          // Begin accessing JSON data here
          var weatherData = JSON.parse(this.response)
          if (request2.status >= 200 && request2.status < 400) {

            const weatherDescription1 = weatherData.current.weather[0].description;
            const weatherDescription2 = weatherData.daily[0].weather[0].description;
            const weatherDescription3 = weatherData.daily[1].weather[0].description;
            const weatherDescription4 = weatherData.daily[2].weather[0].description;
            const weatherDescription5 = weatherData.daily[3].weather[0].description;
            const weatherDescription6 = weatherData.daily[4].weather[0].description;
            const weatherDescription7 = weatherData.daily[5].weather[0].description;

            const weatherIcon1 = weatherData.current.weather[0].icon;
            const weatherIcon2 = weatherData.daily[0].weather[0].icon;
            const weatherIcon3 = weatherData.daily[1].weather[0].icon;
            const weatherIcon4 = weatherData.daily[2].weather[0].icon;
            const weatherIcon5 = weatherData.daily[3].weather[0].icon;
            const weatherIcon6 = weatherData.daily[4].weather[0].icon;
            const weatherIcon7 = weatherData.daily[5].weather[0].icon;

            document.getElementById("weather-icon-1").src = "http://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png";
            document.getElementById("weather-icon-2").src = "http://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png";
            document.getElementById("weather-icon-3").src = "http://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png";
            document.getElementById("weather-icon-4").src = "http://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png";
            document.getElementById("weather-icon-5").src = "http://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png";
            document.getElementById("weather-icon-6").src = "http://openweathermap.org/img/wn/" + weatherIcon6 + "@2x.png";
            document.getElementById("weather-icon-7").src = "http://openweathermap.org/img/wn/" + weatherIcon7 + "@2x.png";

            const currentDateDt = weatherData.current.dt;


            // First Day Data
            const currentTemp = Math.round(weatherData.current.temp);
            const currentWindDeg = weatherData.current.wind_deg;
            const currentWindSpeed = Math.round(weatherData.current.wind_speed * 3.6);

            document.getElementById("currentTemp").innerHTML = currentTemp + celcius;
            document.getElementById("windSpeed").innerHTML = currentWindSpeed + " m/s";


            // Second Day Data
            const secondDayDayTemp = Math.round(weatherData.daily[0].temp.day);
            const secondDayNightTemp = Math.round(weatherData.daily[0].temp.night);

            document.getElementById("secondDayDayTemp").innerHTML = secondDayDayTemp + celcius;
            document.getElementById("secondDayNightTemp").innerHTML = secondDayNightTemp + celcius;


            // Third Day Data
            const thirdDayDayTemp = Math.round(weatherData.daily[1].temp.day);
            const thirdDayNightTemp = Math.round(weatherData.daily[1].temp.night);

            document.getElementById("thirdDayDayTemp").innerHTML = thirdDayDayTemp + celcius;
            document.getElementById("thirdDayNightTemp").innerHTML = thirdDayNightTemp + celcius;


            // Fourth Day Data
            const fourthDayDayTemp = Math.round(weatherData.daily[2].temp.day);
            const fourthDayNightTemp = Math.round(weatherData.daily[2].temp.night);

            document.getElementById("fourthDayDayTemp").innerHTML = fourthDayDayTemp + celcius;
            document.getElementById("fourthDayNightTemp").innerHTML = fourthDayNightTemp + celcius;


            // Fifth Day Data
            const fifthDayDayTemp = Math.round(weatherData.daily[3].temp.day);
            const fifthDayNightTemp = Math.round(weatherData.daily[3].temp.night);

            document.getElementById("fifthDayDayTemp").innerHTML = fifthDayDayTemp + celcius;
            document.getElementById("fifthDayNightTemp").innerHTML = fifthDayNightTemp + celcius;


            // Sixth Day Data
            const sixthDayDayTemp = Math.round(weatherData.daily[4].temp.day);
            const sixthDayNightTemp = Math.round(weatherData.daily[4].temp.night);

            document.getElementById("sixthDayDayTemp").innerHTML = sixthDayDayTemp + celcius;
            document.getElementById("sixthDayNightTemp").innerHTML = sixthDayNightTemp + celcius;


            // Last Day Data
            const lastDayDayTemp = Math.round(weatherData.daily[5].temp.day);
            const lastDayNightTemp = Math.round(weatherData.daily[5].temp.night);

            document.getElementById("lastDayDayTemp").innerHTML = lastDayDayTemp + celcius;
            document.getElementById("lastDayNightTemp").innerHTML = lastDayNightTemp + celcius;



            // Calculating the current Date from the unix timestamp given in "dt"
            const dateObject = new Date(currentDateDt * 1000);
            const dateObjectDay = dateObject.toLocaleString("en-US", {
              day: "numeric"
            });
            const dateObjectMonth = dateObject.toLocaleString("en-US", {
              month: "short"
            });
            const date = [dateObjectDay, dateObjectMonth];

            // Calculating the wind direction from the given wind degree
            function degToCard(currentWindDeg) {
              if (currentWindDeg > 45 && currentWindDeg < 135) {
                return "East";
              } else if (currentWindDeg > 135 && currentWindDeg < 225) {
                return "South";
              } else if (currentWindDeg > 225 && currentWindDeg < 315) {
                return "West";
              } else {
                return "North";
              }
            }

            const currentWindDir = degToCard(currentWindDeg);

            document.getElementById("windDir").innerHTML = currentWindDir;


            // formatting
            console.log("")
            console.log("-------------")
            console.log("Second Fetch:")
            console.log("-------------")
            console.log("")

            // Printing all the fetched data onto the console
            console.log(weatherData);

            console.log("");
            console.log("----------------------");
            console.log("Specified Weatherdata:");
            console.log("");

            console.log(weatherDescription1);
            console.log(dateObjectDay, dateObjectMonth);
            console.log("Current Data: Temp: " + currentTemp + ", Wind Speed: " + currentWindSpeed + ", Wind Direction: " + currentWindDir + ", Weather Description: " + weatherDescription1);
            console.log("Second day Data: Day Temp: " + secondDayDayTemp + ", Night Temp: " + secondDayNightTemp + ", Weather Description: " + weatherDescription2);
            console.log("Third day Data: Day Temp: " + thirdDayDayTemp + ", Night Temp: " + thirdDayNightTemp + ", Weather Description: " + weatherDescription3);
            console.log("Fourth day Data: Day Temp: " + fourthDayDayTemp + ", Night Temp: " + fourthDayNightTemp + ", Weather Description: " + weatherDescription4);
            console.log("Fifth day Data: Day Temp: " + fifthDayDayTemp + ", Night Temp: " + fifthDayNightTemp + ", Weather Description: " + weatherDescription5);
            console.log("Sixth day Data: Day Temp: " + sixthDayDayTemp + ", Night Temp: " + sixthDayNightTemp + ", Weather Description: " + weatherDescription6);
            console.log("Last day Data: Day Temp: " + lastDayDayTemp + ", Night Temp: " + lastDayNightTemp + ", Weather Description: " + weatherDescription7);


            console.log("----------------------");

            // some more formatting
            console.log("")
            console.log("==================")
            console.log("")


            // function that turns full date strings into full Weekday names
            function getDayName(dateStr, locale) {
              let date = new Date(dateStr);
              return date.toLocaleDateString(locale, {
                weekday: 'long'
              });
            }

            document.getElementById("date").innerHTML = date[0] + " " + date[1];


            // Get all the days of the week starting from the current day.
            const firstDay = new Date();

            const secondDay = new Date();
            secondDay.setDate(new Date().getDate() + 1);

            const thirdDay = new Date();
            thirdDay.setDate(new Date().getDate() + 2);

            const fourthDay = new Date();
            fourthDay.setDate(new Date().getDate() + 3);

            const fifthDay = new Date();
            fifthDay.setDate(new Date().getDate() + 4);

            const sixthDay = new Date();
            sixthDay.setDate(new Date().getDate() + 5);

            const lastDay = new Date();
            lastDay.setDate(new Date().getDate() + 6);

            //===========================================================//
            // Excurs: How to get dates with JS//

            // A date instance in JavaScript provides a .setDate() method to set the day of the month.
            // A goody provided by this method: it automatically switches the month in case you’re exceeding the days in a month.
            // At first, you need “today” as a reference. Use the new Date() constructor to create a date instance of today.
            // Then, retrieving the day of tomorrow is a calculation of adding one day to the current day of the month using.
            // You can retrieve the day of “today” using the .getDate() method.
            //===========================================================//

            const longFirstDay = getDayName(firstDay);
            const longSecondDay = getDayName(secondDay);
            const longThirdDay = getDayName(thirdDay);
            const longFourthDay = getDayName(fourthDay);
            const longFifthDay = getDayName(fifthDay);
            const longSixthDay = getDayName(sixthDay);
            const longLastDay = getDayName(lastDay);

            document.getElementById("firstDay").innerHTML = longFirstDay;
            document.getElementById("secondDay").innerHTML = longSecondDay;
            document.getElementById("thirdDay").innerHTML = longThirdDay;
            document.getElementById("fourthDay").innerHTML = longFourthDay;
            document.getElementById("fifthDay").innerHTML = longFifthDay;
            document.getElementById("sixthDay").innerHTML = longSixthDay;
            document.getElementById("lastDay").innerHTML = longLastDay;


            // printing all the Weekdays and their dates
            console.log(longFirstDay, firstDay);
            console.log(longSecondDay, secondDay);
            console.log(longThirdDay, thirdDay);
            console.log(longFourthDay, fourthDay);
            console.log(longFifthDay, fifthDay);
            console.log(longSixthDay, sixthDay);
            console.log(longLastDay, lastDay);




          } else {
            console.log("Fetch failed!")
          }
        }

        request2.send();

      }


    } else {
      console.log("Fetch failed!")
    }
  }

  request1.send();
}



function oneCallApiImperial() {

  checkInput();

  const url1 = "https://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=f75f3ea4fb1c1bfa8c349231332528f1";

  var request1 = new XMLHttpRequest()
  request1.open('GET', url1, true)
  request1.onload = function() {
    // Begin accessing JSON data here
    var coordinates = JSON.parse(this.response)
    if (request1.status >= 200 && request1.status < 400) {

      const city = coordinates[0].name;
      const country = coordinates[0].country;
      lat = coordinates[0].lat;
      lon = coordinates[0].lon;

      backup = city;

      // formatting
      console.log("")
      console.log("------------")
      console.log("First Fetch:")
      console.log("------------")
      console.log("")

      // Printing all the fetched data onto the console
      console.log(city);
      console.log(country);
      console.log(lat);
      console.log(lon);


      // formatting for fun
      console.log("")
      console.log("==================")
      console.log("")

      document.getElementById("city").innerHTML = city;


      const url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=ce9abe2ffe57c4047cfc6522690f250e&units=imperial"

      var request2 = new XMLHttpRequest()
      request2.open('GET', url2, true)
      request2.onload = function() {
        // Begin accessing JSON data here
        var weatherData = JSON.parse(this.response)
        if (request2.status >= 200 && request2.status < 400) {

          const weatherDescription1 = weatherData.current.weather[0].description;
          const weatherDescription2 = weatherData.daily[0].weather[0].description;
          const weatherDescription3 = weatherData.daily[1].weather[0].description;
          const weatherDescription4 = weatherData.daily[2].weather[0].description;
          const weatherDescription5 = weatherData.daily[3].weather[0].description;
          const weatherDescription6 = weatherData.daily[4].weather[0].description;
          const weatherDescription7 = weatherData.daily[5].weather[0].description;

          const weatherIcon1 = weatherData.current.weather[0].icon;
          const weatherIcon2 = weatherData.daily[0].weather[0].icon;
          const weatherIcon3 = weatherData.daily[1].weather[0].icon;
          const weatherIcon4 = weatherData.daily[2].weather[0].icon;
          const weatherIcon5 = weatherData.daily[3].weather[0].icon;
          const weatherIcon6 = weatherData.daily[4].weather[0].icon;
          const weatherIcon7 = weatherData.daily[5].weather[0].icon;

          document.getElementById("weather-icon-1").src = "http://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png";
          document.getElementById("weather-icon-2").src = "http://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png";
          document.getElementById("weather-icon-3").src = "http://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png";
          document.getElementById("weather-icon-4").src = "http://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png";
          document.getElementById("weather-icon-5").src = "http://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png";
          document.getElementById("weather-icon-6").src = "http://openweathermap.org/img/wn/" + weatherIcon6 + "@2x.png";
          document.getElementById("weather-icon-7").src = "http://openweathermap.org/img/wn/" + weatherIcon7 + "@2x.png";

          const currentDateDt = weatherData.current.dt;


          // First Day Data
          const currentTemp = Math.round(weatherData.current.temp);
          const currentWindDeg = weatherData.current.wind_deg;
          const currentWindSpeed = Math.round(weatherData.current.wind_speed * 3.6);

          document.getElementById("currentTemp").innerHTML = currentTemp + fahrenheit;
          document.getElementById("windSpeed").innerHTML = currentWindSpeed + " mph";


          // Second Day Data
          const secondDayDayTemp = Math.round(weatherData.daily[0].temp.day);
          const secondDayNightTemp = Math.round(weatherData.daily[0].temp.night);

          document.getElementById("secondDayDayTemp").innerHTML = secondDayDayTemp + fahrenheit;
          document.getElementById("secondDayNightTemp").innerHTML = secondDayNightTemp + fahrenheit;


          // Third Day Data
          const thirdDayDayTemp = Math.round(weatherData.daily[1].temp.day);
          const thirdDayNightTemp = Math.round(weatherData.daily[1].temp.night);

          document.getElementById("thirdDayDayTemp").innerHTML = thirdDayDayTemp + fahrenheit;
          document.getElementById("thirdDayNightTemp").innerHTML = thirdDayNightTemp + fahrenheit;


          // Fourth Day Data
          const fourthDayDayTemp = Math.round(weatherData.daily[2].temp.day);
          const fourthDayNightTemp = Math.round(weatherData.daily[2].temp.night);

          document.getElementById("fourthDayDayTemp").innerHTML = fourthDayDayTemp + fahrenheit;
          document.getElementById("fourthDayNightTemp").innerHTML = fourthDayNightTemp + fahrenheit;


          // Fifth Day Data
          const fifthDayDayTemp = Math.round(weatherData.daily[3].temp.day);
          const fifthDayNightTemp = Math.round(weatherData.daily[3].temp.night);

          document.getElementById("fifthDayDayTemp").innerHTML = fifthDayDayTemp + fahrenheit;
          document.getElementById("fifthDayNightTemp").innerHTML = fifthDayNightTemp + fahrenheit;


          // Sixth Day Data
          const sixthDayDayTemp = Math.round(weatherData.daily[4].temp.day);
          const sixthDayNightTemp = Math.round(weatherData.daily[4].temp.night);

          document.getElementById("sixthDayDayTemp").innerHTML = sixthDayDayTemp + fahrenheit;
          document.getElementById("sixthDayNightTemp").innerHTML = sixthDayNightTemp + fahrenheit;


          // Last Day Data
          const lastDayDayTemp = Math.round(weatherData.daily[5].temp.day);
          const lastDayNightTemp = Math.round(weatherData.daily[5].temp.night);

          document.getElementById("lastDayDayTemp").innerHTML = lastDayDayTemp + fahrenheit;
          document.getElementById("lastDayNightTemp").innerHTML = lastDayNightTemp + fahrenheit;



          // Calculating the current Date from the unix timestamp given in "dt"
          const dateObject = new Date(currentDateDt * 1000);
          const dateObjectDay = dateObject.toLocaleString("en-US", {
            day: "numeric"
          });
          const dateObjectMonth = dateObject.toLocaleString("en-US", {
            month: "short"
          });
          const date = [dateObjectDay, dateObjectMonth];

          // Calculating the wind direction from the given wind degree
          function degToCard(currentWindDeg) {
            if (currentWindDeg > 45 && currentWindDeg < 135) {
              return "East";
            } else if (currentWindDeg > 135 && currentWindDeg < 225) {
              return "South";
            } else if (currentWindDeg > 225 && currentWindDeg < 315) {
              return "West";
            } else {
              return "North";
            }
          }

          const currentWindDir = degToCard(currentWindDeg);

          document.getElementById("windDir").innerHTML = currentWindDir;


          // formatting
          console.log("")
          console.log("-------------")
          console.log("Second Fetch:")
          console.log("-------------")
          console.log("")

          // Printing all the fetched data onto the console
          console.log(weatherData);

          console.log("");
          console.log("----------------------");
          console.log("Specified Weatherdata:");
          console.log("");

          console.log(weatherDescription1);
          console.log(dateObjectDay, dateObjectMonth);
          console.log("Current Data: Temp: " + currentTemp + ", Wind Speed: " + currentWindSpeed + ", Wind Direction: " + currentWindDir + ", Weather Description: " + weatherDescription1);
          console.log("Second day Data: Day Temp: " + secondDayDayTemp + ", Night Temp: " + secondDayNightTemp + ", Weather Description: " + weatherDescription2);
          console.log("Third day Data: Day Temp: " + thirdDayDayTemp + ", Night Temp: " + thirdDayNightTemp + ", Weather Description: " + weatherDescription3);
          console.log("Fourth day Data: Day Temp: " + fourthDayDayTemp + ", Night Temp: " + fourthDayNightTemp + ", Weather Description: " + weatherDescription4);
          console.log("Fifth day Data: Day Temp: " + fifthDayDayTemp + ", Night Temp: " + fifthDayNightTemp + ", Weather Description: " + weatherDescription5);
          console.log("Sixth day Data: Day Temp: " + sixthDayDayTemp + ", Night Temp: " + sixthDayNightTemp + ", Weather Description: " + weatherDescription6);
          console.log("Last day Data: Day Temp: " + lastDayDayTemp + ", Night Temp: " + lastDayNightTemp + ", Weather Description: " + weatherDescription7);


          console.log("----------------------");

          // some more formatting
          console.log("")
          console.log("==================")
          console.log("")


          // function that turns full date strings into full Weekday names
          function getDayName(dateStr, locale) {
            let date = new Date(dateStr);
            return date.toLocaleDateString(locale, {
              weekday: 'long'
            });
          }

          document.getElementById("date").innerHTML = date[0] + " " + date[1];


          // Get all the days of the week starting from the current day.
          const firstDay = new Date();

          const secondDay = new Date();
          secondDay.setDate(new Date().getDate() + 1);

          const thirdDay = new Date();
          thirdDay.setDate(new Date().getDate() + 2);

          const fourthDay = new Date();
          fourthDay.setDate(new Date().getDate() + 3);

          const fifthDay = new Date();
          fifthDay.setDate(new Date().getDate() + 4);

          const sixthDay = new Date();
          sixthDay.setDate(new Date().getDate() + 5);

          const lastDay = new Date();
          lastDay.setDate(new Date().getDate() + 6);


          const longFirstDay = getDayName(firstDay);
          const longSecondDay = getDayName(secondDay);
          const longThirdDay = getDayName(thirdDay);
          const longFourthDay = getDayName(fourthDay);
          const longFifthDay = getDayName(fifthDay);
          const longSixthDay = getDayName(sixthDay);
          const longLastDay = getDayName(lastDay);

          document.getElementById("firstDay").innerHTML = longFirstDay;
          document.getElementById("secondDay").innerHTML = longSecondDay;
          document.getElementById("thirdDay").innerHTML = longThirdDay;
          document.getElementById("fourthDay").innerHTML = longFourthDay;
          document.getElementById("fifthDay").innerHTML = longFifthDay;
          document.getElementById("sixthDay").innerHTML = longSixthDay;
          document.getElementById("lastDay").innerHTML = longLastDay;


          // printing all the Weekdays and their dates
          console.log(longFirstDay, firstDay);
          console.log(longSecondDay, secondDay);
          console.log(longThirdDay, thirdDay);
          console.log(longFourthDay, fourthDay);
          console.log(longFifthDay, fifthDay);
          console.log(longSixthDay, sixthDay);
          console.log(longLastDay, lastDay);




        } else {
          console.log("Fetch failed!")
        }
      }

      request2.send();



    } else {
      console.log("Fetch failed!")
    }
  }

  request1.send();
}


function oneCallApiGeo() {

  const url1 = "http://api.openweathermap.org/geo/1.0/reverse?lat=" + lat + "&lon=" + lon + "&limit=1&appid=f75f3ea4fb1c1bfa8c349231332528f1";

  var request1 = new XMLHttpRequest()
  request1.open('GET', url1, true)
  request1.onload = function() {
    // Begin accessing JSON data here
    var coordinates = JSON.parse(this.response)
    if (request1.status >= 200 && request1.status < 400) {

      if (coordinates.length === 0) {
        window.alert("Input is not a valid location! Please try again!")
      } else {
        const city = coordinates[0].name;
        const country = coordinates[0].country;
        lat = coordinates[0].lat;
        lon = coordinates[0].lon;

        search = city;
        backup = city;

        // formatting
        console.log("")
        console.log("------------")
        console.log("First Fetch:")
        console.log("------------")
        console.log("")

        // Printing all the fetched data onto the console
        console.log(city);
        console.log(country);
        console.log(lat);
        console.log(lon);


        // formatting for fun
        console.log("")
        console.log("==================")
        console.log("")

        document.getElementById("city").innerHTML = city;


        const url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=ce9abe2ffe57c4047cfc6522690f250e&units=metric"

        var request2 = new XMLHttpRequest()
        request2.open('GET', url2, true)
        request2.onload = function() {
          // Begin accessing JSON data here
          var weatherData = JSON.parse(this.response)
          if (request2.status >= 200 && request2.status < 400) {

            const weatherDescription1 = weatherData.current.weather[0].description;
            const weatherDescription2 = weatherData.daily[0].weather[0].description;
            const weatherDescription3 = weatherData.daily[1].weather[0].description;
            const weatherDescription4 = weatherData.daily[2].weather[0].description;
            const weatherDescription5 = weatherData.daily[3].weather[0].description;
            const weatherDescription6 = weatherData.daily[4].weather[0].description;
            const weatherDescription7 = weatherData.daily[5].weather[0].description;

            const weatherIcon1 = weatherData.current.weather[0].icon;
            const weatherIcon2 = weatherData.daily[0].weather[0].icon;
            const weatherIcon3 = weatherData.daily[1].weather[0].icon;
            const weatherIcon4 = weatherData.daily[2].weather[0].icon;
            const weatherIcon5 = weatherData.daily[3].weather[0].icon;
            const weatherIcon6 = weatherData.daily[4].weather[0].icon;
            const weatherIcon7 = weatherData.daily[5].weather[0].icon;

            document.getElementById("weather-icon-1").src = "http://openweathermap.org/img/wn/" + weatherIcon1 + "@2x.png";
            document.getElementById("weather-icon-2").src = "http://openweathermap.org/img/wn/" + weatherIcon2 + "@2x.png";
            document.getElementById("weather-icon-3").src = "http://openweathermap.org/img/wn/" + weatherIcon3 + "@2x.png";
            document.getElementById("weather-icon-4").src = "http://openweathermap.org/img/wn/" + weatherIcon4 + "@2x.png";
            document.getElementById("weather-icon-5").src = "http://openweathermap.org/img/wn/" + weatherIcon5 + "@2x.png";
            document.getElementById("weather-icon-6").src = "http://openweathermap.org/img/wn/" + weatherIcon6 + "@2x.png";
            document.getElementById("weather-icon-7").src = "http://openweathermap.org/img/wn/" + weatherIcon7 + "@2x.png";

            const currentDateDt = weatherData.current.dt;


            // First Day Data
            const currentTemp = Math.round(weatherData.current.temp);
            const currentWindDeg = weatherData.current.wind_deg;
            const currentWindSpeed = Math.round(weatherData.current.wind_speed * 3.6);

            document.getElementById("currentTemp").innerHTML = currentTemp + celcius;
            document.getElementById("windSpeed").innerHTML = currentWindSpeed + " m/s";


            // Second Day Data
            const secondDayDayTemp = Math.round(weatherData.daily[0].temp.day);
            const secondDayNightTemp = Math.round(weatherData.daily[0].temp.night);

            document.getElementById("secondDayDayTemp").innerHTML = secondDayDayTemp + celcius;
            document.getElementById("secondDayNightTemp").innerHTML = secondDayNightTemp + celcius;


            // Third Day Data
            const thirdDayDayTemp = Math.round(weatherData.daily[1].temp.day);
            const thirdDayNightTemp = Math.round(weatherData.daily[1].temp.night);

            document.getElementById("thirdDayDayTemp").innerHTML = thirdDayDayTemp + celcius;
            document.getElementById("thirdDayNightTemp").innerHTML = thirdDayNightTemp + celcius;


            // Fourth Day Data
            const fourthDayDayTemp = Math.round(weatherData.daily[2].temp.day);
            const fourthDayNightTemp = Math.round(weatherData.daily[2].temp.night);

            document.getElementById("fourthDayDayTemp").innerHTML = fourthDayDayTemp + celcius;
            document.getElementById("fourthDayNightTemp").innerHTML = fourthDayNightTemp + celcius;


            // Fifth Day Data
            const fifthDayDayTemp = Math.round(weatherData.daily[3].temp.day);
            const fifthDayNightTemp = Math.round(weatherData.daily[3].temp.night);

            document.getElementById("fifthDayDayTemp").innerHTML = fifthDayDayTemp + celcius;
            document.getElementById("fifthDayNightTemp").innerHTML = fifthDayNightTemp + celcius;


            // Sixth Day Data
            const sixthDayDayTemp = Math.round(weatherData.daily[4].temp.day);
            const sixthDayNightTemp = Math.round(weatherData.daily[4].temp.night);

            document.getElementById("sixthDayDayTemp").innerHTML = sixthDayDayTemp + celcius;
            document.getElementById("sixthDayNightTemp").innerHTML = sixthDayNightTemp + celcius;


            // Last Day Data
            const lastDayDayTemp = Math.round(weatherData.daily[5].temp.day);
            const lastDayNightTemp = Math.round(weatherData.daily[5].temp.night);

            document.getElementById("lastDayDayTemp").innerHTML = lastDayDayTemp + celcius;
            document.getElementById("lastDayNightTemp").innerHTML = lastDayNightTemp + celcius;



            // Calculating the current Date from the unix timestamp given in "dt"
            const dateObject = new Date(currentDateDt * 1000);
            const dateObjectDay = dateObject.toLocaleString("en-US", {
              day: "numeric"
            });
            const dateObjectMonth = dateObject.toLocaleString("en-US", {
              month: "short"
            });
            const date = [dateObjectDay, dateObjectMonth];

            // Calculating the wind direction from the given wind degree
            function degToCard(currentWindDeg) {
              if (currentWindDeg > 45 && currentWindDeg < 135) {
                return "East";
              } else if (currentWindDeg > 135 && currentWindDeg < 225) {
                return "South";
              } else if (currentWindDeg > 225 && currentWindDeg < 315) {
                return "West";
              } else {
                return "North";
              }
            }

            const currentWindDir = degToCard(currentWindDeg);

            document.getElementById("windDir").innerHTML = currentWindDir;


            // formatting
            console.log("")
            console.log("-------------")
            console.log("Second Fetch:")
            console.log("-------------")
            console.log("")

            // Printing all the fetched data onto the console
            console.log(weatherData);

            console.log("");
            console.log("----------------------");
            console.log("Specified Weatherdata:");
            console.log("");

            console.log(weatherDescription1);
            console.log(dateObjectDay, dateObjectMonth);
            console.log("Current Data: Temp: " + currentTemp + ", Wind Speed: " + currentWindSpeed + ", Wind Direction: " + currentWindDir + ", Weather Description: " + weatherDescription1);
            console.log("Second day Data: Day Temp: " + secondDayDayTemp + ", Night Temp: " + secondDayNightTemp + ", Weather Description: " + weatherDescription2);
            console.log("Third day Data: Day Temp: " + thirdDayDayTemp + ", Night Temp: " + thirdDayNightTemp + ", Weather Description: " + weatherDescription3);
            console.log("Fourth day Data: Day Temp: " + fourthDayDayTemp + ", Night Temp: " + fourthDayNightTemp + ", Weather Description: " + weatherDescription4);
            console.log("Fifth day Data: Day Temp: " + fifthDayDayTemp + ", Night Temp: " + fifthDayNightTemp + ", Weather Description: " + weatherDescription5);
            console.log("Sixth day Data: Day Temp: " + sixthDayDayTemp + ", Night Temp: " + sixthDayNightTemp + ", Weather Description: " + weatherDescription6);
            console.log("Last day Data: Day Temp: " + lastDayDayTemp + ", Night Temp: " + lastDayNightTemp + ", Weather Description: " + weatherDescription7);


            console.log("----------------------");

            // some more formatting
            console.log("")
            console.log("==================")
            console.log("")


            // function that turns full date strings into full Weekday names
            function getDayName(dateStr, locale) {
              let date = new Date(dateStr);
              return date.toLocaleDateString(locale, {
                weekday: 'long'
              });
            }

            document.getElementById("date").innerHTML = date[0] + " " + date[1];


            // Get all the days of the week starting from the current day.
            const firstDay = new Date();

            const secondDay = new Date();
            secondDay.setDate(new Date().getDate() + 1);

            const thirdDay = new Date();
            thirdDay.setDate(new Date().getDate() + 2);

            const fourthDay = new Date();
            fourthDay.setDate(new Date().getDate() + 3);

            const fifthDay = new Date();
            fifthDay.setDate(new Date().getDate() + 4);

            const sixthDay = new Date();
            sixthDay.setDate(new Date().getDate() + 5);

            const lastDay = new Date();
            lastDay.setDate(new Date().getDate() + 6);


            const longFirstDay = getDayName(firstDay);
            const longSecondDay = getDayName(secondDay);
            const longThirdDay = getDayName(thirdDay);
            const longFourthDay = getDayName(fourthDay);
            const longFifthDay = getDayName(fifthDay);
            const longSixthDay = getDayName(sixthDay);
            const longLastDay = getDayName(lastDay);

            document.getElementById("firstDay").innerHTML = longFirstDay;
            document.getElementById("secondDay").innerHTML = longSecondDay;
            document.getElementById("thirdDay").innerHTML = longThirdDay;
            document.getElementById("fourthDay").innerHTML = longFourthDay;
            document.getElementById("fifthDay").innerHTML = longFifthDay;
            document.getElementById("sixthDay").innerHTML = longSixthDay;
            document.getElementById("lastDay").innerHTML = longLastDay;


            // printing all the Weekdays and their dates
            console.log(longFirstDay, firstDay);
            console.log(longSecondDay, secondDay);
            console.log(longThirdDay, thirdDay);
            console.log(longFourthDay, fourthDay);
            console.log(longFifthDay, fifthDay);
            console.log(longSixthDay, sixthDay);
            console.log(longLastDay, lastDay);




          } else {
            console.log("Fetch failed!")
          }
        }

        request2.send();

      }


    } else {
      console.log("Fetch failed!")
    }
  }

  request1.send();
}


oneCallApiMetric();


function checkInput() {

  if (search === "") {
    search = "Berlin";
  } else {
    console.log(search);
  }

  const url1 = "https://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=1&appid=f75f3ea4fb1c1bfa8c349231332528f1";

  var request1 = new XMLHttpRequest()
  request1.open('GET', url1, true)
  request1.onload = function() {
    // Begin accessing JSON data here
    var coordinates = JSON.parse(this.response)
    if (request1.status >= 200 && request1.status < 400) {

      if (coordinates.length === 0) {
        search = backup
        console.log("")
        console.log("==================")
        console.log("Input was invalid and was changed");
        console.log("==================")
        console.log("")
      } else {
        console.log("")
        console.log("==================")
        console.log("Input was valid");
        console.log("==================")
        console.log("")
      }
    } else {
      console.log("Fetch failed!")
    }
  }
  request1.send();
}


function saveInput() {
  search = document.getElementById("input").value;
  console.log(search);

  oneCallApiMetric();
}


function successCallback(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log("")
  console.log("==================")
  console.log("User is currently here:")
  console.log(lat);
  console.log(lon);
  console.log("==================")
  console.log("")

  oneCallApiGeo();
}

function errorCallback(error) {
  console.log("")
  console.log("==================")
  console.log(error.message);
  console.log("==================")
  console.log("")
}

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
