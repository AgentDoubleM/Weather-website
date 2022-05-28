const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {

  // Putting example API link (with key) into a constant
  const url = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=f75f3ea4fb1c1bfa8c349231332528f1&unit=metric"

  // Making the GET request with HTTPS module to the weather api website
  https.get(url, function(response){
    console.log(response.statusCode);

    // Printing the fetched data onto the console in readable JS
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherData);
      console.log(weatherDescription);
    })
  })

	res.send("Server is up and running.");
})




app.listen(3000, function() {
	console.log("Server is running on port 3000.");
})
