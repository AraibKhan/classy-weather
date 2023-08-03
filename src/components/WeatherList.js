import WeatherItem from "./WeatherItem";

const WeatherList = ({ weatherData, countryCode, location }) => {
  function convertToFlag(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  return (
    <>
      <p className="status">
        Weather for {`${location} ${convertToFlag(countryCode)}`}
      </p>
      <ul className="weather-list">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((val, i) => {
          return (
            <WeatherItem
              key={val}
              isToday={i === 0}
              min={weatherData.min[i]}
              max={weatherData.max[i]}
              date={weatherData.date[i]}
              weathercode={weatherData.weathercode[i]}
              countryCode={countryCode}
            />
          );
        })}
      </ul>
    </>
  );
};

export default WeatherList;
