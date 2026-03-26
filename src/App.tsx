import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import FloatingActionWidget from './components/feature/FloatingActionWidget';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <BrowserRouter basename={__BASE_PATH__}>
        <AppRoutes />
        <FloatingActionWidget />
      </BrowserRouter>
    </>
  );
}

export default App;
