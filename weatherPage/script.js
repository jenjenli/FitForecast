const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/reverse';

document.getElementById("changePreferencesBtn").addEventListener("click", function() {
  window.location.href = "../preferences/preferences.html";  // Adjust the path based on your folder structure
});

const getLocationName = async (lat, lon) => {
  const url = `${NOMINATIM_BASE_URL}?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  const response = await fetch(url);
  const data = await response.json();
  return formatLocationName(data);
};



const formatLocationName = (data) => {
  const { address } = data;
  const city = address.city || address.town || address.village || '';
  const state = address.state ? `, ${address.state}` : '';
  const country = address.country ? `, ${address.country}` : '';
  return `${city}${state}${country}`;
};

const getWeatherDescription = (weathercode) => {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    95: "Thunderstorm",
  };
  return descriptions[weathercode] || "Unknown";
};

// Main app logic
class WeatherApp {
  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    try {
      const position = await this.getCurrentPosition();
      const weatherData = await this.fetchWeatherData(position.coords.latitude, position.coords.longitude);
      this.displayWeatherData(weatherData);
      this.getClothingRecommendation(weatherData);
      this.renderWeatherChart(weatherData);
    } catch (error) {
      this.handleError(error);
    }
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async fetchWeatherData(latitude, longitude) {
    const url = `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    return response.json();
  }

  async displayWeatherData(data) {
    const { temperature, weathercode } = data.current_weather;
    const description = getWeatherDescription(weathercode);
    const locationName = await getLocationName(data.latitude, data.longitude);

    document.getElementById("appname").innerHTML = `<h2>${locationName}</h2>`;
    document.getElementById("weather-info").innerHTML = `<p>${description}, ${temperature}°C</p>`;
  }

  getUserPreferences() {
    const username = localStorage.getItem("storedUsername");
    console.log(username);
    const allPreferences = JSON.parse(localStorage.getItem(`preferences-${username}`)) || {};
    console.log(allPreferences);
    return allPreferences;
  }
  
  getClothingRecommendation(data) {
    const preferences = this.getUserPreferences(); // Retrieve user preferences
    const temp = data.current_weather.temperature;
    const weathercode = data.current_weather.weathercode;
    const windSpeed = data.current_weather.windspeed;
  
    let recommendation = "Wear something comfortable!";
    
    // Check for temperature sensitivities
    if (preferences && preferences.sensitivity.cold && temp < 15) {
      recommendation = "Since you're sensitive to cold, wear a warm jacket and layers.";
    } else if (temp < 10) {
      console.log(preferences.sensitivity.cold);
      recommendation = "It's cold! Wear a warm jacket, scarf, and gloves.";
    } else if (temp < 20) {
      recommendation = "It's a bit chilly. A light jacket should be enough.";
    } else if (temp > 30) {
      recommendation = "It's hot! Wear light, breathable clothing.";
    }
  
    // Modify recommendation based on weather conditions
    if ([61, 63, 65, 80, 81, 82].includes(weathercode)) {
      recommendation += " Don't forget an umbrella!";
    }
  
    // Check health-related conditions for additional recommendations
    if (preferences && preferences.health.asthma && windSpeed > 15) {
      recommendation += " High wind detected - consider limiting outdoor exposure due to asthma.";
    }
  
    // Add wind sensitivity check
    if (windSpeed > 20) {
      recommendation += " It's windy, so bundle up to protect yourself from the chill.";
    }
  
    document.getElementById("clothing-recommendation").innerText = recommendation;
  }
  

  renderWeatherChart(data) {
    const labels = data.hourly.time.slice(0, 24);
    const temperatures = data.hourly.temperature_2m.slice(0, 24);
    console.log(data);
    const ctx = document.getElementById("weatherChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels.map(time => new Date(time).toLocaleTimeString()),
        datasets: [{
          label: "Temperature (°C)",
          data: temperatures,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }

  handleError(error) {
    console.error("Error:", error);
    document.getElementById("weather-info").innerText = `Error: ${error.message}`;
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => new WeatherApp());

 