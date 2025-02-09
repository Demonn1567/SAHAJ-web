import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DvitMain() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:7001/api/hospital/doctors");
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleBooking = (doctor) => {
    console.log("📌 Booking button clicked for:", doctor);
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handlePayment = async () => {
    try {
      const amount = 1500; // Fixed price or dynamically get from doctor
      const response = await axios.post("http://127.0.0.1:7001/api/payment/create-order", {
        amount: amount,
        currency: "INR",
      });

      const { order } = response.data;

      const options = {
        key: "RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Doctor Consultation",
        description: `Payment for appointment with Dr. ${selectedDoctor.name}`,
        order_id: order.id,
        handler: async function (response) {
          await axios.post("http://127.0.0.1:7001/api/payment/verify-payment", response);
          alert("Payment Successful! Your appointment is booked.");
          setShowBookingModal(false);
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl text-center mt-6">Doctors Available</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {doctors.map((doctor, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{doctor.username}</h2>
            <p className="text-gray-600">Specialization: Cardiologist</p>
            <button
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => handleBooking(doctor)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {showBookingModal && selectedDoctor ? (
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
) : null}

    </div>
  );
}
