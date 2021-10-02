'use strict';
// select all elements used for search
const userSearchEl = document.querySelector('#search-form');
const cityInputEl = document.querySelector('#city-input');
const cityContainerEl = document.querySelector('#city-container');
const cityTitleEl = document.querySelector('#city-search-title');
const cityTemp = document.querySelector('#city-search-temp');
const cityWind = document.querySelector('#city-search-wind');

const getUserForcast = function (city) {
  // format the OpenWeather One Call API
  const apiUrl =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityInputEl.value +
    '&units=imperial' +
    '&appid=01cec3e443f278224b33dd45c5cbe37c';

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was succesful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          displayWeatherInfo(data, city);
        });
      } else {
        alert('City Not Found');
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Api');
    });
};

const formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  const cityInput = cityInputEl.value.trim();

  if (cityInput) {
    getUserForcast(cityInput);
    cityInputEl.value = '';
  } else {
    alert('Please enter a city name or zip code.');
  }
};

const displayIcon = function (src) {
  let img = document.createElement('img');
  img.src = src;
};

const displayWeatherInfo = function (data) {
  let nameValue = data.name;
  let weatherIcon = data.weather[0].icon;
  let tempValue = data['main']['temp'];

  cityTitleEl.innerHTML = nameValue;
  cityTemp.innerHTML = tempValue + '°F';
};

// const searchSubmitHandler = function (event) {};

userSearchEl.addEventListener('submit', formSubmitHandler);
