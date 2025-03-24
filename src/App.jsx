import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from "./components/components";
import Glitch from "./BGAnimation/Glitch";
import Waves from "./BGAnimation/Wave";
import ASCIIText from "./TextAnimations/AsciiText";
import { useEffect } from 'react';

const LoadingRoute = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      window.open("https://github.com/Nathan2589");
      navigate("/");
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Glitch />
      </div>
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <ASCIIText 
          text="Nathan"
          enableWaves={false}
          textFontSize={200}
          asciiFontSize={8}
          textColor="#915eff"
        />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loading" element={<LoadingRoute />} />
        <Route path="/" element={
          <div className="relative z-0">
            <div className="absolute inset-0 opacity-40">
              <Waves 
                lineColor="#6B3ECC"
                backgroundColor="transparent"
                waveSpeedX={0.02}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
                xGap={12}
                yGap={36}
              />
            </div>
            <div className="relative z-10">
              <div className="bg-cover bg-no-repeat bg-center">
                <Navbar />
                <Hero />
              </div>
              <About />
              <Experience />
              
              <div className="relative z-0">
                <Contact />
              </div>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
