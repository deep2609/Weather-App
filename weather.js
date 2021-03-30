const express=require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  console.log("Request received");
  console.log(req.body.cityName);
  var cityName = req.body.cityName;
  var url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+cityName+"&appid={Enter API key}";
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      var temp = weatherData.main.temp;
      var sky = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;

      const urlImage = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      console.log(sky);
      res.write("<h1>The temperature in "+cityName+" is "+temp+" degrees Celsius.</h1>");
      res.write("<p>Conditions are : "+sky+"</p>");
      res.write("<img src="+urlImage+">");
      res.send();
    });
  });
});

app.listen(3000,function(){
  console.log("Server is up and running on port 3000");
});
