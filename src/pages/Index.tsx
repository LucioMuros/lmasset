import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Investors from '../modules/investors';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Contact />
    </div>
  );
};

const AppRoutes = () => (
  <Router>
    <Routes>
      {/* ...outras rotas... */}
      <Route path="/portal" element={<Investors />} />
    </Routes>
  </Router>
);

export default AppRoutes;
export default Index;
