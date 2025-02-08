import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:7001/api/auth/login', formData);
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
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Login</h2>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-md shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
              placeholder="johndoe"
              required
            />
            <p className="mt-1 text-sm text-gray-500">This is your public display name.</p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <Link to="/register" className="block text-center text-blue-600 hover:text-blue-800 font-medium">
            New user? Register now!
          </Link>

          <button
            type="submit"
            onClick = {handleSubmit}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;