const regions = document.querySelectorAll('.region-box');

regions.forEach((region) => {
  region.addEventListener('click', () => {
    region.classList.toggle('active');
  });
});
getWeather();
async function getWeather() {
  const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=64.1466&longitude=-21.9426&current=temperature_2m,wind_speed_10m,weather_code'
  );

  const data = await response.json();

  document.getElementById('temp').innerHTML =
    Math.round(data.current.temperature_2m) + '°C';

  document.getElementById('wind').innerHTML =
    Math.round(data.current.wind_speed_10m) + ' km/h';

  document.getElementById('condition').innerHTML = 'Live Iceland Weather';

  const weatherCode = data.current.weather_code;

  const card = document.querySelector('.weather-bg');

  /* SNOW */

  if (weatherCode >= 71) {
    card.style.backgroundImage = "url('snow.jpeg')";
  } else if (weatherCode >= 51) {
    /* RAIN */
    card.style.backgroundImage = "url('rain.jpg')";
  } else if (weatherCode >= 1) {
    /* CLOUDY */
    card.style.backgroundImage = "url('cloudy.jpg')";
  } else {
    /* CLEAR */
    card.style.backgroundImage = "url('sunny.jpg')";
  }
}

getWeather();

setInterval(getWeather, 300000);
