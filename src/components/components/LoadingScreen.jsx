import { useEffect, useState } from 'react';
import Hyperspeed from './Hyperspeed';

const LoadingScreen = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="w-full h-screen">
      {mounted && (
        <Hyperspeed 
          effectOptions={{
            distortion: 'turbulentDistortion',
            colors: {
              background: '#000000',
              roadColor: '#080808',
              sticks: '#03B3C3'
            },
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1
          }}
        />
      )}
    </div>
  );
};

export default LoadingScreen;