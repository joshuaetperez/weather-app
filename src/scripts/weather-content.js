import '../styles.css';
import CurrentUnit from './weather-unit';

async function getWeatherIcon(weatherInfo) {
  const iconCode = weatherInfo.weather[0].icon;
  const urlIcon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const response = await fetch(urlIcon);
  if (response.ok) {
    return urlIcon;
  }
  throw new Error('Cannot obtain icon');
}

export default async function displayWeatherContent(weatherInfo) {
  const contentDiv = document.querySelector('.weather-container');
  contentDiv.innerHTML = '';

  const weatherContentDiv = document.createElement('div');
  const weatherLocationDiv = document.createElement('div');
  const weatherTempContainerDiv = document.createElement('div');
  const weatherIconDiv = document.createElement('div');
  const weatherTempContentDiv = document.createElement('div');
  const weatherTempDiv = document.createElement('div');
  const tempMinMaxDiv = document.createElement('div');
  const tempMinDiv = document.createElement('div');
  const tempMaxDiv = document.createElement('div');
  const windSpeedDiv = document.createElement('div');
  const humidityDiv = document.createElement('div');

  const weatherIcon = document.createElement('img');
  weatherIcon.src = await getWeatherIcon(weatherInfo);

  weatherContentDiv.classList.add('weather-content');
  weatherLocationDiv.classList.add('weather-location');
  weatherTempContainerDiv.classList.add('weather-temp-container');
  weatherTempContentDiv.classList.add('weather-temp-content');
  weatherTempDiv.classList.add('weather-temp');
  tempMinMaxDiv.classList.add('weather-min-max');

  weatherLocationDiv.textContent = weatherInfo.name;

  const tempTrunc = Math.trunc(weatherInfo.main.temp);
  const minTempTrunc = Math.trunc(weatherInfo.main.temp_min);
  const maxTempTrunc = Math.trunc(weatherInfo.main.temp_max);
  if (CurrentUnit.getUnit() === 'imperial') {
    weatherTempDiv.textContent = `${tempTrunc}\u{2103}`;
    tempMinDiv.textContent = `${minTempTrunc}\u{2103}`;
    tempMaxDiv.textContent = `${maxTempTrunc}\u{2103}`;
    windSpeedDiv.textContent = `Wind speed: ${weatherInfo.wind.speed} mph`;
  } else {
    weatherTempDiv.textContent = `${tempTrunc}\u{2109}`;
    tempMinDiv.textContent = `${minTempTrunc}\u{2109}`;
    tempMaxDiv.textContent = `${maxTempTrunc}\u{2109}`;
    windSpeedDiv.textContent = `Wind speed: ${weatherInfo.wind.speed} m/s`;
  }

  humidityDiv.textContent = `Humidity: ${weatherInfo.main.humidity}%`;

  tempMinMaxDiv.appendChild(tempMinDiv);
  tempMinMaxDiv.appendChild(tempMaxDiv);
  weatherTempContentDiv.appendChild(weatherTempDiv);
  weatherTempContentDiv.appendChild(tempMinMaxDiv);

  weatherIconDiv.appendChild(weatherIcon);
  weatherTempContainerDiv.appendChild(weatherIconDiv);
  weatherTempContainerDiv.appendChild(weatherTempContentDiv);

  weatherContentDiv.appendChild(weatherLocationDiv);
  weatherContentDiv.appendChild(weatherTempContainerDiv);
  weatherContentDiv.appendChild(windSpeedDiv);
  weatherContentDiv.appendChild(humidityDiv);

  contentDiv.appendChild(weatherContentDiv);
}
