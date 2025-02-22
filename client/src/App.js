"use client";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GridBackgroundDemo } from "./components/background";
import { NavbarDemo } from "./pages/Home/navbar";
import { HeroHighlightDemo } from "./pages/Home/HeroHighlight";
import { ExpandableCardDemo } from "./pages/Home/Homecards";
import { TimelineDemo } from "./pages/Home/timelinePage";
import DhanchaMain from "./pages/Dhancha/dhanchaMain";
import AankhMain from "./pages/Aankh/Aankhmain";
import JagrookMain from "./pages/Jagrook/Jagrookmain";
import SamakshMain from "./pages/Samaksh/Samakshmain";
import DvitMain from "./pages/Dvit/Dvitmain";
import Login from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import DoctorPortal from "./pages/doctor-portal/doctorportal";
import HospitalPortal from "./pages/Hospital-Portal/hospitalPortal";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/doctor-portal/doctorportal";
import SpotlightSearch from "./components/SpotlightSearch"; 
import Chatbot from "./components/Chatbot";
import MedicationReminders from "./pages/Medication-reminder/MedicationReminders";

function Home() {
  return (
    <div className="App h-screen w-full relative">
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
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsSpotlightOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchItems = [
    { id: 1, name: "Dhancha", description: "Surgical Database with pricing.", path: "/dhancha" },
    { id: 2, name: "Aankh", description: "Image processing to read contents.", path: "/aankh" },
    { id: 3, name: "Jagrook", description: "Educational surgical database.", path: "/jagrook" },
    { id: 4, name: "Samaksh", description: "Live camera feed", path: "/samaksh" },
    { id: 5, name: "Dvit", description: "Second opinion doctor", path: "/dvit" }
  ];

  

  return (
    <Router>
      <SpotlightSearch data={searchItems} isOpen={isSpotlightOpen} onClose={() => setIsSpotlightOpen(false)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route>
          <Route path="/dhancha" element={<DhanchaMain />} />
          <Route path="/aankh" element={<AankhMain />} />
          <Route path="/jagrook" element={<JagrookMain />} />
          <Route path="/samaksh" element={<SamakshMain />} />
          <Route path="/dvit" element={<DvitMain />} />
          <Route path="/doctor-portal" element={<Dashboard />} />
          <Route path="/hospital-portal" element={<HospitalPortal />} />
          <Route path="/medication-reminders" element = {<MedicationReminders/>}/>
        </Route>
      </Routes>
      <Chatbot/>
    </Router>
  );
}

export default App;
