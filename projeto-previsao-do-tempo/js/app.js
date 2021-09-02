// SELECIONAR ELEMENTOS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// DADOS DO APP
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// CONSTANTES E VARIÁVEIS DO APP
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECAR SE O NAVEGADOR TEM SUPORTE PARA GEOLOCALIZAÇÃO
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>O navegador não possui suporte para geolocalização.</p>";
}

//DEFINIR A POSIÇÃO DO USUÁRIO
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

//MOSTRAR ERRO CASO O SERVIÇO DE GEOLOCALIZAÇÃO NÃO ESTEJA DISPONÍVEL
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//BUSCAR AS INFORMAÇÕES DE TEMPO PROVENIENTES DO API
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?id=524901&lang=pt_br&lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

//MOSTRAR AS INFORMAÇÕES DO TEMPO NA INTERFACE
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// CONVERTER CELSIUS PARA FAHRENHEIT
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

//MUDAR ESCALA DE TEMPERATURA QUANDO O USUÁRIO CLICAR NO ELEMENTO DE TEMPERATURA
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});