const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {

  // first URL used to turn the city name into coordinates
  const url1 = "https://api.openweathermap.org/geo/1.0/direct?q=london&limit=1&appid=f75f3ea4fb1c1bfa8c349231332528f1"

  // Making the first GET request with HTTPS module to the weather api website
  https.get(url1, function(response){
    console.log(response.statusCode);

    // creating variables for the fetched data and turning it into readable JS with "JSON"
    response.on("data", function(data){
      const coordinates = JSON.parse(data);
      const city = coordinates[0].name;
      const country = coordinates[0].country;
      const lat = coordinates[0].lat;
      const lon = coordinates[0].lon;


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


      // coordinates are put into second URL to fetch the "One Call" data from weather api website
      const url2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&appid=ce9abe2ffe57c4047cfc6522690f250e&units=metric"

      // Making the second GET request with HTTPS module to the weather api website
      https.get(url2, function(response){
        console.log(response.statusCode);

        // creating variables for the fetched data and turning it into readable JS with "JSON"
        response.on("data", function(data){
          const weatherData = JSON.parse(data);
          const weatherDescription = weatherData.current.weather[0].description;
          const currentDateDt = weatherData.current.dt;

          // First Day Data
          const currentTemp = weatherData.current.temp;
          const currentWindDeg = weatherData.current.wind_deg;
          const currentWindSpeed = weatherData.current.wind_speed;

          // Second Day Data
          const secondDayDayTemp = weatherData.daily[0].temp.day;
          const secondDayNightTemp = weatherData.daily[0].temp.night;

          // Third Day Data
          const thirdDayDayTemp = weatherData.daily[1].temp.day;
          const thirdDayNightTemp = weatherData.daily[1].temp.night;

          // Fourth Day Data
          const fourthDayDayTemp = weatherData.daily[2].temp.day;
          const fourthDayNightTemp = weatherData.daily[2].temp.night;

          // Fifth Day Data
          const fifthDayDayTemp = weatherData.daily[3].temp.day;
          const fifthDayNightTemp = weatherData.daily[3].temp.night;

          // Sixth Day Data
          const sixthDayDayTemp = weatherData.daily[4].temp.day;
          const sixthDayNightTemp = weatherData.daily[4].temp.night;

          // Last Day Data
          const lastDayDayTemp = weatherData.daily[5].temp.day;
          const lastDayNightTemp = weatherData.daily[5].temp.night;



          // Calculating the current Date from the unix timestamp given in "dt"
          const dateObject = new Date(currentDateDt * 1000);
          const dateObjectDay = dateObject.toLocaleString("en-US", {day: "numeric"});
          const dateObjectMonth = dateObject.toLocaleString("en-US",{month: "short"});

          // Calculating the wind direction from the given wind degree
          function degToCard(currentWindDeg){
            if (currentWindDeg>45 && currentWindDeg<135){
              return "East";
            }else if (currentWindDeg>135 && currentWindDeg<225){
              return "South";
            }else if (currentWindDeg>225 && currentWindDeg<315){
              return "West";
            }else{
              return "North";
            }
          }

          const currentWindDir = degToCard(currentWindDeg);

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

          console.log(weatherDescription);
          console.log(dateObjectDay, dateObjectMonth);
          console.log("Current Data: Temp: " + currentTemp + ", Wind Speed: " + currentWindSpeed + ", Wind Direction: " + currentWindDir);
          console.log("Second day Data: Day Temp: " + secondDayDayTemp + ", Night Temp: " + secondDayNightTemp);
          console.log("Third day Data: Day Temp: " + thirdDayDayTemp + ", Night Temp: " + thirdDayNightTemp);
          console.log("Fourth day Data: Day Temp: " + fourthDayDayTemp + ", Night Temp: " + fourthDayNightTemp);
          console.log("Fifth day Data: Day Temp: " + fifthDayDayTemp + ", Night Temp: " + fifthDayNightTemp);
          console.log("Sixth day Data: Day Temp: " + sixthDayDayTemp + ", Night Temp: " + sixthDayNightTemp);
          console.log("Last day Data: Day Temp: " + lastDayDayTemp + ", Night Temp: " + lastDayNightTemp);


          console.log("----------------------");

          // some more formatting
          console.log("")
          console.log("==================")
          console.log("")


          // function that turns full date strings into full Weekday names
          function getDayName(dateStr, locale){
            var date = new Date(dateStr);
            return date.toLocaleDateString(locale, { weekday: 'long' });
          }


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



          // printing all the Weekdays and their dates
          console.log(getDayName(firstDay), firstDay);
          console.log(getDayName(secondDay), secondDay);
          console.log(getDayName(thirdDay), thirdDay);
          console.log(getDayName(fourthDay), fourthDay);
          console.log(getDayName(fifthDay), fifthDay);
          console.log(getDayName(sixthDay), sixthDay);
          console.log(getDayName(lastDay), lastDay);
        })
      })
    })
  })



	res.send("Server is up and running.");
})



app.listen(3000, function() {
	console.log("Server is running on port 3000.");
})
