
// clave de la api openweather
const API_KEY ='3a470157e7cda5093857a69ea026129b';
//const APP_ID = '4090239d69cdb3874de692fd18539299';


const fetchData = position => {
    const { latitude, longitude } = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        
}
const setWeatherData= data => {
    console.log(data);
    const WeatherData={
        location:data.name,
        description:data.weather[0].main,
        humidity:data.main.humidity,
        pressure:data.main.pressure,
        temperature:data.main.temp,
        date:getDate(),
    }


    Object.keys(WeatherData).forEach(key=>{
        document.getElementById(key).textContent=WeatherData[key];
    } );

}

const getDate = () => {

    let date=new Date();
    return `${date.getDate()}-${( '0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}