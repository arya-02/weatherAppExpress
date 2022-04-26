const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '32b6c02e7e8cd2946756478b626e0292';


const app = express();
const port =3000;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
            // let weatherText = `It's ${weather.main.temp} farenheit in ${weather.name}!`;
            res.render('index', {weather: weather, error: null});
            }
        }
    });
});

app.get('/',(req,res)=>{
    res.render('index');
});

app.listen(port,()=>{
    console.log("Server running!");
});