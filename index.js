let list = {};

let urlNow = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q="
let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q="
let weatherIcon = "http://openweathermap.org/img/w/"



async function getWeatherNow(){
    let city = document.querySelector('[name="citySearch"]').value;
    const response = await fetch(urlNow + city );
    list = await response.json();
    console.log(list);
    drawNow();
}

async function getWeatherForecast(){
    let city = document.querySelector('[name="citySearch"]').value;
    const response = await fetch(urlForecast + city);
    list = await response.json();
    console.log(list);
    drawForecast();
}

function drawNow() { 
    if (typeof(list.cod)== "number") {
        document.querySelector(".errorMsg").classList.add("hidden");
        document.querySelector(".searchBar > input").classList.remove("error");
        document.querySelector(".searchBar > span").classList.add("hidden");



        document.querySelector(".weatherNow").classList.remove("hidden");
        document.querySelector(".weatherForecast").classList.add("hidden");
    
        let page = document.querySelector("html");
        page.removeAttribute('class');  
        document.querySelector(".map").src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDNoQkcqW9xhn3LGmdy6vi8i1ZsNJQ_RkI
        &q=${list.name}`;
    
    
    
        let str = "";
    
            let icon = list.weather[0].icon;
            let description = list.weather[0].description;
            let humidity = list.main.humidity;
            let pressure = list.main.pressure;
            let temp = list.main.temp;
            let maxTemp = list.main.temp_max;
            let minTemp = list.main.temp_min;
    
            str = `
            <div class = "city">
            <img src="/tema10/images/pinpoint.svg" " alt="">
            <h3>${list.name}</h3>
            </div>
            <div class = "main">
            <img src="${weatherIcon}${icon}.png" " alt="">
            <span>${temp}℃</span>
            </div>
            <div class = "description">
            <span>Description: ${description}</span>
            <span>Max temperature: ${maxTemp}℃</span>
            <span>Min temperature: ${minTemp}℃</span>
            <span>Humidity: ${humidity}%</span>
            <span>Pressure: ${pressure}hPa</span>
            </div>
        `
            document.querySelector("#now").innerHTML = str; 
            document.querySelector("html").classList.add(`bg${icon}`);
    } else {
        document.querySelector(".searchBar > input").classList.add("error");
        document.querySelector(".weatherNow").classList.add("hidden");
        document.querySelector(".weatherForecast").classList.add("hidden");
        document.querySelector(".errorMsg").classList.remove("hidden");
        document.querySelector(".searchBar > span").classList.remove("hidden");

    }
    

}

function drawForecast() {
    if (typeof(list.cnt) == "number") {
        document.querySelector(".errorMsg").classList.add("hidden");
        document.querySelector(".searchBar > input").classList.remove("error");
        document.querySelector(".searchBar > span").classList.add("hidden");
        
        document.querySelector(".weatherNow").classList.add("hidden");
        document.querySelector(".weatherForecast").classList.remove("hidden");
    
        document.querySelector("#now").innerHTML = "";  
        let forecastColumns = document.querySelectorAll(".forecastInfo");
        let header = document.querySelectorAll(".header");
        for (let i = 0; i < forecastColumns.length; i++){
            forecastColumns[i].innerHTML = "";
    
        } 
    
        let idx = 0;
        let str = "";
    
        let icon = [];
        let date = [];
        let time = [];
        let temp = [];
        let description = [];
    
    
        for (let i = 0; i < list.list.length; i++) {
        icon.push(list.list[i].weather[0].icon)
        date.push(list.list[i].dt_txt.substring(0,10))
        time.push(list.list[i].dt_txt.substring(11,19));
        temp.push(list.list[i].main.temp);
        description.push(list.list[i].weather[0].description);
    
        if (time[i] === "00:00:00" ) {
            idx++;
        }
        str =`
        <div>
        <img src="${weatherIcon}${icon[i]}.png" " alt="">        
        <span>Time:${time[i]}</span>
        <span>Temperature:${temp[i]}℃</span>
        <span>Description:${description[i]}</span>
        </div>
        ` 
    
    
        forecastColumns[idx].innerHTML += str; 
        header[idx].innerHTML = date[i];
    }

    } else {
        document.querySelector(".searchBar > input").classList.add("error");
        document.querySelector(".weatherNow").classList.add("hidden");
        document.querySelector(".weatherForecast").classList.add("hidden");
        document.querySelector(".errorMsg").classList.remove("hidden");
        document.querySelector(".searchBar > span").classList.remove("hidden");

    }


}

