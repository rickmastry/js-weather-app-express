
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemEl = document.getElementById('current-weather-item');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
setInterval(() => {
   const time = new Date();
   const month = time.getMonth();
   const date = time.getDate();
   const day = time.getDay();
   var hour = time.getHours();
   if (hour === 0) {
    hour = 12
  }
   const hoursIn12HrFormat = hour > 12 ? hour % 12 : hour
   const minutes = time.getMinutes();
   const ampm = hour > 12 ? 'PM' : 'AM';

   timeEl.innerHTML = hoursIn12HrFormat + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`


   dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);

        let {latitude, longitude} = success.coords;
        let timezones = success.timezone;
        timezone.innerHTML = timezones;

        fetch(`/api?lat=${latitude}&lon=${longitude}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            showWeatherData(data);
            console.log(data, 'current weather')
            let name = data.name;
           
            
        })
    })
}

function showWeatherData(data){
    let name = data.name;
    let {humidity, temp} = data.main;
    let weather = data.weather[0].description;
    let {sunrise, sunset} = data.sys;
    let  wind = data.wind.speed;
    let {country} = data.sys.country

   
    
   
    currentWeatherItemEl.innerHTML =  ` 
    <div>Weather in ${name}</div>
    <div class="weather-item">
       
        <div>Temp</div>
        <div>${Math.round(temp)}</div>
    </div>
    <div class="weather-item">
        <div>Humidity</div>
        <div>${Math.round(humidity)}%</div>
    </div>
    <div class="weather-item">
        <div>Current</div>
        <div>${weather}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${Math.round(wind)}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('h:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset * 1000).format('h:mm a')}</div>
    </div>
   
    `;

   
   
   
} 


getWeatherDataDaily()
function getWeatherDataDaily () {
    navigator.geolocation.getCurrentPosition((success) => {
        //console.log(success);

        let {latitude, longitude} = success.coords;

        fetch(`/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial`)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            showWeatherDataDaily(data);
           console.log(data, 'daily')
           let weatherBackground = data.daily[0].weather[0].main;
           
           if (weatherBackground == 'Clear') {
            document.body.style.background = `url(img/sunny.jpg)`;
            document.body.style.backgroundSize = `cover`;
            document.body.style.backgroundRepeat = `no-repeat`;
          } else if (weatherBackground == 'Rain') {
            document.body.style.background = `url(img/rain.jpg)`;
            document.body.style.backgroundSize = `cover`;
            document.body.style.backgroundRepeat = `no-repeat`;
          } else if (weatherBackground == 'Wind'){
            document.body.style.background = `url(img/wind.jpg)`;
            document.body.style.backgroundSize = `cover`;
            document.body.style.backgroundRepeat = `no-repeat`;
          } else if(weatherBackground == 'Snow'){
            document.body.style.background = `url(img/snow.jpg)`;
            document.body.style.backgroundSize = `cover`;
            document.body.style.backgroundRepeat = `no-repeat`;
          } else if(weatherBackground = 'Clouds'){
            document.body.style.background = `url(img/clouds.jpg)`;
            document.body.style.backgroundSize = `cover`;
            document.body.style.backgroundRepeat = `no-repeat`;
          } else{
            document.body.style.background == `url(img/clearsky.jpg)`;
            document.body.style.backgroundSize = `cover`;
            document.body.style.backgroundRepeat = `no-repeat`;
          }

           

        })
    })
}

function showWeatherDataDaily(data){

    timezone.innerHTML = data.timezone;

    let otherDayForecast = '';
    data.daily.forEach((day,index) => {
        if(index == 0){
           currentTempEl.innerHTML = `
           <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
           <div class="other">
               <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
               <div class="temp">Day&nbsp;${Math.round(day.temp.day)}&#176; F</div>
               <div class="temp">Night&nbsp;${Math.round(day.temp.night)}&#176; F</div>
               <div class="time">${day.weather[0].description}</div>
           </div>
           `
        }else{
           otherDayForecast += `
           <div class="weather-forecast-item">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Day - ${Math.round(day.temp.day)}&#176; F</div>
            <div class="temp">Night - ${Math.round(day.temp.night)}&#176; F</div>
            <div class="temp">${day.weather[0].description}</div>
           </div>

           
           
           `
        }
    })

   weatherForecastEl.innerHTML = otherDayForecast;
   

}



