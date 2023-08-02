import { useState } from "react";
import WeatherList from "./components/WeatherList";

const App = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [countryCode, setCountryCode] = useState("");

  async function getWeather(location) {
    try {
      setIsLoading(true);
      setWeatherData({});

      //1. Get location coords.
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geocode = await res.json();
      if (!geocode.results) throw new Error("Location not found!");

      const { latitude, longitude, country_code, timezone } =
        geocode.results.at(0);

      //2. Fetching Weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      setIsLoading(false);
      setCountryCode(country_code);
      setWeatherData({
        min: weatherData.daily.temperature_2m_min,
        max: weatherData.daily.temperature_2m_max,
        time: weatherData.daily.time,
        weathercode: weatherData.daily.weathercode,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search For Location..."
      />
      {isLoading && <p className="status">Loading...</p>}
      {!isLoading && Object.keys(weatherData).length !== 0 && (
        <WeatherList
          weatherData={weatherData}
          countryCode={countryCode}
          input={input}
        />
      )}
      <button onClick={() => getWeather(input)}>Get Weather</button>
    </div>
  );
};

export default App;
