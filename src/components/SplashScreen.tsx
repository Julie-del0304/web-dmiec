import { useEffect, useState } from 'react';
import clglogo from '../public/images/clg-home.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 800);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center transition-opacity duration-800 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* உங்கள் exact header image */}
      <img
        src={clglogo}
        alt="DMI Engineering College"
        className="animate-fade-in"
        style={{
          width: '70%',
          maxWidth: '900px',
          height: 'auto',
          objectFit: 'contain'
        }}
      />

      {/* Loading dots */}
      <div className="flex space-x-2 mt-16">
        <div className="w-3 h-3 bg-purple-700 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-purple-700 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-purple-700 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}