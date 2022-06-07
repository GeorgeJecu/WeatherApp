let vremeaAcum = {};
let forecast = {};
let picture = {};



async function getWeather() {
    let oras = document.querySelector(".oras").value.trim();
    let URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
    let URL_WEATHER_ICON_PREFIX = "https://openweathermap.org/img/w/";
    const response = await fetch(URL_CURRENT_WEATHER + oras);
    vremeaAcum = await response.json();
    const poza = await fetch(URL_WEATHER_ICON_PREFIX);
    picture = poza.json();
    draw();


}

async function getForecast() {
    let oras2 = document.querySelector(".oras").value.trim();
    let URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
    const nextDays = await fetch(URL_FORECAST_WEATHER + oras2);
    forecast = await nextDays.json();
    drawForecast();
}


function draw() {
    //document.querySelector(".all").classList.remove(hidden);
    document.querySelector("#localitate").innerHTML = document.querySelector(".oras").value.trim();
    document.querySelector("#pic").src = `http://openweathermap.org/img/w/${vremeaAcum.weather[0].icon}.png`
    document.querySelector("#description").innerHTML = vremeaAcum.weather[0].description;
    document.querySelector("#humidity").innerHTML = vremeaAcum.main.humidity + "&#65285";
    document.querySelector("#hPA").innerHTML = vremeaAcum.main.pressure + " hPa";
    document.querySelector("#temp").innerHTML = vremeaAcum.main.temp.toFixed(0) + "&#8451";
    document.querySelector("#max").innerHTML = vremeaAcum.main.temp_max.toFixed(0) + "&#8451";
    document.querySelector("#min").innerHTML = vremeaAcum.main.temp_min.toFixed(0) + "&#8451";
    //document.querySelector("#ras").innerHTML = sun.results.sunrise;
    //document.querySelector("#apus").innerHTML = sun.results.sunrise;
    document.querySelector(".map").src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDNoQkcqW9xhn3LGmdy6vi8i1ZsNJQ_RkI
&q=${vremeaAcum.name}`;

}


function drawForecast() {
    let forecastZile = document.querySelectorAll(".day");
    let ziuaZero = 0;
    let dateTime = forecast.list[0].dt_txt.split(" ");
    let day = dateTime[0];
    forecastZile[ziuaZero].innerHTML + `<h3>${dateTime[0]}</h3>`
    
    
    for (let i = 0; i < forecast.list.length; i++) {
        let date = forecast.list[i].dt_txt.substring(0, 10);
        let time = forecast.list[i].dt_txt.substring(11, 16);
        if (day !== date) {
            ziuaZero++;
            day = date;
            forecastZile[ziuaZero].innerHTML += `<h3>${date}</h3>`
        }

        forecastZile[ziuaZero].innerHTML += `
    <div>
      <img src="http://openweathermap.org/img/w/${forecast.list[i].weather[0].icon}.png">          
      <p>Time: ${time}</p>
      <p>${forecast.list[i].weather[0].description}</p>
      <p>Temperature: ${forecast.list[i].main.temp.toFixed(0)} &#8451</p>
      
    </div>`
    }
}



let currentTime = new Date().getHours();
if (document.body) {
    if (7 <= currentTime && currentTime < 20) {
        document.body.background = "https://img.wallpapersafari.com/desktop/1920/1080/89/40/xcRnip.jpg";
    }
    else {
        document.body.background = "https://img.wallpapersafari.com/desktop/1920/1080/68/82/PvDEwd.jpg";
    }
}

function clock() {
    let time = new Date();
    let  hours = time.getHours().toLocaleString();
    let minutes = time.getMinutes();      
    document.querySelectorAll('.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes);
    function harold(standIn) {
        if (standIn < 10) {
            standIn = '0' + standIn
        }
        return standIn;
    }
}
setInterval(clock, 10);



