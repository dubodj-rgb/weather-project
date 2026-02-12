'use client';

interface HomeButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export default function HomeButton({ isVisible, onClick }: HomeButtonProps) {
  return (
    <div 
      className={`absolute top-6 left-6 z-30 transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      }`}
    >
      <button 
        onClick={onClick}
        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white p-3 rounded-full transition-all active:scale-95 shadow-lg group"
        aria-label="Go Home"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-5 h-5 group-hover:scale-110 transition-transform"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" 
          />
        </svg>
      </button>
    </div>
  );
}