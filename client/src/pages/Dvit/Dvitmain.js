import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DvitMain() {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    experience: '',
    availability: '',
    consultation: '',
    language: '',
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [viewMode, setViewMode] = useState('grid'); 
  const [activeFilter, setActiveFilter] = useState('all');
  const [showQuickView, setShowQuickView] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    

    
      
    

  
  
  }, []);

  const doctors = [
    {
      id: 1,
      name: "lakksh sharma",
      specialty: "Therapist",
      experience: "2 years",
      location: "patiala",
      rating: 0.3,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      availability: "Available Today",
      price: "₹1500"
    },
    {
      id: 2,
      name: "Dr. lakksh sharma",
      specialty: "Cardiologist",
      experience: "15 years",
      location: "New York",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      availability: "Available Today",
      price: "₹1500"
    },
    {
      id: 2,
      name: "lakksh sharma",
      specialty: "Cardiologist",
      experience: "15 years",
      location: "New York",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      availability: "Available Today",
      price: "₹1500"
    },
    {
      id: 2,
      name: "lakksh sharma",
      specialty: "Cardiologist",
      experience: "15 years",
      location: "New York",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      availability: "Available Today",
      price: "₹1500"
    },
    {
      id: 2,
      name: "krish sharma",
      specialty: "Cardiologist",
      experience: "15 years",
      location: "New York",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      availability: "Available Today",
      price: "₹1500"
    },
    {
      id: 2,
      name: "priyanshu sharma",
      specialty: "Cardiologist",
      experience: "15 years",
      location: "New York",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      availability: "Available Today",
      price: "₹1500"
    },
    {
      id: 2,
      name: "akshat aggarwal",
      specialty: "Cardiologist",
      experience: "15 years",
      location: "New York",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      availability: "Available Today",
      price: "₹1500"
    },
    {
      id: 2,
      name: "Yash Agnihotri",
      specialty: "Cardiologist",
      experience: "15 years",
      location: "New York",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
      availability: "Available Today",
      price: "₹1500"
    },
    
  ];

  
  const filterCategories = [
    { id: 'all', label: 'All Doctors' },
    { id: 'available', label: 'Available Today' },
    { id: 'topRated', label: 'Top Rated' },
    { id: 'videoConsult', label: 'Video Consult' },
    { id: 'inPerson', label: 'In-Person Visit' }
  ];

  const popularSpecialties = [
    { icon: "🫀", name: "Cardiology" },
    { icon: "🧠", name: "Neurology" },
    { icon: "🦴", name: "Orthopedics" },
    { icon: "👁️", name: "Ophthalmology" },
    { icon: "🦷", name: "Dentistry" }
  ];

  const handleBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="bg-gradient-to-r from-blue-600/90 to-blue-800/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => navigate('/')} 
                className="flex items-center text-white/80 hover:text-white transition-all duration-200 group"
              >
                <svg 
                  className="w-6 h-6 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back</span>
              </button>
              <div className="text-3xl font-bold text-white">
                Dvit
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <button className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                How it works
              </button>
              <button className="text-white/80 hover:text-white transition-colors duration-200 font-medium">
                Find Doctors
              </button>
              <button className="px-6 py-2.5 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-blue-600/5 to-transparent backdrop-blur-sm py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <h1 className="text-5xl font-bold text-gray-800 text-center mb-6 leading-tight">
            Get Expert Second Opinion<br />From Top Specialists
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto text-lg leading-relaxed">
            Connect with experienced specialists for trusted medical advice and comprehensive second opinions.
            Make informed decisions about your health.
          </p>
          
          <div className="flex justify-center space-x-12 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 mt-1">Specialist Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10k+</div>
              <div className="text-gray-600 mt-1">Consultations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">98%</div>
              <div className="text-gray-600 mt-1">Satisfaction Rate</div>
            </div>
          </div>

          
          <div className="max-w-7xl mx-auto px-6 mt-12">
            <div className="flex justify-center space-x-6">
              {popularSpecialties.map((specialty) => (
                <button
                  key={specialty.name}
                  onClick={() => setSearchSpecialty(specialty.name)}
                  className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group"
                >
                  <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">{specialty.icon}</span>
                  <span className="text-sm text-gray-600">{specialty.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter location"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
                <svg className="w-6 h-6 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search specialty"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={searchSpecialty}
                  onChange={(e) => setSearchSpecialty(e.target.value)}
                />
                <svg className="w-6 h-6 text-gray-400 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          
          <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-100">
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        
        <div className="flex justify-between items-center mt-6">
          <div className="text-gray-600 font-medium">
            {doctors.length} doctors available
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        
        <div className={`mt-6 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-6' : 'space-y-4'} max-h-[calc(100vh-400px)] overflow-y-auto pr-4`}>
          {doctors.map((doctor) => (
            <div 
              key={doctor.id} 
              className={`bg-white rounded-xl shadow-md p-6 ${viewMode === 'grid' ? '' : 'flex'} hover:shadow-lg transition-all duration-200 relative group`}
              onMouseEnter={() => setShowQuickView(doctor.id)}
              onMouseLeave={() => setShowQuickView(null)}
            >
              <div className={`${viewMode === 'grid' ? 'text-center mb-4' : 'flex-shrink-0'}`}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className={`${viewMode === 'grid' ? 'w-32 h-32 mx-auto' : 'w-24 h-24'} rounded-full object-cover ring-4 ring-blue-50`}
                />
              </div>
              <div className="ml-6 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialty}</p>
                    <p className="text-gray-500 text-sm mt-1">{doctor.experience} experience</p>
                    <p className="text-gray-500 text-sm">{doctor.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-400 mb-2">
                      <span className="text-lg font-semibold mr-1">{doctor.rating}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-green-600 font-medium">{doctor.availability}</span>
                    <p className="text-gray-600 mt-1">{doctor.price} per visit</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => handleBooking(doctor)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>

              
              {showQuickView === doctor.id && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Quick Information</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Languages: English, Hindi</li>
                        <li>• Video Consultation Available</li>
                        <li>• Next Available: Today, 2:00 PM</li>
                        <li>• Success Rate: 98%</li>
                      </ul>
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                        View Profile
                      </button>
                      <button 
                        onClick={() => handleBooking(doctor)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="text-gray-600 mt-4">Loading...</p>
            </div>
          </div>
        )}
      </div>

      
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-xl transform transition-all">
            {/* Close button */}
            <button 
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Doctor Info Section */}
              <div className="flex items-center space-x-4 pb-6 border-b border-gray-100">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{selectedDoctor.name}</h3>
                  <p className="text-gray-600">{selectedDoctor.specialty}</p>
                  <div className="flex items-center text-yellow-400 mt-1">
                    <span className="text-sm font-semibold mr-1">{selectedDoctor.rating}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>

              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Consultation Details</h4>
                <div className="bg-blue-50 rounded-xl p-4 text-blue-600">
                  <p className="text-sm">
                    Your medical information and diagnosis will be shared with {selectedDoctor.name} immediately after successful payment.
                  </p>
                </div>
                
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="text-lg font-semibold text-gray-800">{selectedDoctor.price}</span>
                  </div>
                </div>

                
                <div className="text-sm text-gray-500 space-y-2">
                  <p>• Consultation duration: 30 minutes</p>
                  <p>• 24 hours free follow-up included</p>
                  <p>• Prescription will be provided if required</p>
                </div>
              </div>

              
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-semibold text-gray-800">Select Consultation Time</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                        ${selectedTime === time 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Payment Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="text-gray-800">{selectedDoctor.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fee</span>
                    <span className="text-gray-800">$10</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-800">Total Amount</span>
                      <span className="text-blue-600">$110</span>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="flex space-x-4 pt-6">
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  Make Payment & Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  



  