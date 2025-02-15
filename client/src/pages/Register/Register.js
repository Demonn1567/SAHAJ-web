import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: '' });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7001/api/auth/register', formData);
      console.log(response);
      if (response.status >= 200 && response.status<300) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 bg-gray-100"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl p-12 m-4 bg-white rounded-2xl shadow-xl relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Create Account</h2>
          <p className="text-gray-600 text-lg">Join us today and get started</p>
        </div>

        {success && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-md text-lg"
          >
            Account created successfully! Redirecting to login...
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full px-6 py-4 text-lg rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ease-in-out bg-gray-50"
                  placeholder="Choose your username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-6 py-4 text-lg rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ease-in-out bg-gray-50"
                  placeholder="Create a strong password"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-lg font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="mt-1 relative">
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-6 py-4 text-lg rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ease-in-out bg-gray-50"
                  required
                >
                  <option value="">Select your role</option>
                  <option value="patient">Patient</option>
                  <option value="hospital">Hospital</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="text-base">
              <Link
                to="/login"
                className="font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 ease-in-out mt-6"
          >
            Create Account
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;