'use strict';
// select all elements used for search
const userSearchEl = document.querySelector('#search-form');
const cityInputEl = document.querySelector('#city-input');
const cityContainerEl = document.querySelector('#city-container');
const cityTitleEl = document.querySelector('#city-search-title');
const cityTemp = document.querySelector('#city-search-temp');
const cityWind = document.querySelector('#city-search-wind');
const cityHumidity = document.querySelector('#city-search-humidity');
const uviText = document.querySelector('#uvi-text');
const weatherIcon = document.querySelector('.weatherIcon');

// current date variables
let today = new Date();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = today.getDate();
let currentDate = `(${month}/${date}/${year})`;

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
    '&exclude=current,minutely,hourly,alerts' +
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

// function to remove classes currently on uviValue
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
  // current weather variables
  let nameValue = data.name;
  let tempValue = data.main.temp;
  let windValue = data.wind.speed;
  let humidityValue = data.main.humidity;
  let iconValue = data.weather[0].icon;
  weatherIcon.src =
    'https://openweathermap.org/img/wn/' + iconValue + '@2x.png';
  // Display current weather variables in html
  cityTitleEl.innerHTML = `${nameValue} ${currentDate}`;
  cityTemp.innerHTML = `${tempValue}°F`;
  cityWind.innerHTML = `${windValue} MPH`;
  cityHumidity.innerHTML = `${humidityValue} %`;
  // Display 5 day forcast
};

userSearchEl.addEventListener('submit', formSubmitHandler);
