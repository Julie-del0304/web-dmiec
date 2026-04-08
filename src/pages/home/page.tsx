import { useEffect, useState } from 'react';
import AnnouncementsBar from './components/AnnouncementsBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import NewsEvents from './components/NewsEvents';
import News from './components/News';
import Research from './components/Research';
import NationalAchievers from './components/NationalAchievers';
import QualityPolicy from './components/QualityPolicy';
import MOUPartners from './components/MOUPartners';
import Admissions from './components/Admissions';
import VirtualTour from './components/VirtualTour';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* AnnouncementsBar — fixed top */}
      <AnnouncementsBar />
      {/* Navbar — fixed below ticker via its own top-0, but ticker pushes it down */}
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <About />
        <Programs />
        <News />
        <NewsEvents />
        <Research />
        <NationalAchievers />
        <QualityPolicy />
        <MOUPartners />
        <Admissions />
        <VirtualTour />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}