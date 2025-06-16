import { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      setCity(lastCity);
      fetchWeather(lastCity);
    }
  }, []);

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(res.data);
      setError('');
      localStorage.setItem("lastCity", city);
    } catch (err) {
      setError("City not found... Try again!");
      setWeatherData(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="center-wrapper">
      <div className="weather-container">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <p>
              <strong>City:</strong> {weatherData.name}
            </p>
            <p>
              <strong>Temperature:</strong> {weatherData.main?.temp} °C
            </p>
            <p>
              <strong>Humidity:</strong> {weatherData.main?.humidity}%
            </p>
            <p>
              <strong>Wind Speed:</strong> {weatherData.wind?.speed} m/s
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
