import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async (lat, long) => {
    try {
      const apiKey = process.env.REACT_APP_OPEN_WHEATHER_KEY;
      if (!apiKey) throw new Error('Chave da API não encontrada.');

      const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat,
          lon: long,
          appid: apiKey,
          lang: "pt",
          units: "metric"
        }
      });
      setWeather(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const handleSuccess = (position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    };

    const handleError = () => {
      setError('Não foi possível obter a localização.');
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  if (error) return <div>Erro: {error}</div>;
  if (location === null) return <div>Você precisa habilitar a localização no browser!</div>;
  if (!weather) return <div>Carregando o clima...</div>;

  return (
    <div>
      <h3>Clima nas suas Coordenadas ({weather.weather[0].description})</h3>
      
      <ul> 
        <li>Temperatura atual: {weather.main.temp}°</li> 
        <li>Temperatura máxima: {weather.main.temp_max}°</li>
        <li>Temperatura mínima: {weather.main.temp_min}°</li>
        <li>Pressão: {weather.main.pressure} hpa</li>
        <li>Umidade: {weather.main.humidity}%</li>
      </ul>
    </div>
  );
}

export default App;
