'use client';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  fetchWeather: (query: string) => void;
  handleLocationClick: () => void;
  loading: boolean;
}

export default function SearchBar({ city, setCity, fetchWeather, handleLocationClick, loading }: SearchBarProps) {  return (
    <div className="w-full flex bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden mb-10 shadow-2xl transition-all duration-700">
      <button 
        onClick={handleLocationClick}
        className="p-4 text-white/70 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      </button>
      
      <form onSubmit={(e) => { e.preventDefault(); fetchWeather(city); }} className="flex-1 flex">
        <input 
          type="text" 
          placeholder="Search for a city..."
          className="flex-1 p-4 bg-transparent text-white placeholder-white/60 outline-none"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-white/10 hover:bg-white/20 text-white px-8 font-medium transition-all border-l border-white/10"
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>
    </div>
  );
}