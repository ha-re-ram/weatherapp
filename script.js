// script.js
const menu = document.getElementById('menu');
const mobileMenu = document.getElementById('mobile-menu-toggle');

mobileMenu.addEventListener('click', () => {
    menu.classList.toggle('active');
});

const apiKey = '49ae5ed4f97c8b387090ac4c6d13c536'; // Your actual API key
const weatherForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const useLocationButton = document.getElementById('use-location');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

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
        });
}

function updateWeatherData(data) {
    document.getElementById('weather-info').style.display = 'block';
    locationName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    description.textContent = `Description: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
locationInput.value = "";
