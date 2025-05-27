// WeatherApp.jsx
import { useState, useEffect } from 'react';
import { Search, Cloud, Sun, CloudRain, Wind, Droplet, CloudSnow, CloudLightning } from 'lucide-react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching weather data
    const fetchWeather = () => {
      setLoading(true);
      setError(null);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Get dates for yesterday, tomorrow, and day after tomorrow
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dayAfterTomorrow = new Date(today);
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        
        // Format day names
        const formatDay = (date) => {
          return date.toLocaleDateString('en-US', { weekday: 'long' });
        };

        // Mock weather data
        const mockWeatherData = {
          city: query,
          temperature: Math.floor(Math.random() * 30) + 5, // 5 to 35
          condition: ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Thunderstorm'][Math.floor(Math.random() * 5)],
          humidity: Math.floor(Math.random() * 60) + 30, // 30% to 90%
          windSpeed: Math.floor(Math.random() * 20) + 1, // 1 to 20
          feelsLike: Math.floor(Math.random() * 30) + 5, // 5 to 35
          date: today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          forecast: [
            {
              day: formatDay(yesterday),
              date: yesterday.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              }),
              condition: ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Thunderstorm'][Math.floor(Math.random() * 5)],
              maxTemp: Math.floor(Math.random() * 30) + 5,
              minTemp: Math.floor(Math.random() * 20) + 1,
            },
            {
              day: formatDay(tomorrow),
              date: tomorrow.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              }),
              condition: ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Thunderstorm'][Math.floor(Math.random() * 5)],
              maxTemp: Math.floor(Math.random() * 30) + 5,
              minTemp: Math.floor(Math.random() * 20) + 1,
            },
            {
              day: formatDay(dayAfterTomorrow),
              date: dayAfterTomorrow.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              }),
              condition: ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Thunderstorm'][Math.floor(Math.random() * 5)],
              maxTemp: Math.floor(Math.random() * 30) + 5,
              minTemp: Math.floor(Math.random() * 20) + 1,
            }
          ]
        };
        
        setWeather(mockWeatherData);
        setLoading(false);
      }, 1000);
    };

    if (query.trim()) {
      fetchWeather();
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.search.value;
    if (newQuery.trim()) {
      setQuery(newQuery);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={64} className="weather-icon sunny" />;
      case 'cloudy':
        return <Cloud size={64} className="weather-icon cloudy" />;
      case 'rainy':
        return <CloudRain size={64} className="weather-icon rainy" />;
      case 'snowy':
        return <CloudSnow size={64} className="weather-icon snowy" />;
      case 'thunderstorm':
        return <CloudLightning size={64} className="weather-icon thunderstorm" />;
      default:
        return <Cloud size={64} className="weather-icon" />;
    }
  };

  const getForecastIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun size={24} className="forecast-icon sunny" />;
      case 'cloudy':
        return <Cloud size={24} className="forecast-icon cloudy" />;
      case 'rainy':
        return <CloudRain size={24} className="forecast-icon rainy" />;
      case 'snowy':
        return <CloudSnow size={24} className="forecast-icon snowy" />;
      case 'thunderstorm':
        return <CloudLightning size={24} className="forecast-icon thunderstorm" />;
      default:
        return <Cloud size={24} className="forecast-icon" />;
    }
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <h1 className="app-title">Weather Forecast</h1>
        
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-container">
            <input 
              type="text" 
              name="search" 
              placeholder="Search city..."
              defaultValue={query}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </div>
        </form>

        {loading && <div className="loading">Loading weather data...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {weather && !loading && !error && (
          <div className="weather-content">
            <div className="weather-header">
              <div className="weather-main">
                {getWeatherIcon(weather.condition)}
                <div className="weather-info">
                  <h2 className="city-name">{weather.city}</h2>
                  <p className="date">{weather.date}</p>
                  <p className="condition">{weather.condition}</p>
                </div>
              </div>
              <div className="temperature">
                <h2>{weather.temperature}°C</h2>
                <p>Feels like: {weather.feelsLike}°C</p>
              </div>
            </div>
            
            <div className="weather-details">
              <div className="detail">
                <Wind size={20} />
                <div>
                  <p className="detail-label">Wind</p>
                  <p className="detail-value">{weather.windSpeed} km/h</p>
                </div>
              </div>
              <div className="detail">
                <Droplet size={20} />
                <div>
                  <p className="detail-label">Humidity</p>
                  <p className="detail-value">{weather.humidity}%</p>
                </div>
              </div>
            </div>
            
            <div className="forecast">
              <h3>3-Day Forecast</h3>
              <div className="forecast-items">
                {weather.forecast.map((day, index) => (
                  <div className="forecast-item" key={index}>
                    <p className="forecast-day">{day.day}</p>
                    <p className="forecast-date">{day.date}</p>
                    {getForecastIcon(day.condition)}
                    <p className="forecast-temp">
                      <span>{day.maxTemp}°</span>
                      <span className="forecast-min">{day.minTemp}°</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;