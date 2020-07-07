const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const city=req.body.cityName;
  const appKey="a9d926127871cd7f6a3a1f1a9009668b";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?appid="+appKey+"&q="+city+"&units="+unit;
  console.log(url);
  https.get(url,function(response){

    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDesc=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const iconUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<h1>The tepearature in "+city+" is "+temp+" Celcius</h1>");
      res.write("<p>The weather is currently "+weatherDesc+"</p>");
      res.write("<img src="+iconUrl+">")
      res.send();

    });

  });
});

app.listen(3000,function(){
  console.log("Server is running at Port 3000");
});
