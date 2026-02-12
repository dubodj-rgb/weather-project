'use client';

import { useState, useEffect } from 'react';
import BackgroundVideo from '@/components/BackgroundVideo';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import HomeButton from '@/components/HomeButton';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null); // New state for forecast
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial'); // New unit state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  useEffect(() => {
  // Only refresh if we already have a city loaded
  if (weather && weather.name) {
    fetchWeather(weather.name);
  }
}, [unit]); // [unit] means "Watch this variable"

const resetApp = () => {
  setWeather(null);
  setForecast(null);
  setCity('');
  setError(false);
};

  const fetchWeather = async (query: string | { lat: number; lon: number }) => {
    setLoading(true);
    setError(false);
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    
    // Create URLs for both current weather and forecast
    const baseUrl = `https://api.openweathermap.org/data/2.5/`;
    const params = typeof query === 'string' 
      ? `q=${query}&units=${unit}&appid=${API_KEY}`
      : `lat=${query.lat}&lon=${query.lon}&units=${unit}&appid=${API_KEY}`;

    try {
      // Fetch both simultaneously
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`${baseUrl}weather?${params}`),
        fetch(`${baseUrl}forecast?${params}`)
      ]);

      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      if (weatherRes.ok && forecastRes.ok) {
        setWeather(weatherData);
        setForecast(forecastData);
        setCity(weatherData.name);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    setCity('Locating...');
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => { setCity(''); setError(true); }
    );
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center p-6 overflow-hidden">
      <BackgroundVideo condition={weather?.weather[0].main} />

      <HomeButton 
      isVisible={!!weather} 
      onClick={resetApp} 
    />

      {/* Unit Toggle Button */}
      <div className="absolute top-6 right-6 z-30">
        <button 
          onClick={() => setUnit(unit === 'imperial' ? 'metric' : 'imperial')}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold transition-all"
        >
          {unit === 'imperial' ? 'DISPLAY: °F' : 'DISPLAY: °C'}
        </button>
      </div>

      <div className={`
        relative z-20 w-full max-w-md flex flex-col items-center 
        transition-all duration-1000 ease-in-out
        ${weather ? 'pt-10' : 'pt-[30vh]'}
      `}>
        
        {/* The Title: We use 'max-h' to slide it out of existence smoothly */}
        <div className={`
          text-center transition-all duration-700 ease-in-out
          ${weather ? 'opacity-0 max-h-0 mb-0' : 'opacity-100 max-h-40 mb-10'}
          overflow-hidden
        `}>
          <h1 className="text-5xl font-extrabold tracking-tight text-white mb-2">Weather Project</h1>
          <p className="text-white/80 text-lg">Next.js & OpenWeather API Explorer</p>
        </div>

        <SearchBar 
          city={city} 
          setCity={setCity} 
          fetchWeather={fetchWeather} 
          handleLocationClick={handleLocationClick} 
          loading={loading} 
        />



        <div className={`w-full transition-all duration-1000 ${weather ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {weather && <WeatherCard weather={weather} forecast={forecast} unit={unit} />}
        </div>
      </div>
    </main>
  );
}