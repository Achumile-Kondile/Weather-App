const apiKey = '47ecb4d94c5b75803ededb64a8a735c7'; // Replace with your OpenWeatherMap API key
const weatherDiv = document.getElementById('weather');
const cityName = document.getElementById('cityName');
const icon = document.getElementById('icon');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value.trim();
    if (city === '') {
        showError('Please enter a city name');
        return;
    }

    // Show loading state
    weatherDiv.style.display = 'block';
    cityName.textContent = 'Loading...';
    description.textContent = '';
    temperature.textContent = '';
    icon.className = 'wi'; // Reset icon

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            cityName.textContent = data.name;
            description.textContent = capitalizeFirstLetter(data.weather[0].description);
            temperature.textContent = `${Math.round(data.main.temp)}°C`; // Rounded temperature

            // Set icon based on weather condition
            const weatherCode = data.weather[0].id;
            icon.className = `wi ${getWeatherIcon(weatherCode)}`;
        })
        .catch(error => {
            showError(error.message);
        });
});

function showError(message) {
    weatherDiv.style.display = 'block';
    cityName.textContent = 'Error';
    description.textContent = message;
    temperature.textContent = '';
    icon.className = 'wi'; // Reset icon
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getWeatherIcon(code) {
    if (code >= 200 && code < 300) return 'wi-thunderstorm';
    if (code >= 300 && code < 500) return 'wi-sprinkle';
    if (code >= 500 && code < 600) return 'wi-rain';
    if (code >= 600 && code < 700) return 'wi-snow';
    if (code >= 700 && code < 800) return 'wi-fog';
    if (code === 800) return 'wi-day-sunny';
    if (code > 800) return 'wi-cloudy';
    return 'wi-na';
}
