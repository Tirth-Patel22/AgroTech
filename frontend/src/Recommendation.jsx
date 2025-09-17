// d51d18f35acdad2f9a278c5027fbab3d

import axios from "axios";
import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./Recommendation.css";


const RecommendedCrop = () => {
  const [location, setLocation] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [recommendedCrops, setRecommendedCrops] = useState([]);
  const [error, setError] = useState("");

  const apiKey = "d51d18f35acdad2f9a278c5027fbab3d";

  // Convert UNIX timestamp to readable time
  const convertUnixToTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  // Fetch 5-day forecast
  const fetchForecast = async () => {
    if (!location) {
      setError("Please enter a location");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
      );

      // Pick one forecast every 8 intervals (8 per day)
      const data = response.data.list.filter((_, idx) => idx % 8 === 0).slice(0, 4);
      setForecastData(data);
      setError("");

      // Fetch recommended crops based on day 1 temp
      if (data.length > 0) {
        fetchRecommendedCrops(data[0].main.temp);
      }
    } catch (err) {
      setError("Could not fetch forecast for this location");
      setForecastData([]);
    }
  };

  // Fetch crops based on temperature
  const fetchRecommendedCrops = async (temp) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/recommended-crops/?temp=${temp}`
      );
      setRecommendedCrops(response.data.recommended_crops);
    } catch (error) {
      console.error("Error fetching recommended crops:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="weather-page">
      <div className="weather-container">
        <h1 className="title">🌿Recommended Crops</h1>

        <div className="input-group">
            <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
            <button onClick={fetchForecast}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {forecastData.length > 0 && (
          <div className="forecast-grid">
            {forecastData.map((day, idx) => (
              <div key={idx} className="weather-card">
                <h3>{new Date(day.dt_txt).toDateString()}</h3>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="icon"
                />
                <p>{day.weather[0].main}</p>
                <p>🌡️ {day.main.temp}°C (Feels {day.main.feels_like}°C)</p>
                <p>📉 Min: {day.main.temp_min}°C | 📈 Max: {day.main.temp_max}°C</p>
                <p>💧 Humidity: {day.main.humidity}%</p>
                <p>🌬️ Wind: {day.wind.speed} m/s</p>
                <p>☁️ Cloudiness: {day.clouds.all}%</p>
                <p>👁️ Visibility: {day.visibility / 1000 || "N/A"} km</p>
                <p>🌅 Sunrise: {convertUnixToTime(day.sys?.sunrise || 0)}</p>
                <p>🌇 Sunset: {convertUnixToTime(day.sys?.sunset || 0)}</p>
              </div>
            ))}
          </div>
        )}
        {recommendedCrops.length > 0 && (
            <div className="recommendation-crops-section">
              <h2>🌾 Recommended Crops</h2>
              <div className="recommendation-crop-grid">
                {recommendedCrops.map((crop, index) => (
                  <div key={index} className="recommendation-crop-card">
                    <img src={crop.image} alt={crop.name} />
                    <h3>{crop.name}</h3>
                    <p className="crop-type">Type: {crop.crop_type}</p>
                    <p className="crop-duration">Duration: {crop.duration_days} days</p>
                    <p className="crop-rainfall">Ideal Rainfall: {crop.ideal_rainfall} mm</p>
                    <p className="crop-desc">{crop.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default RecommendedCrop;
