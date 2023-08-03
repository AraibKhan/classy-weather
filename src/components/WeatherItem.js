const WeatherItem = ({ min, max, date, weathercode, isToday }) => {
  function formatDay(dateStr) {
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
      [[51, 56, 61, 66, 80], "🌦️"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧️"],
      [[71, 73, 75, 77, 85, 86], "🌧️"],
      [[95], "🌩️"],
      [[96, 99], "⛈️"],
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
      <p className="weather-list-item--day">
        {isToday ? "Today" : formatDay(date)}
      </p>
      <p className="weather-list-item--temp">
        {`${Math.round(min)}°—`}
        <strong>{`${Math.round(max)}°`}</strong>
      </p>
    </li>
  );
};

export default WeatherItem;
