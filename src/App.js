import { useEffect, useState } from "react";
import WeatherList from "./components/WeatherList";

const App = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [countryCode, setCountryCode] = useState("");
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();

    async function getWeather(location) {
      if (location === "") return;
      try {
        setIsLoading(true);
        setWeatherData({});

        //1. Get location coords.
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
          { signal: controller1.signal }
        );
        const geocode = await res.json();
        if (!geocode.results) throw new Error("Location not found!");

        const { latitude, longitude, country_code, timezone, name } =
          geocode.results.at(0);

        //2. Fetching Weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
          { signal: controller2.signal }
        );
        const weatherData = await weatherRes.json();
        setCountryCode(country_code);
        setLocationName(name);
        setWeatherData({
          min: weatherData.daily.temperature_2m_min,
          max: weatherData.daily.temperature_2m_max,
          time: weatherData.daily.time,
          weathercode: weatherData.daily.weathercode,
        });
        setIsLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    }

    getWeather(input);

    return function () {
      controller1.abort();
      controller2.abort();
    };
  }, [input]);

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search From Location"
      />
      {isLoading && <p className="status">Loading...</p>}
      {!isLoading && Object.keys(weatherData).length !== 0 && input !== "" && (
        <WeatherList
          weatherData={weatherData}
          countryCode={countryCode}
          location={locationName}
        />
      )}
    </div>
  );
};

export default App;
