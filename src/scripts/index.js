import '../styles.css';
import CurrentUnit from './weather-unit';
import displayWeatherContent from './weather-content';

// Returns a promise with the value of a response featuring weather info of specified country
async function getWeatherResponse(locationStr) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationStr}&APPID=5d60b4fad1ce0fa1bd561c8963d2d675&units=${CurrentUnit.getUnit()}`;
  const weatherInfo = await fetch(url);
  return weatherInfo;
}

// Returns a promise with the value of an object featuring weather info of specified country
async function getWeatherInfo(locationStr) {
  const response = await getWeatherResponse(locationStr);
  if (response.ok) {
    const weatherInfo = await response.json();
    return weatherInfo;
  }
  throw new Error('No results found');
}

// Gets the weather info of a country and displays it
async function getWeatherContent(locationStr) {
  const errorDiv = document.querySelector('.error-div');
  if (locationStr === '') {
    return;
  }
  try {
    const weatherInfo = await getWeatherInfo(locationStr);
    await displayWeatherContent(weatherInfo);
    errorDiv.textContent = '';
  } catch (error) {
    errorDiv.textContent = error;
  }
}

// Default search when user first loads webpage
getWeatherContent('London');

// Event handler that stops the form from submitting
function handleForm(event) {
  event.preventDefault();
}

const form = document.querySelector('#form');
const formSubmitButton = document.querySelector('#form-submit');
const changeUnitButton = document.querySelector('#change-unit-btn');

form.addEventListener('submit', handleForm);
formSubmitButton.addEventListener('click', async () => {
  const formLocation = document.querySelector('#form-location');
  const locationStr = formLocation.value;
  await getWeatherContent(locationStr);
});
changeUnitButton.addEventListener('click', async () => {
  const locationStr = document.querySelector('.weather-location').textContent;
  const newUnit = CurrentUnit.toggleUnit();
  if (newUnit === 'imperial') {
    changeUnitButton.textContent = '\u{2103}';
  } else {
    changeUnitButton.textContent = '\u{2109}';
  }
  await getWeatherContent(locationStr);
});
