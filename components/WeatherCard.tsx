'use client';

interface WeatherCardProps {
  weather: any;
  forecast: any;
  unit: 'imperial' | 'metric';
}

export default function WeatherCard({ weather, forecast, unit }: WeatherCardProps) {
  if (!weather) return null;

  const tempSymbol = unit === 'imperial' ? '°F' : '°C';
  const speedSymbol = unit === 'imperial' ? 'mph' : 'm/s';

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-[2.5rem] p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-700 w-full max-w-md">
      {/* City & Country */}
      <div className="mb-2">
        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
          {weather.name}{weather.sys.country ? `, ${weather.sys.country}` : ''}
        </h2>
        <p className="text-white/60 text-xs uppercase tracking-[0.2em] mt-2 font-bold">Current Conditions</p>
      </div>
      
      {/* Main Temp Display */}
      <div className="flex justify-center items-center my-2">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400/20 blur-3xl rounded-full" />
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
            alt="icon"
            className="w-32 h-32 relative z-10 drop-shadow-2xl"
          />
        </div>
        <div className="flex items-start">
          <span className="text-8xl font-extralight text-white leading-none">{Math.round(weather.main.temp)}</span>
          <span className="text-3xl font-light text-white/80 mt-1">{tempSymbol}</span>
        </div>
      </div>

      <p className="text-xl capitalize tracking-wide font-medium text-white/90 mb-6">
        {weather.weather[0].description}
      </p>

      {/* 5-Day Forecast */}
      {forecast && forecast.list && (
        <div className="flex justify-between gap-1 mb-8 pt-4 border-t border-white/10">
          {forecast.list.filter((_: any, i: number) => i % 8 === 0).slice(0, 5).map((day: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center min-w-[60px]">
              <p className="text-white/60 text-[10px] uppercase font-bold">
                {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                alt="forecast icon" 
                className="w-10 h-10"
              />
              <p className="text-white font-medium text-sm">{Math.round(day.main.temp)}°</p>
            </div>
          ))}
        </div>
      )}
      
      {/* Detail Stats */}
      <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/10">
        <div>
          <p className="text-white/40 text-[9px] uppercase tracking-tighter mb-1 font-bold">Feels Like</p>
          <p className="text-white font-medium text-lg">{Math.round(weather.main.feels_like)}°</p>
        </div>
        <div className="border-x border-white/10 px-2">
          <p className="text-white/40 text-[9px] uppercase tracking-tighter mb-1 font-bold">Humidity</p>
          <p className="text-white font-medium text-lg">{weather.main.humidity}%</p>
        </div>
        <div>
          <p className="text-white/40 text-[9px] uppercase tracking-tighter mb-1 font-bold">Wind Speed</p>
          <p className="text-white font-medium text-lg">
            {Math.round(weather.wind.speed)} <span className="text-[10px] font-normal opacity-60">{speedSymbol}</span>
          </p>
        </div>
      </div>
    </div>
  );
}