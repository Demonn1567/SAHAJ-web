"use client";
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GridBackgroundDemo } from './components/background';
import { NavbarDemo } from './pages/Home/navbar';
import { HeroHighlightDemo } from './pages/Home/HeroHighlight';
import { ExpandableCardDemo } from './pages/Home/Homecards';
import { TimelineDemo } from './pages/Home/timelinePage';
import DhanchaMain from './pages/Dhancha/dhanchaMain';
import AankhMain from './pages/Aankh/Aankhmain';
import JagrookMain from './pages/Jagrook/Jagrookmain';
import SamakshMain from './pages/Samaksh/Samakshmain';
import DvitMain from './pages/Dvit/Dvitmain';
import Login from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import DoctorPortal from './pages/doctor-portal/doctorportal';
import HospitalPortal from './pages/Hospital-Portal/hospitalPortal';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/doctor-portal/doctorportal';

function Home() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .goog-te-gadget {
        font-family: 'Inter', sans-serif !important;
      }
      .goog-te-gadget-simple {
        background-color: #3b82f6 !important;
        border: none !important;
        padding: 8px 16px !important;
        border-radius: 12px !important;
        font-size: 14px !important;
        line-height: 1.5 !important;
        color: white !important;
        box-shadow: 0 2px 10px rgba(59, 130, 246, 0.2) !important;
        transition: all 0.3s ease !important;
        margin: 8px !important;
        backdrop-filter: blur(10px) !important;
      }
      .goog-te-gadget-simple:hover {
        background-color: #2563eb !important;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3) !important;
        transform: translateY(-1px) !important;
      }
      .goog-te-gadget-simple .goog-te-menu-value {
        color: white !important;
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
      }
      .goog-te-gadget-simple .goog-te-menu-value span {
        color: white !important;
        font-family: 'Inter', sans-serif !important;
      }
      .goog-te-gadget-simple .goog-te-menu-value span:first-child {
        display: none !important;
      }
      .goog-te-menu-value span + img {
        display: none !important;
      }
      .goog-te-menu-value span + img + span {
        display: none !important;
      }
      .goog-te-gadget-icon {
        display: none !important;
      }
      .goog-te-menu-frame {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
        border-radius: 12px !important;
      }
      .VIpgJd-ZVi9od-l4eHX-hSRGPd, .VIpgJd-ZVi9od-l4eHX-hSRGPd:link, .VIpgJd-ZVi9od-l4eHX-hSRGPd:visited, .VIpgJd-ZVi9od-l4eHX-hSRGPd:hover, .VIpgJd-ZVi9od-l4eHX-hSRGPd:active {
        font-family: 'Inter', sans-serif !important;
      }
      #google_translate_element {
        transition: all 0.3s ease !important;
      }
      #google_translate_element.hidden {
        opacity: 0 !important;
        transform: translateY(-20px) !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
      return script;
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'hi',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );
    };

    const script = addGoogleTranslateScript();

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <div className="App h-screen w-full relative">
      {/* Google Translate Element */}
      <div 
        id="google_translate_element" 
        className={`fixed top-4 right-4 z-[9999] translate-button-container transition-all duration-300 ${!isVisible ? 'opacity-0 -translate-y-full pointer-events-none' : ''}`}
      ></div>

      <NavbarDemo />
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <div className="main flex flex-col">
          <div className="flex flex-col lg:flex-row justify-between items-start w-full px-4 lg:px-8 pt-20">
            <div className="heroHigh w-full lg:w-1/2 lg:pr-8">
              <HeroHighlightDemo />
            </div>
            <div className="expandCards w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
              <ExpandableCardDemo />
            </div>
          </div>
          
          <div className="sticky-scroll-container mt-2">
            <TimelineDemo />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0">
        <GridBackgroundDemo />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route  /* element={<ProtectedRoute />} */ >
          <Route path="/dhancha" element={<DhanchaMain />} />
          <Route path="/aankh" element={<AankhMain />} />
          <Route path="/jagrook" element={<JagrookMain />} />
          <Route path="/samaksh" element={<SamakshMain />} />
          <Route path="/dvit" element={<DvitMain />} />
          <Route path="/doctor-portal" element={<Dashboard />} />
          <Route path="/hospital-portal" element={<HospitalPortal />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;