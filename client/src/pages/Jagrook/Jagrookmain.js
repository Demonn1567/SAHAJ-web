import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Playfair_Display } from 'next/font/google';i
import qr1 from "../../assets/qr1.png";
import qr2 from "../../assets/qr2.png";

export default function JagrookMain() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedCondition, setExpandedCondition] = useState(null);
  const [fontSize, setFontSize] = useState('normal');
  const [activeNav, setActiveNav] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStat, setCurrentStat] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState('abha');
  const [activeNewsTab, setActiveNewsTab] = useState('whats-new');
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
    // Add custom CSS for Google Translate styling
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

  const categoryAnimations = {
    enter: "transition-all duration-300 ease-out",
    enterFrom: "opacity-0 -translate-y-2",
    enterTo: "opacity-100 translate-y-0",
    leave: "transition-all duration-200 ease-in",
    leaveFrom: "opacity-100 translate-y-0",
    leaveTo: "opacity-0 -translate-y-2",
  };
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&q=80&w=1200",
      title: "Digital Health Initiative",
      description: "Transforming healthcare through digital innovation and accessibility.",
      cta: "Learn More",
      ctaLink: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
      title: "Connected Healthcare",
      description: "Bridging the gap between patients and healthcare providers.",
      cta: "Explore Services",
      ctaLink: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=1200",
      title: "Healthcare Innovation",
      description: "Advancing medical care through technology and research.",
      cta: "View Research",
      ctaLink: "#"
    }
  ];

  const healthStats = [
    {
      number: "10M+",
      label: "Digital Health Records Created",
      icon: "📊"
    },
    {
      number: "24/7",
      label: "Access to Medical Information",
      icon: "🏥"
    },
    {
      number: "98%",
      label: "User Satisfaction Rate",
      icon: "⭐"
    },
    {
      number: "500+",
      label: "Healthcare Partners Nationwide",
      icon: "🤝"
    }
  ];

  const abdmComponents = [
    {
      id: 'abha',
      title: 'Sahaj ID',
      icon: '🆔',
      description: 'Your Sahaj Number is a hassle-free method of accessing and sharing your health records digitally.',
      color: 'bg-blue-500',
      features: [
        'Unique 24-character alphanumeric Sahaj ID',
        'Access health records anywhere',
        'Share records with healthcare providers',
        'Track your health journey'
      ]
    },
    {
      id: 'hfr',
      title: 'Health Facility Registry',
      icon: '🏥',
      description: 'A comprehensive registry of healthcare facilities across the country, enabling easy discovery and access to healthcare services.',
      color: 'bg-green-500',
      features: [
        'Find nearby healthcare facilities',
        'Verify registered hospitals',
        'Access facility information',
        'Check available services'
      ]
    },
    {
      id: 'hpr',
      title: 'Healthcare Professionals Registry',
      icon: '👨‍⚕️',
      description: 'A database of verified healthcare professionals, ensuring you receive care from qualified practitioners.',
      color: 'bg-purple-500',
      features: [
        'Verify doctor credentials',
        'Find specialists',
        'Book appointments',
        'View professional history'
      ]
    },
    {
      id: 'uhi',
      title: 'Unified Health Interface',
      icon: '🔄',
      description: 'A seamless interface that connects various healthcare stakeholders, enabling smooth interaction and data exchange.',
      color: 'bg-orange-500',
      features: [
        'Interoperable systems',
        'Secure data exchange',
        'Real-time updates',
        'Standardized protocols'
      ]
    },
    {
      id: 'app',
      title: 'Sahaj App',
      icon: '📱',
      description: 'Your personal health companion app that puts you in control of your health records and interactions.',
      color: 'bg-red-500',
      features: [
        'Manage health profile',
        'Track appointments',
        'Store health documents',
        'Secure access control'
      ]
    }
  ];

  const newsContent = {
    'whats-new': [
      {
        title: "The Role of Sahaj in Indian Healthcare",
        description: "Exploring how Sahaj is transforming the healthcare landscape in India through digital innovation.",
        date: "30/01/2024",
        icon: "📱"
      },
      {
        title: "Healthcare in the Digital Age",
        description: "A comprehensive look at India's digital health mission and its impact on healthcare delivery.",
        date: "14/01/2024",
        icon: "🔬"
      },
      {
        title: "India's Digital Health Journey",
        description: "How India is becoming a global pathfinder in digital health transformation.",
        date: "14/01/2024",
        icon: "🌐"
      }
    ],
    'webinars': [
      {
        title: "Digital Health Standards Workshop",
        description: "Join our expert panel discussing the latest in healthcare standardization.",
        date: "Upcoming: Feb 15, 2024",
        icon: "💻"
      },
      {
        title: "Healthcare Innovation Summit",
        description: "Virtual conference on emerging trends in digital healthcare.",
        date: "Upcoming: Mar 1, 2024",
        icon: "🎯"
      },
      {
        title: "Tech in Healthcare Symposium",
        description: "Learn about the latest technological advancements in healthcare.",
        date: "Upcoming: Mar 15, 2024",
        icon: "🔬"
      }
    ],
    'recent-events': [
      {
        title: "National Health Summit 2024",
        description: "Highlights from the annual healthcare conference in New Delhi.",
        date: "Jan 20, 2024",
        icon: "🎪"
      },
      {
        title: "Digital Health Hackathon",
        description: "Innovative solutions presented by healthcare technology enthusiasts.",
        date: "Jan 15, 2024",
        icon: "💡"
      },
      {
        title: "Healthcare Leaders Forum",
        description: "Key insights from industry leaders on the future of healthcare.",
        date: "Jan 10, 2024",
        icon: "👥"
      }
    ],
    'in-the-news': [
      {
        title: "Sahaj Reaches 10 Million Users",
        description: "Major milestone achieved in digital health adoption.",
        date: "Jan 25, 2024",
        source: "Economic Times",
        icon: "📰"
      },
      {
        title: "Healthcare Tech Revolution",
        description: "How digital platforms are changing patient care.",
        date: "Jan 20, 2024",
        source: "The Hindu",
        icon: "📱"
      },
      {
        title: "Digital Health Initiative Success",
        description: "Government reports significant progress in healthcare digitization.",
        date: "Jan 15, 2024",
        source: "Times of India",
        icon: "📊"
      }
    ],
    'press-releases': [
      {
        title: "New Features Announcement",
        description: "Introducing advanced healthcare monitoring capabilities.",
        date: "Jan 30, 2024",
        icon: "📢"
      },
      {
        title: "Partnership with Leading Hospitals",
        description: "Expanding our network of healthcare providers.",
        date: "Jan 25, 2024",
        icon: "🤝"
      },
      {
        title: "Digital Health Initiative Launch",
        description: "New program to enhance healthcare accessibility.",
        date: "Jan 20, 2024",
        icon: "🚀"
      }
    ],
    'images': [
      {
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
        title: "Digital Health Conference 2024",
        description: "Industry leaders discussing the future of healthcare",
        date: "Jan 15, 2024"
      },
      {
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        title: "Healthcare Innovation Lab",
        description: "Next-generation medical technology in action",
        date: "Jan 10, 2024"
      },
      {
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        title: "Patient Care Revolution",
        description: "Modern healthcare delivery systems",
        date: "Jan 5, 2024"
      }
    ],
    'videos': [
      {
        videoId: "dQw4w9WgXcQ", // Replace with actual healthcare video IDs
        title: "Understanding Digital Health",
        description: "An overview of modern healthcare systems",
        duration: "10:25"
      },
      {
        videoId: "dQw4w9WgXcQ", // Replace with actual healthcare video IDs
        title: "Future of Healthcare",
        description: "Expert insights on healthcare evolution",
        duration: "15:30"
      },
      {
        videoId: "dQw4w9WgXcQ", // Replace with actual healthcare video IDs
        title: "Healthcare Technology",
        description: "Latest innovations in medical tech",
        duration: "12:45"
      }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % healthStats.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCreateSahajClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Google Translate Element */}
      <div 
        id="google_translate_element" 
        className={`fixed top-4 right-4 z-[9999] translate-button-container transition-all duration-300 ${!isVisible ? 'opacity-0 -translate-y-full pointer-events-none' : ''}`}
      ></div>

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-700 relative overflow-hidden">
        {/* Top Icons Bar */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-end py-2 border-b border-white/10">
            <div className="flex items-center space-x-6 text-white/80">
              {/* Font Size Controls */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setFontSize('small')}
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  A-
                </button>
                <button 
                  onClick={() => setFontSize('normal')}
                  className="text-base hover:text-white transition-colors duration-200"
                >
                  A
                </button>
                <button 
                  onClick={() => setFontSize('large')}
                  className="text-lg hover:text-white transition-colors duration-200"
                >
                  A+
                </button>
              </div>

              <div className="h-4 w-px bg-white/20"></div>

              {/* Analytics Icon */}
              <button className="hover:text-white transition-colors duration-200 relative group">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Analytics
                </span>
              </button>

              {/* Notifications Icon */}
              <button className="hover:text-white transition-colors duration-200 relative group">
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Notifications
                </span>
              </button>
            </div>
          </div>

          {/* Existing Header Content */}
          <div className="flex items-center justify-between h-24 relative z-10">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')} 
                className="flex items-center text-white/80 hover:text-white transition-all duration-200 group mr-8"
              >
                <svg 
                  className="w-6 h-6 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="flex items-center">
                <h1 className="text-4xl font-serif font-bold text-white tracking-wider">
                  Jagrook
                </h1>
                <span className="ml-3 px-2 py-1 bg-blue-500/20 rounded-md text-xs text-white/90 font-medium">
                  BETA
                </span>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-6">
              {/* Contribute Button */}
              <button className="px-5 py-2 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 
                               transition-all duration-200 flex items-center space-x-2 group">
                <span>Contribute</span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-center">
            <div className="flex justify-between w-full max-w-6xl">
              <a 
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
                  setActiveNav('hero');
                }}
                className={`px-6 py-6 font-medium text-lg transition-colors duration-200
                  ${activeNav === 'hero' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'}`}
              >
                Home
              </a>
              <a 
                href="#abdm"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#abdm').scrollIntoView({ behavior: 'smooth' });
                  setActiveNav('abdm');
                }}
                className={`px-6 py-6 font-medium text-lg transition-colors duration-200
                  ${activeNav === 'abdm' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'}`}
              >
                ABDM Components
              </a>
              <a 
                href="#stakeholders"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#stakeholders').scrollIntoView({ behavior: 'smooth' });
                  setActiveNav('stakeholders');
                }}
                className={`px-6 py-6 font-medium text-lg transition-colors duration-200
                  ${activeNav === 'stakeholders' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'}`}
              >
                Stakeholders
              </a>
              <a 
                href="#newsletter"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#newsletter').scrollIntoView({ behavior: 'smooth' });
                  setActiveNav('newsletter');
                }}
                className={`px-6 py-6 font-medium text-lg transition-colors duration-200
                  ${activeNav === 'newsletter' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'}`}
              >
                Newsletter
              </a>
              <a 
                href="#news"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#news').scrollIntoView({ behavior: 'smooth' });
                  setActiveNav('news');
                }}
                className={`px-6 py-6 font-medium text-lg transition-colors duration-200
                  ${activeNav === 'news' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'}`}
              >
                News & Updates
              </a>
              <a 
                href="#stats"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#stats').scrollIntoView({ behavior: 'smooth' });
                  setActiveNav('stats');
                }}
                className={`px-6 py-6 font-medium text-lg transition-colors duration-200
                  ${activeNav === 'stats' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'}`}
              >
                Statistics
              </a>
              <a 
                href="#social"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#social').scrollIntoView({ behavior: 'smooth' });
                  setActiveNav('social');
                }}
                className={`px-6 py-6 font-medium text-lg transition-colors duration-200
                  ${activeNav === 'social' 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'}`}
              >
                Social Media
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Hero Section with Split Layout */}
      <div id="hero" className="w-full bg-gray-50/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-8xl mx-auto px-8">
          <div className="flex gap-12 py-12">
            {/* Left Side - Static Content - Now 60% */}
            <div className="w-3/5">
              <div className="bg-white rounded-xl p-10 shadow-sm h-full flex flex-col justify-center">
                <h2 className="text-5xl font-bold text-gray-800 mb-8">
                  Digital Health Platform
                </h2>
                <div className="space-y-6 mb-10">
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Transforming healthcare through digital innovation and accessibility. 
                    Our platform bridges the gap between patients and healthcare providers, 
                    making medical knowledge accessible to everyone.
                  </p>
                  <div className="border-l-4 border-blue-500 pl-6 py-2">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      ✓ Access to verified medical information<br/>
                      ✓ Connect with healthcare professionals<br/>
                      ✓ Track your health records digitally<br/>
                      ✓ Secure and private platform
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Why Choose Sahaj?</h3>
                    <p className="text-gray-700">
                      Join millions of users who trust our platform for their healthcare needs. 
                      Get instant access to medical resources, expert advice, and personalized health insights.
                    </p>
                  </div>
                </div>
                <div className="mt-auto">
                  <button 
                    onClick={handleCreateSahajClick}
                    className="w-full px-8 py-5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                             transition-all duration-300 flex items-center justify-center space-x-3 
                             shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span className="text-2xl font-semibold">Create Sahaj Number</span>
                    <svg 
                      className="w-7 h-7" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Carousel - Now 40% */}
            <div className="w-2/5">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl bg-white">
                {/* Slides */}
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      currentSlide === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/30 
                           backdrop-blur-sm hover:bg-white/50 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/30 
                           backdrop-blur-sm hover:bg-white/50 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        currentSlide === index 
                          ? 'w-8 bg-white' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABDM Components Section */}
      <div id="abdm" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Sahaj Components
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the key components of Sahaj that work together 
              to create a comprehensive digital health ecosystem.
            </p>
          </div>

          {/* Component Cards */}
          <div className="grid grid-cols-5 gap-6 mb-12">
            {abdmComponents.map((component) => (
              <button
                key={component.id}
                onClick={() => setSelectedComponent(component.id)}
                className={`relative p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1
                  ${selectedComponent === component.id 
                    ? 'bg-white shadow-lg scale-105' 
                    : 'bg-white/50 hover:bg-white hover:shadow-md'}`}
              >
                <div className={`w-12 h-12 rounded-full ${component.color} bg-opacity-10 flex items-center justify-center mb-4 mx-auto`}>
                  <span className="text-2xl">{component.icon}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{component.title}</h3>
                <div className={`absolute bottom-0 left-0 h-1 transition-all duration-300
                  ${component.color} ${selectedComponent === component.id ? 'w-full' : 'w-0'}`}
                ></div>
              </button>
            ))}
          </div>

          {/* Component Details */}
          {abdmComponents.map((component) => (
            <div
              key={component.id}
              className={`transition-all duration-500 transform
                ${selectedComponent === component.id 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8 hidden'}`}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className={`${component.color} bg-opacity-10 px-8 py-6`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-full ${component.color} bg-opacity-20 
                                  flex items-center justify-center`}>
                      <span className="text-3xl">{component.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{component.title}</h3>
                      <p className="text-gray-600">{component.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="px-8 py-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-800">Key Features</h4>
                      <ul className="space-y-2">
                        {component.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-600">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {component.id === 'abha' ? (
                        <>
                          <button 
                            onClick={handleCreateSahajClick}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl 
                                             hover:bg-blue-700 transition-colors duration-200
                                             flex items-center justify-center space-x-2 shadow-md">
                            <span>Create Sahaj Number</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                          <button 
                            onClick={handleCreateSahajClick}
                            className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl 
                                             hover:bg-gray-200 transition-colors duration-200
                                             flex items-center justify-center space-x-2">
                            <span>Learn More</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={handleCreateSahajClick}
                          className={`px-6 py-3 ${component.color} text-white rounded-xl 
                                           hover:bg-opacity-90 transition-colors duration-200
                                           flex items-center space-x-2`}>
                          <span>Learn More</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Cards Section */}
      <div id="stakeholders" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              For Healthcare Stakeholders
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Empowering different stakeholders in the healthcare ecosystem with digital solutions
            </p>
          </div>

          <div className="grid grid-cols-4 gap-8">
            {/* For Citizens */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000"
                  alt="Citizens"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-600 mb-2">For Citizens</h3>
                <p className="text-gray-600 mb-4">
                  Generate your unique health identifier and access healthcare services seamlessly.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* For Health Facilities */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000"
                  alt="Health Facilities"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-600 mb-2">For Health Facilities</h3>
                <p className="text-gray-600 mb-4">
                  Register your facility and connect with the digital health ecosystem.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors duration-200"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* For Healthcare Professionals */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=2000"
                  alt="Healthcare Professionals"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-600 mb-2">For Healthcare Professionals</h3>
                <p className="text-gray-600 mb-4">
                  Join the healthcare network and provide better care with digital tools.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors duration-200"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* For Health Tech Companies */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576089172869-4f5f6f315620?auto=format&fit=crop&q=80&w=2000"
                  alt="Health Tech Companies"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-orange-600 mb-2">For Health Tech Companies</h3>
                <p className="text-gray-600 mb-4">
                  Integrate with our platform and expand your digital health solutions.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors duration-200"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div id="newsletter" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Stay Updated with Healthcare Innovations
                </h3>
                <p className="text-gray-600">
                  Subscribe to our newsletter for the latest updates in digital healthcare and medical advancements
                </p>
              </div>
              
              {/* Subscription Form */}
              <div className="flex items-center justify-center space-x-4 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email address"
                    className="w-full px-6 py-3 rounded-xl bg-gray-50 border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             transition-all duration-200 text-gray-800 placeholder-gray-400"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                                 transition-colors duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md
                                 whitespace-nowrap">
                  <span>Subscribe Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
              
              {/* Optional: Trust Indicators */}
              <div className="flex items-center justify-center mt-6 text-sm text-gray-500 space-x-8">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>No Spam Promise</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Unsubscribe Anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News and Updates Section */}
      <div id="news" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex items-center justify-center space-x-1 mb-12 bg-gray-50 p-1 rounded-xl max-w-4xl mx-auto">
            {[
              { id: 'whats-new', label: "What's New" },
              { id: 'webinars', label: 'Webinars' },
              { id: 'recent-events', label: 'Recent Events' },
              { id: 'in-the-news', label: 'In The News' },
              { id: 'press-releases', label: 'Press Releases' },
              { id: 'images', label: 'Images' },
              { id: 'videos', label: 'Videos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveNewsTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${activeNewsTab === tab.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid - Dynamic Content Based on Tab */}
          <div className={`grid ${activeNewsTab === 'images' || activeNewsTab === 'videos' ? 'grid-cols-3' : 'grid-cols-3'} gap-8`}>
            {activeNewsTab === 'images' ? (
              // Image Gallery Layout
              newsContent[activeNewsTab].map((item, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-lg text-gray-600 mb-4">{item.description}</p>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                </div>
              ))
            ) : activeNewsTab === 'videos' ? (
              // Video Gallery Layout
              newsContent[activeNewsTab].map((item, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${item.videoId}`}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-lg text-gray-600 mb-4">{item.description}</p>
                    <span className="text-sm text-gray-500">Duration: {item.duration}</span>
                  </div>
                </div>
              ))
            ) : (
              // Default Card Layout for Other Tabs
              newsContent[activeNewsTab].map((item, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="flex items-start space-x-4 p-8">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-base text-gray-500">
                          {item.date}
                          {item.source && ` • ${item.source}`}
                        </span>
                        <a 
                          href="#" 
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 text-lg font-medium"
                        >
                          Read More
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 
                             transition-colors duration-200 flex items-center space-x-2 mx-auto">
              <span>View More</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div id="stats" className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Digital Healthcare Impact
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Making a difference in healthcare delivery across India
            </p>
          </div>

          <div className="grid grid-cols-7 gap-6">
            {[
              {
                icon: "📱",
                number: "74.02M",
                label: "Sahaj Numbers",
                bgColor: "bg-white/10"
              },
              {
                icon: "🏥",
                number: "49.19M",
                label: "Health Records Linked",
                bgColor: "bg-white/10"
              },
              {
                icon: "🏢",
                number: "3.63M",
                label: "Facilities Registered",
                bgColor: "bg-white/10"
              },
              {
                icon: "👨‍⚕️",
                number: "5.65M",
                label: "Healthcare Professionals",
                bgColor: "bg-white/10"
              },
              {
                icon: "📲",
                number: "1.38M",
                label: "App Downloads",
                bgColor: "bg-white/10"
              },
              {
                icon: "🔄",
                number: "1,941",
                label: "Active Integrators",
                bgColor: "bg-white/10"
              },
              {
                icon: "✅",
                number: "274",
                label: "Successful Integrators",
                bgColor: "bg-white/10"
              }
            ].map((stat, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="flex flex-col items-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm
                             hover:bg-white/20 transition-all duration-300 h-full">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4
                               group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2 tracking-tight">
                      {stat.number}
                    </div>
                    <div className="text-sm text-blue-100 whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-blue-100 text-sm">
              *as on {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Integration Section */}
      <div id="social" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header with Social Links */}
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Social Media
            </h2>
            <div className="flex items-center space-x-4">
              <button className="bg-gray-50 hover:bg-gray-100 p-3 rounded-xl transition-all duration-200 group">
                <span className="sr-only">All</span>
                <span className="text-gray-700 font-medium">All</span>
              </button>
              <button className="bg-red-50 hover:bg-red-100 p-3 rounded-xl transition-all duration-200 group">
                <span className="sr-only">YouTube</span>
                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </button>
              <button className="bg-purple-50 hover:bg-purple-100 p-3 rounded-xl transition-all duration-200 group">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-xl transition-all duration-200 group">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-xl transition-all duration-200 group">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.064-2.063 2.063 0 1.139.925 2.064 2.066 2.064zm1.331 13.765H4.001V9h5.337v11.452zM5.337 5.337H4.001V1.665h5.337v3.672z"/>
                </svg>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 p-3 rounded-xl transition-all duration-200 group">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="grid grid-cols-4 gap-6 overflow-x-auto pb-6">
            {/* Post 1 - Twitter/X */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-w-[300px]">
              <div className="flex items-center space-x-3 mb-4">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=NHA" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-800">National Health Authority</h4>
                  <p className="text-sm text-gray-500">@AyushmanNHA</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Bihar has become the first State in the country to generate over 1 Lakh OPD registrations through ABHA based #ScanandShare.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <span>2h ago</span>
                <div className="flex items-center space-x-4">
                  <button className="hover:text-blue-500">💬 24</button>
                  <button className="hover:text-green-500">🔄 89</button>
                  <button className="hover:text-red-500">❤️ 234</button>
                </div>
              </div>
            </div>

            {/* Post 2 - YouTube */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-w-[300px]">
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef" 
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Understanding Digital Health Ecosystem</h4>
              <p className="text-sm text-gray-500 mb-4">A comprehensive guide to India's digital health revolution</p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <span>10K views</span>
                <span>15:30</span>
              </div>
            </div>

            {/* Post 3 - Instagram */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-w-[300px]">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img src="https://api.dicebear.com/7.x/initials/svg?seed=NHA" className="w-full h-full rounded-full" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">ayushmannha</h4>
                  <p className="text-xs text-gray-500">Official Account</p>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 text-sm mb-2">
                Empowering healthcare through digital innovation 🏥✨ #DigitalHealth #Healthcare
              </p>
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center space-x-4">
                  <button className="hover:text-red-500">❤️ 1.2K</button>
                  <button className="hover:text-gray-700">💬 45</button>
                </div>
                <span>1h ago</span>
              </div>
            </div>

            {/* Post 4 - LinkedIn */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-w-[300px]">
              <div className="flex items-center space-x-3 mb-4">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=NHA" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-gray-800">National Health Authority</h4>
                  <p className="text-xs text-gray-500">Healthcare • Government Organization</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Excited to announce our latest milestone in digital healthcare transformation! 🎉
              </p>
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center justify-between text-gray-500 text-sm">
                <div className="flex items-center space-x-4">
                  <button className="hover:text-blue-600">👍 856</button>
                  <button className="hover:text-gray-700">💬 34</button>
                  <button className="hover:text-green-600">🔄 123</button>
                </div>
                <span>3h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-4 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-6">Contact</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-blue-200 mb-2">Address</h4>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Thapar university, hostel K room A350
                  </p>
                </div>
                <div>
                  <h4 className="text-blue-200 mb-2">Toll-free-number</h4>
                  <p className="text-blue-100 text-lg">1800-11-4477</p>
                </div>
                <div>
                  <h4 className="text-blue-200 mb-2">Email</h4>
                  <p className="text-blue-100 text-sm">sahajhealthcarehelp@gov.in</p>
                </div>
              </div>
            </div>

            {/* Important Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-6">Important Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Ministry of Health and Family Welfare
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Ayushman Bharat Health Account (ABHA)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Healthcare Professionals Registry (HPR)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Health Facility Registry (HFR)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Grievance Portal
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Tell us what you think of our website
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-6">Policies</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Website Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Data Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Health Data Management Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* SAHAJ App */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-6">SAHAJ App</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <img 
                    src= {qr1}
                    alt="Android App QR Code"
                    className="w-full h-auto"
                  />
                  <p className="text-center text-gray-600 text-xs mt-2">Android App</p>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <img 
                    src={qr2}
                    alt="iOS App QR Code"
                    className="w-full h-auto"
                  />
                  <p className="text-center text-gray-600 text-xs mt-2">iOS App</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="block w-1/2">
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="w-full h-auto"
                  />
                </a>
                <a href="#" className="block w-1/2">
                  <img 
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="w-full h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-blue-800">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {['facebook', 'youtube', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center hover:bg-blue-700 
                             transition-colors duration-200"
                  >
                    <span className="sr-only">{platform}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {/* Add appropriate SVG path for each platform */}
                    </svg>
                  </a>
                ))}
              </div>
              <p className="text-blue-200 text-sm">
                Page last updated on : {new Date().toLocaleDateString()} | No. of Visitors : 16,175,653
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
  }
