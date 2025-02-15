import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Home/navbar';

export default function DvitMain() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("https://127.0.0.1:7001/api/hospital/doctors");
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      alert("Failed to fetch doctors. Please try again.");
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const amount = selectedDoctor.price || 500;
      
      const orderResponse = await axios.post(
        "https://127.0.0.1:7001/api/payment/create-order",
        {
          amount: amount,
          currency: "INR",
        }
      );

      console.log("Order response:", orderResponse.data);
      const { order, key_id } = orderResponse.data;

      if (!window.Razorpay) {
        const isLoaded = await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

        if (!isLoaded) {
          throw new Error('Razorpay SDK failed to load');
        }
      }

      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Doctor Consultation",
        description: `Appointment with Dr. ${selectedDoctor.username}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post("https://127.0.0.1:7001/api/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert("Payment Successful! Your appointment is booked.");
            setShowBookingModal(false);
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Patient Name",
          email: "patient@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert(error.message || "Failed to initialize payment. Please try again.");
      setLoading(false);
    }
  };

const handleBooking = (doctor) => {
  setSelectedDoctor(doctor);
  setShowBookingModal(true);
};

const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

const filteredDoctors = doctors
  .filter(doctor => 
    doctor.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSpecialty ? doctor.specialty === selectedSpecialty : true)
  )
  .sort((a, b) => {
    if (sortBy === 'name') return a.username.localeCompare(b.username);
    if (sortBy === 'price') return (a.price || 500) - (b.price || 500);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar/>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search doctors..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>

          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">{doctor.username}</h2>
                <div className="flex items-center justify-center mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {doctor.specialty}
                  </span>
                </div>
                <div className="text-center text-gray-600 mb-4">
                  <p className="font-semibold text-lg">₹{doctor.price || 500}</p>
                  <p className="text-sm">per consultation</p>
                </div>
                <button
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  onClick={() => handleBooking(doctor)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm Booking</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-semibold">{selectedDoctor.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Specialization:</span>
                <span className="font-semibold">{selectedDoctor.specialty}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fee:</span>
                <span className="font-semibold">₹{selectedDoctor.price || 500}</span>
              </div>
              <div className="flex space-x-4 mt-6">
                <button 
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Proceed to Pay'}
                </button>
                <button 
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}