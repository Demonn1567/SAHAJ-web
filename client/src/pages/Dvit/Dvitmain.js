import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DvitMain() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
      const response = await axios.get("http://127.0.0.1:7001/api/hospital/doctors");
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
        "http://127.0.0.1:7001/api/payment/create-order",
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
            await axios.post("http://127.0.0.1:7001/api/payment/verify-payment", {
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

  

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl text-center mt-6">Doctors Available</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {doctors.map((doctor, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{doctor.username}</h2>
            <p className="text-gray-600">Specialization: {doctor.specialty}</p>
            <p className="text-gray-600 font-bold">₹500 per visit</p>
            <button
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => handleBooking(doctor)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {showBookingModal && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>
            <p>Doctor: {selectedDoctor.username}</p>
            <p>Specialization: {selectedDoctor.specialty}</p>
            <p>Fee: ₹{selectedDoctor.price}</p>
            <button 
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={handlePayment}
            >
              Proceed to Pay
            </button>
            <button 
              className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={() => setShowBookingModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
