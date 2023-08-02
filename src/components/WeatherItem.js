const WeatherItem = ({ min, max, time, weathercode }) => {
  function formatDay(dateStr) {
    const today = new Date().toLocaleDateString("en-US", {
      timeZone: "UTC",
    });
    const currDate = new Date(dateStr).toLocaleDateString("en-US", {
      timeZone: "UTC",
    });

    if (today === currDate) return "Today";

    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  return (
    <li className="weather-list-item">
      <p className="weather-list-item--icon">{`${getWeatherIcon(
        weathercode
      )}`}</p>
      <p className="weather-list-item--day">{formatDay(time)}</p>
      <p className="weather-list-item--temp">
        {`${Math.round(min)}°—`}
        <span>{`${Math.round(max)}°`}</span>
      </p>
    </li>
  );
};

export default WeatherItem;
