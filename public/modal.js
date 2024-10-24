document.getElementById('btn-blue-modal').addEventListener('click', openModal);
document.getElementById('btn-blue-modal-land').addEventListener('click', openModal);

function openModal(){
    document.querySelector('.bg-modal').style.display = "flex";
    document.querySelector('.bg-modal').style.position = "absolute";
    document.querySelector('.bg-modal').style.zIndex = "2";
    document.querySelector('.modal-content-one').style.display = "block";
}

document.querySelector('.close').addEventListener('click', closeModal);

function closeModal(){
    document.querySelector('.bg-modal').style.display = 'none';
    document.querySelector('.bg-modal').style.zIndex = "-1";
  
}

const btnModal = document.querySelector('.button-modal');
btnModal.addEventListener('click', (e)=>{
    e.preventDefault();
   
    const city = document.getElementById('city-modal').value;
    const country = document.getElementById('country-modal').value;
     
    
   
    const api_call = `/api?q=${city},${country}&pretty=1`;
   
    fetch(api_call)
    .then(response =>{
        return response.json();
    })
    .then(data_call => {
        //console.log(data_call)
        var lat = data_call.coord.lat; 
        var lon = data_call.coord.lon;
       
        fetch(`/api?lat=${lat}&lon=${lon}&units=imperial`)
        .then(res => res.json())
        .then(data => {
            console.log(data, 'current weather modal button')
            showWeatherData(data);
           
        })

       
    })
    
  
})

const btnModalTwo = document.querySelector('.button-modal');
btnModalTwo.addEventListener('click', (e)=>{
    e.preventDefault();
   
    const city = document.getElementById('city-modal').value;
    const country = document.getElementById('country-modal').value;
     
    
   
    const api_call = `/api?q=${city},${country}&pretty=1`;
   
    fetch(api_call)
    .then(response =>{
        return response.json();
    })
    .then(data_call => {
        //console.log(data_call)
        var lat = data_call.coord.lat; 
        var lon = data_call.coord.lon;
       
        fetch(`/api?lat=${lat}&lon=${lon}&units=imperial`)
        .then(res => res.json())
        .then(data_modal => {
            console.log(data_modal, 'current weather button modal')
            showWeatherData(data_modal);
            //timezone.innerHTML = data_modal.timezone;
            let weatherBackground = data_modal.weather[0].main;

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
    
  
})


function showWeatherData(data_modal){
    let name = data_modal.name;
    let {humidity, temp} = data_modal.main;
    let {sunrise, sunset} = data_modal.sys;
    let weather = data_modal.weather[0].description;
    let  wind = data_modal.wind.speed;
    let country = data_modal.sys.country

    //timezone.innerHTML = data.timezone;

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

getWeatherDataDailyButton()
function getWeatherDataDailyButton () {
    const btnModalThree = document.querySelector('.button-modal');
    btnModalThree.addEventListener('click', (e)=>{
        e.preventDefault();
       
        const city = document.getElementById('city-modal').value;
        const country = document.getElementById('country-modal').value;
         
        
       
        const api_call = `/api?q=${city},${country}`;
       
        fetch(api_call)
        .then(response =>{
            return response.json();
        })
        .then(data_call => {
            //console.log(data_call)
            var lat = data_call.coord.lat; 
            var lon = data_call.coord.lon;
           
            fetch(`/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=imperial`)
            .then(res => res.json())
            .then(data => {
                showWeatherDataDailyButton(data);
            })
    
            
        })

})

}



function showWeatherDataDailyButton(data){
    
    timezone.innerHTML = data.timezone;

  
    

    let otherDayForecastButton = '';
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
           otherDayForecastButton += `
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

   weatherForecastEl.innerHTML = otherDayForecastButton;

}

