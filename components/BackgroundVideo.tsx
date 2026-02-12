'use client';

import { useState, useEffect, useRef } from 'react';

export default function BackgroundVideo({ condition }: { condition: string | undefined }) {
  // Use a ref to keep track of the "current" source to avoid unnecessary flickering
  const [activeVideo, setActiveVideo] = useState('/weather_homescreen.mp4');
  const [nextVideo, setNextVideo] = useState<string | null>(null);
  const [isBlurring, setIsBlurring] = useState(false);

  const getVideoSrc = (weatherCondition: string | undefined) => {
    if (!weatherCondition) return '/weather_homescreen.mp4';
    
    switch (weatherCondition) {
      case 'Rain': case 'Drizzle': case 'Thunderstorm': return '/rain_leaves.mp4';
      case 'Clouds': return '/cloudy_sky.mp4';
      case 'Clear': return '/sunny_park.mp4';
      case 'Snow': return '/snowing.mp4';
      default: return '/weather_homescreen.mp4';
    }
  };

  useEffect(() => {
    const newSrc = getVideoSrc(condition);
    
    // Only trigger if the video actually needs to change
    if (newSrc !== activeVideo) {
      setNextVideo(newSrc);
      setIsBlurring(true);

      const timer = setTimeout(() => {
        setActiveVideo(newSrc);
        setNextVideo(null);
        setIsBlurring(false);
      }, 1100); // Slightly longer than the 1000ms CSS transition

      return () => clearTimeout(timer);
    }
  }, [condition, activeVideo]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* THE NEW VIDEO (Fading in underneath) */}
      {nextVideo && (
        <video
          key={nextVideo}
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={nextVideo} type="video/mp4" />
        </video>
      )}

      {/* THE OLD VIDEO (Blurring and fading out on top) */}
      <video
        key={activeVideo}
        autoPlay loop muted playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
          isBlurring 
            ? 'opacity-0 blur-2xl scale-110' 
            : 'opacity-100 blur-none scale-100'
        }`}
      >
        <source src={activeVideo} type="video/mp4" />
      </video>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10" />
    </div>
  );
}