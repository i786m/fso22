import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({city}) => {
  const API_key = process.env.REACT_APP_WEATHER_API_KEY;
  const Url = `https://api.weatherapi.com/v1/current.json?key=${API_key}&q=${city}&aqi=no`;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(Url).then(response => {
      setWeather(response.data);
    }).catch(error=>console.error())
  }, [Url]);

  return (
    <>
      {weather ? (
        <div>
          <h2>Weather in {weather.location.name}</h2>
          <div>
            Temperature : {weather.current.temp_c}°C / {weather.current.temp_f}
            °F
          </div>
          <div>Condition : {weather.current.condition.text}</div>
          <img
            alt={weather.current.condition.text}
            src={weather.current.condition.icon}
          />
          <div>
            Wind {weather.current.wind_mph} m/h / {weather.current.wind_kph}{' '}
            km/h
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Weather;
