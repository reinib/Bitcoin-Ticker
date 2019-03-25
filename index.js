// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  const baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  const crypto = req.body.crypto;
  const fiat = req.body.fiat;

  const finalURL = baseURL + crypto + fiat;

  request(finalURL, function(err, request, body){

    const data = JSON.parse(body);
    const price = data.last;
    const date = data.display_timestamp;

    res.write(`<h1>The current date is ${date}</h1>`);

    res.write(`<h1>The price of ${crypto} is ` + price + ` in ${fiat}</h1>`);

    res.send();
  });
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
