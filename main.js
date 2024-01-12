// const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
const API_KEY ='bd5e378503939ddaee76f12ad7a97608';

function getWeather(){
    console.log(navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log("Lat: " + lat + ", Lon: " + lon);
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&units=metric&appid=${API_KEY}`)
        .then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })
    }))
}

const currentWeatherItemsEl = document.getElementById('current-weather-items');

function showWeatherData(data){
    let {humidity, temp, wind_speed, weather} = data.current;

   document.getElementById('locationHumidity').innerText = humidity + "%" + "\nhumidity";
    document.getElementById('locationTemprature').innerText = temp + "°C" + "\n" + "temprature" 
    document.getElementById('locationWind').innerText = wind_speed + " M/S" + '\nwind speed'
    const weather_img = document.querySelector('.weather-img');

    switch(weather[0].main){
        case 'Clouds':
            weather_img.src = "/img/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/img/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/img/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/img/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/img/snow.png";
            break;
    }
}

function city(){
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log(lat, "+",lon)
        fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const locationName = data[0].name;
                console.log("location name: ",locationName);
                let cityname = document.getElementById("locationName");
                cityname.innerHTML = locationName;
            } else {
                console.error('No results found.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    })
}
city();
getWeather()


let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let searchData = document.getElementById("seachInput").value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchData}&appid=${API_KEY}`)
        .then(res => res.json()).then(data => {

        console.log(data)
        console.log(data.sys.country)
        document.getElementById("locationName").innerText = '';
        document.getElementById('locationHumidity').innerText = '';
        document.getElementById('locationTemprature').innerText = '';
        showSearchWeatherData(data);
        })
    })
})
function showSearchWeatherData(data){
    let searchData = document.getElementById("seachInput").value;
    document.getElementById("locationName").innerText = searchData;
    document.getElementById('locationHumidity').innerText = data.main.humidity + "%" + "\nhumidity";
    document.getElementById('locationTemprature').innerText = (data.main.temp - 273.15).toFixed(2)+"°C" + "\n" + "temprature"

    const weather_img = document.querySelector('.weather-img');

    switch(weather[0].main){
        case 'Clouds':
            weather_img.src = "/img/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/img/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/img/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/img/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/img/snow.png";
            break;
    }
}


const currentDate = new Date();
document.getElementById("date").innerText = currentDate.getDate();
let month = currentDate.getMonth()

switch(month){
    case 0:
        document.getElementById("month").innerText = "January";
        break;
    case 1:
        document.getElementById("month").innerText = "February";
        break;
    case 2:
        document.getElementById("month").innerText = "March";
        break;
    case 3:
        document.getElementById("month").innerText = "April" ;
        break;
    case 4:
        document.getElementById("month").innerText = "May" ;
        break;
    case 5:
        document.getElementById("month").innerText = "June" ;
        break;
    case 6:
        document.getElementById("month").innerText = "July" ;
        break
    case 7:
        document.getElementById("month").innerText = "August" ;
        break
    case 8:
        document.getElementById("month").innerText = "September" ;
        break
    case 9:
        document.getElementById("month").innerText = "October" ;
        break
    case 10:
        document.getElementById("month").innerText = "November" ;
        break
    case 11:
        document.getElementById("month").innerText = "December";
        break
}
document.getElementById("year").innerText = currentDate.getFullYear()