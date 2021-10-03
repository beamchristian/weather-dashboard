'use strict';
// select all elements used for search
const userSearchEl = document.querySelector('#search-form');
const cityInputEl = document.querySelector('#city-input');
const cityContainerEl = document.querySelector('#city-container');
const cityTitleEl = document.querySelector('#city-search-title');
const cityTemp = document.querySelector('#city-search-temp');
const cityWind = document.querySelector('#city-search-wind');
const cityHumidity = document.querySelector('#city-search-humidity');
const cityUvi = document.querySelector('#city-search-uvi');
const uviText = document.querySelector('#uvi-text');

// current date variables
let today = new Date();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = today.getDate();
let currentDate = `(${month}/${date}/${year})`;

// display icon function
const displayIcon = function (src) {
  let img = document.createElement('img');
  img.src = src;
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

const getUserForcast = function (city) {
  // put OpenWeather, Weather API into a variable within the function
  const weatherApiUrl =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    cityInputEl.value +
    '&units=imperial' +
    '&appid=01cec3e443f278224b33dd45c5cbe37c';

  // call weather Api
  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayWeatherInfo(data);
      const latCoord = data.coord.lat;
      const lonCoord = data.coord.lon;
      // call OneCall Api
      return fetch(
        'https://api.openweathermap.org/data/2.5/onecall?q=' +
          '&units=imperial' +
          '&lat=' +
          latCoord +
          '&lon=' +
          lonCoord +
          '&appid=01cec3e443f278224b33dd45c5cbe37c'
      );
    })
    .then(response => response.json())
    .then(data => displayOnecall(data));
};

const removeCurrentUviClass = function () {
  uviText.classList.remove('low');
  uviText.classList.remove('medium');
  uviText.classList.remove('high');
  uviText.classList.remove('very-high');
};

const displayOnecall = function (data) {
  console.log(data);
  const displayUvi = function () {
    let uviValue = data.current.uvi;
    if (uviValue < 2) {
      removeCurrentUviClass();
      uviText.classList.add('low');
    } else if (uviValue > 2 && uviValue < 5) {
      removeCurrentUviClass();
      uviText.classList.add('medium');
    } else if (uviValue > 5 && uviValue < 7) {
      removeCurrentUviClass();
      uviText.classList.add('high');
    } else if (uviValue > 7) {
      removeCurrentUviClass();
      uviText.classList.add('very-high');
    }
    uviText.innerHTML = `${uviValue}`;
  };
  displayUvi();
};

const displayWeatherInfo = function (data) {
  let nameValue = data.name;
  let tempValue = data.main.temp;
  let windValue = data.wind.speed;
  let humidityValue = data.main.humidity;

  cityTitleEl.innerHTML = `${nameValue} ${currentDate}`;
  cityTemp.innerHTML = `Temp: ${tempValue}°F`;
  cityWind.innerHTML = `Wind: ${windValue} MPH`;
  cityHumidity.innerHTML = `Humidity: ${humidityValue} %`;
};

userSearchEl.addEventListener('submit', formSubmitHandler);
