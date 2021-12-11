// Returns a promise with the value of a response featuring weather info of specified country
async function getWeatherResponse(locationStr) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationStr}&APPID=5d60b4fad1ce0fa1bd561c8963d2d675`;
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
  throw new Error('Response was unsuccessful');
}

// Default search when user first loads webpage
getWeatherInfo('Redlands')
  .then((weatherInfo) => console.log(weatherInfo))
  .catch((error) => {
    console.error(error);
  });

// Event handler that stops the form from submitting
function handleForm(event) {
  event.preventDefault();
}

const form = document.querySelector('#form');
const formSubmitButton = document.querySelector('#form-submit');

form.addEventListener('submit', handleForm);
formSubmitButton.addEventListener('click', () => {
  const formLocation = document.querySelector('#form-location');
  const locationStr = formLocation.value;
  if (locationStr === '') {
    return;
  }
  getWeatherInfo(locationStr)
    .then((weatherInfo) => console.log(weatherInfo))
    .catch((error) => {
      console.error(error);
    });
});
