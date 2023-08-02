import WeatherItem from "./WeatherItem";

const WeatherList = ({ weatherData, countryCode, input }) => {
  function convertToFlag(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  console.log(convertToFlag(countryCode));

  return (
    <>
      <p className="status">
        Weather for {`${input} ${convertToFlag(countryCode)}`}
      </p>
      <ul className="weather-list">
        {Array.from({ length: 7 }, (_, i) => i + 1).map((val, i) => {
          return (
            <WeatherItem
              key={val}
              min={weatherData.min[i]}
              max={weatherData.max[i]}
              time={weatherData.time[i]}
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
