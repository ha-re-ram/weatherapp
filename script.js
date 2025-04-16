
/* script.js */
const menu = document.getElementById('menu');
const mobileMenu = document.getElementById('mobile-menu-toggle');
const themeToggle = document.getElementById('theme-toggle');

mobileMenu.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

const apiKey = '49ae5ed4f97c8b387090ac4c6d13c536';
const weatherForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const useLocationButton = document.getElementById('use-location');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');
const loading = document.getElementById('loading');
const weatherInfo = document.getElementById('weather-info');
const feelsLike = document.getElementById('feels-like');
const tempRange = document.getElementById('temp-range');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (location) {
    fetchWeatherByLocation(location);
  } else {
    alert('Please enter a location');
  }
});

useLocationButton.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      error => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location');
      }
    );
  } else {
    alert('Geolocation is not supported by this browser');
  }
});

function fetchWeatherByLocation(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function fetchWeather(url) {
  loading.classList.remove('hidden');
  weatherInfo.classList.add('hidden');

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      updateWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again later.');
    })
    .finally(() => {
      loading.classList.add('hidden');
    });
}

function updateWeatherData(data) {
  weatherInfo.classList.remove('hidden');

  locationName.textContent = data.name;
  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  description.textContent = `Description: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity} %`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  feelsLike.textContent = `Feels Like: ${data.main.feels_like} °C`;
  tempRange.textContent = `Min/Max: ${data.main.temp_min} °C / ${data.main.temp_max} °C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  locationInput.value = "";
}
