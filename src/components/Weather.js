import React from 'react'
import ReactWeather, { useOpenWeather } from 'react-open-weather';


const Weather = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '9c8bcda772486ad08c0672c7813e7438',
    lat: '40.183331',
    lon: '44.5',
    lang: 'en',
    unit: 'metric',
  });
  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Yerevan"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
  );
};

export default Weather;