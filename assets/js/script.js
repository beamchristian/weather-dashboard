'use strict';
// select all elements used for search
const userSearchEl = document.querySelector('#search-form');
const cityInputEl = document.querySelector('#city-input');
const cityContainerEl = document.querySelector('#city-container');
const cityTitleEl = document.querySelector('#selected-city-title');
const citySearchTerm = document.querySelector('#city-search-term');

const getUserForcast = function (city) {
  // format the OpenWeather One Call API
  const apiUrl =
    'https://api.openweathermap.org/data/2.5/weather?q= + city + &appid=01cec3e443f278224b33dd45c5cbe37c';

  // make a request to the url
  fetch(apiUrl).then(function (response) {
    // request was succesful
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data, city);
      });
    }
  });
};

const displayWeather = function()

// const searchSubmitHandler = function (event) {};

// userSearchEl.addEventListener('submit', searchSubmitHandler);

getUserForcast();
