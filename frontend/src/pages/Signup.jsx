import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/v1/user/register`, {
        userName,
        email,
        password
      });

      alert(response.data.message || "User registered successfully");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col text-white">
      <header className="w-full bg-black bg-opacity-10 p-4 text-center text-lg font-semibold shadow-md">
        Sign Up
      </header>
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="max-w-md w-full bg-black bg-opacity-10 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Create an Account</h2>
          <input type="text" placeholder="Username" className="w-full p-3 mb-4 rounded-lg text-white placeholder-gray-500 border border-white" 
            value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="email" placeholder="Email" className="w-full p-3 mb-4 rounded-lg text-white placeholder-gray-500 border border-white" 
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-3 mb-6 rounded-lg text-white placeholder-gray-500 border border-white" 
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg w-full font-semibold shadow-md hover:bg-yellow-500" 
            onClick={handleSubmit}>
            Sign Up
          </button>
          <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-yellow-300">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
