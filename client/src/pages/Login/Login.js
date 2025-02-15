import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("🔍 Form Submitted:", formData); 

    try {
      const response = await axios.post('https://localhost:7001/api/auth/login', formData);
      console.log("✅ Server Response:", response.data); 

      const { token, role, username } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      window.dispatchEvent(new Event("storage")); 

      if (role === 'patient') {
        navigate('/'); 
      } else if (role === 'doctor') {
        navigate('/doctor-portal');
      } else if (role === 'hospital') {
        navigate('/hospital-portal');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      
      if (error.response) {
        console.log("❌ Server Error Response:", error.response.data);
        setError(error.response.data.message || 'Invalid credentials. Please try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
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
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Welcome Back</h2>
          <p className="text-gray-600 text-lg">Please sign in to continue</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-lg"
          >
            {error}
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
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full px-6 py-4 text-lg rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ease-in-out bg-gray-50"
                  placeholder="Enter your username"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-6 py-4 text-lg rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ease-in-out bg-gray-50"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="text-base">
              <Link to="/register" className="font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200">
                New user? Create an account
              </Link>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            onClick={handleSubmit}
            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 ease-in-out mt-6"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;