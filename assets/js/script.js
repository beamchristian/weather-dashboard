'use strict';
// select all elements used for search
const userSearchEl = document.querySelector('#search-form');
const searchhist = document.querySelector('#search-hist');
let cityInputEl = document.querySelector('#city-input');
const cityContainerEl = document.querySelector('#city-container');
const cityTitleEl = document.querySelector('#city-search-title');
const cityTemp = document.querySelector('#city-search-temp');
const cityWind = document.querySelector('#city-search-wind');
const cityHumidity = document.querySelector('#city-search-humidity');
const uviText = document.querySelector('#uvi-text');
const weatherIcon = document.querySelector('.weatherIcon');

// Empty Array for storing Search History
let citySearch = [];

// current date variables
let today = new Date();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let date = today.getDate();
let currentDate = `(${month}/${date}/${year})`;

const loadPastSearches = function () {
  let retrieveSearches = localStorage.getItem('searches');
  let citySearch2 = JSON.parse(retrieveSearches);
  if (citySearch2) {
    citySearch = citySearch2;
  } else {
    citySearch = [];
  }
  console.log(citySearch2);
  // create div to display past searches
};

const createButton = function () {
  let btn = document.createElement('button');
  btn.type = 'button';
  btn.classList.add('btn');
  btn.setAttribute('savedButton', cityInputEl.value);
  btn.addEventListener('click', function () {
    formSubmitHandler();
  });
  searchhist.appendChild(btn);
};

const formSubmitHandler = function (event) {
  event.preventDefault();
  createButton();
  // get value from input element
  let cityInput = cityInputEl.value.trim();
  citySearch.push(cityInput);
  localStorage.setItem('searches', JSON.stringify(citySearch));

  if (cityInput) {
    getUserForcast(cityInput);
    cityInputEl.value = '';
  } else {
    alert('Please enter a city name or zip code.');
  }
};

const getUserForcast = function () {
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
    .then(data => displayOneCall(data));
  getFutureForcast();
};

const getFutureForcast = function () {
  const futureWeatherApi =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    cityInputEl.value +
    '&units=imperial' +
    '&appid=01cec3e443f278224b33dd45c5cbe37c';

  // call 5 day forcast api
  fetch(futureWeatherApi)
    .then(response => response.json())
    .then(data => {
      displayFutureForcast(data);
    });
};

const displayFutureForcast = function (data) {
  // variables for the first card
  let futureDate1 = data.list[3].dt_txt.substring(0, 11);
  let futureIcon1 = data.list[3].weather[0].icon;
  let futureTemp1 = data.list[3].main.temp;
  let futureWind1 = data.list[3].wind.speed;
  let futureHumidity1 = data.list[3].main.humidity;
  // first card innerHtml input
  document.querySelector('#future-1').innerHTML = `${futureDate1}`;
  document.querySelector('.future-weather-icon-1').src =
    'https://openweathermap.org/img/wn/' + futureIcon1 + '@2x.png';
  document.querySelector('#future-temp-1').innerHTML = `${futureTemp1}°F`;
  document.querySelector('#future-wind-1').innerHTML = `${futureWind1} MPH`;
  document.querySelector(
    '#future-humidity-1'
  ).innerHTML = `${futureHumidity1} %`;

  // first card end

  //variables for the second card
  let futureDate2 = data.list[11].dt_txt.substring(0, 11);
  let futureIcon2 = data.list[11].weather[0].icon;
  let futureTemp2 = data.list[11].main.temp;
  let futureWind2 = data.list[11].wind.speed;
  let futureHumidity2 = data.list[11].main.humidity;

  // second card innerHtml input
  document.querySelector('#future-2').innerHTML = `${futureDate2}`;
  document.querySelector('.future-weather-icon-2').src =
    'https://openweathermap.org/img/wn/' + futureIcon2 + '@2x.png';
  document.querySelector('#future-temp-2').innerHTML = `${futureTemp2}°F`;
  document.querySelector('#future-wind-2').innerHTML = `${futureWind2} MPH`;
  document.querySelector(
    '#future-humidity-2'
  ).innerHTML = `${futureHumidity2} %`;
  // second card end

  // variables for the third card
  let futureDate3 = data.list[19].dt_txt.substring(0, 11);
  let futureIcon3 = data.list[19].weather[0].icon;
  let futureTemp3 = data.list[19].main.temp;
  let futureWind3 = data.list[19].wind.speed;
  let futureHumidity3 = data.list[19].main.humidity;

  // third card innerHtml input
  document.querySelector('#future-3').innerHTML = `${futureDate3}`;
  document.querySelector('.future-weather-icon-3').src =
    'https://openweathermap.org/img/wn/' + futureIcon3 + '@2x.png';
  document.querySelector('#future-temp-3').innerHTML = `${futureTemp3}°F`;
  document.querySelector('#future-wind-3').innerHTML = `${futureWind3} MPH`;
  document.querySelector(
    '#future-humidity-3'
  ).innerHTML = `${futureHumidity3} %`;
  // third card end

  // variables for the fourth card
  let futureDate4 = data.list[27].dt_txt.substring(0, 11);
  let futureIcon4 = data.list[27].weather[0].icon;
  let futureTemp4 = data.list[27].main.temp;
  let futureWind4 = data.list[27].wind.speed;
  let futureHumidity4 = data.list[27].main.humidity;

  // fourth card innerHtml input
  document.querySelector('#future-4').innerHTML = `${futureDate4}`;
  document.querySelector('.future-weather-icon-4').src =
    'https://openweathermap.org/img/wn/' + futureIcon4 + '@2x.png';
  document.querySelector('#future-temp-4').innerHTML = `${futureTemp4}°F`;
  document.querySelector('#future-wind-4').innerHTML = `${futureWind4} MPH`;
  document.querySelector(
    '#future-humidity-4'
  ).innerHTML = `${futureHumidity4} %`;
  // fourth card end

  // variables for the fifth card
  let futureDate5 = data.list[35].dt_txt.substring(0, 11);
  let futureIcon5 = data.list[35].weather[0].icon;
  let futureTemp5 = data.list[35].main.temp;
  let futureWind5 = data.list[35].wind.speed;
  let futureHumidity5 = data.list[35].main.humidity;

  // fourth card innerHtml input
  document.querySelector('#future-5').innerHTML = `${futureDate5}`;
  document.querySelector('.future-weather-icon-5').src =
    'https://openweathermap.org/img/wn/' + futureIcon5 + '@2x.png';
  document.querySelector('#future-temp-5').innerHTML = `${futureTemp5}°F`;
  document.querySelector('#future-wind-5').innerHTML = `${futureWind5} MPH`;
  document.querySelector(
    '#future-humidity-5'
  ).innerHTML = `${futureHumidity5} %`;
};
// function to remove classes currently on uviValue
const removeCurrentUviClass = function () {
  uviText.classList.remove('low');
  uviText.classList.remove('medium');
  uviText.classList.remove('high');
  uviText.classList.remove('very-high');
};

const displayOneCall = function (data) {
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
  document.getElementById('current--col').classList.remove('hidden');
  document.getElementById('future--col').classList.remove('hidden');
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
};
// load any search data
loadPastSearches();

userSearchEl.addEventListener('submit', formSubmitHandler);
