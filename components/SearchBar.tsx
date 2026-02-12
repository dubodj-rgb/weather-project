'use client';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  fetchWeather: (query: string) => void;
  handleLocationClick: () => void;
  loading: boolean;
}

export default function SearchBar({ city, setCity, fetchWeather, handleLocationClick, loading }: SearchBarProps) {
  return (
    <div className="w-full flex bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden mb-10 shadow-2xl transition-all duration-700">
      {/* GPS Button - Prevent shrinking */}
      <button 
        onClick={handleLocationClick}
        className="p-3 md:p-4 text-white/70 hover:text-white transition-colors flex-shrink-0"
        aria-label="Current Location"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      </button>
      
      {/* Form Container - min-w-0 allows children to shrink properly without breaking layout */}
      <form 
        onSubmit={(e) => { e.preventDefault(); fetchWeather(city); }} 
        className="flex-1 flex min-w-0"
      >
        <input 
          type="text" 
          placeholder="Search city..."
          className="flex-1 p-3 md:p-4 bg-transparent text-white placeholder-white/50 outline-none min-w-0 text-sm md:text-base"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        
        {/* Search Button - Fixed width so it never squishes */}
        <button 
          type="submit" 
          disabled={loading}
          className="bg-white/10 hover:bg-white/20 text-white px-4 md:px-8 font-medium transition-all border-l border-white/10 flex-shrink-0 min-w-[80px] md:min-w-[100px] text-sm md:text-base"
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>
    </div>
  );
}