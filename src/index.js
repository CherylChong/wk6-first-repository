//functions
function dayTimeCurrent(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[fullDate.getDay()];
  let hour = fullDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = fullDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `<br>${day}<br>${hour}:${minutes}`;
}

function tempDefault(defaultLoad) {
  //console.log(defaultLoad);
  let emojiIcon = defaultLoad.data.weather[0].icon;
  let emojiIconLink = `http://openweathermap.org/img/wn/${emojiIcon}@2x.png`;
  cityCurrent.innerHTML = defaultLoad.data.name;
  tempMain.innerHTML = Math.round(defaultLoad.data.main.temp);
  emojiMain.innerHTML = "<img src='" + emojiIconLink + "' width='70px'>";
  descriptionMain.innerHTML = defaultLoad.data.weather[0].main;
  humidity.innerHTML = Math.round(defaultLoad.data.main.humidity);
  wind.innerHTML = Math.round(defaultLoad.data.wind.speed);
}

function errorMsg() {
  alert(`Sorry, we do not have the data.`);
}

function searchCity(searchInput) {
  searchInput.preventDefault();
  let citySearch = document.querySelector("#searchInput");
  let citySearchClean = citySearch.value.trim();
  let apiURLSearch = `${apiURLMain}weather?q=${citySearchClean}&units=${units}&appid=${apiKey}`;
  //console.log(apiURLSearch);
  axios.get(apiURLSearch).then(tempDefault).catch(errorMsg);
}

function getCurrent(position) {
  function retrieveCurrent(location) {
    let lat = location.coords.latitude;
    let lon = location.coords.longitude;
    let apiURLGeo = `${apiURLMain}weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

    axios.get(apiURLGeo).then(tempDefault);
  }
  navigator.geolocation.getCurrentPosition(retrieveCurrent);
}

function celciusCalculation() {
  units = `metric`;
  let apiURLMetric = `${apiURLMain}weather?q=${cityCurrent.innerText}&units=${units}&appid=${apiKey}`;

  axios.get(apiURLMetric).then(tempDefault);
}

function fahrenheitCalculation() {
  units = `imperial`;
  let apiURLImperial = `${apiURLMain}weather?q=${cityCurrent.innerText}&units=${units}&appid=${apiKey}`;

  axios.get(apiURLImperial).then(tempDefault);
}

//Retrieve current day and time
let dayCurrent = document.querySelector("div.dayCurrent");
let fullDate = new Date();
dayCurrent.innerHTML = dayTimeCurrent(fullDate);

//Retrieve Singapore weather on load (city name, temp, emoji, weather description, additional details)
let cityDefault = `Singapore`;
let units = `metric`;
let apiKey = `ece3d24c64eca2f5b04e85550d590173`;
let apiURLMain = `https://api.openweathermap.org/data/2.5/`;
let apiURLDefault = `${apiURLMain}weather?q=${cityDefault}&units=${units}&appid=${apiKey}`;

let cityCurrent = document.querySelector("h1");
//let cityTitle = document.querySelector("h1");
let tempMain = document.querySelector("#tempMain");
let emojiMain = document.querySelector("#emojiMain");
let descriptionMain = document.querySelector("#descriptionMain");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");

axios.get(apiURLDefault).then(tempDefault);

//Retrieve Singapore weather forecast on load (day, emoji, temp, description) **NOT YET**

//Search to retrieve searched city weather
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//Search to retrieve searched city forecast **NOT YET**

//Current to retrieve current location on button click
let buttonCurrent = document.querySelector("#getCurrent");
buttonCurrent.addEventListener("click", getCurrent);

//Celsius Fahrenheit converstion
let celciusClick = document.querySelector("#celcius");
let fahrenheitClick = document.querySelector("#fahrenheit");

celciusClick.addEventListener("click", celciusCalculation);
fahrenheitClick.addEventListener("click", fahrenheitCalculation);
