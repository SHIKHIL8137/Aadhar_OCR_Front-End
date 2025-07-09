import React, { useRef, useState } from 'react';

import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSettion';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWroksSection';
import Ocr from './Ocr';

const MainPage: React.FC=()=> {
  const [page, setPage] = useState<'home' | 'ocr' >('home');
  const howItWorksRef = useRef<HTMLDivElement>(null);
  return (
    <div className="min-h-screen bg-white">
      <Navigation page={page} setPage={setPage} scrollToHowItWorks={() =>
        howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' })
      }/>
      {page === 'home' && <HeroSection setPage={setPage}   />}
      {page === 'home' && <FeaturesSection />}
       {page === 'home' && (
        <div ref={howItWorksRef}>
          <HowItWorksSection />
        </div>
      )}
      {page === 'ocr' && <Ocr setPage={setPage}/>}
      <Footer />
    </div>
  );
};

export default MainPage;