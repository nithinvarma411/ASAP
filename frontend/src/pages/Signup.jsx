import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col text-white">
      <header className="w-full bg-black bg-opacity-10 p-4 text-center text-lg font-semibold shadow-md">
        Sign Up
      </header>
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="max-w-md w-full bg-black bg-opacity-10 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Create an Account</h2>
          <input type="text" placeholder="Username" className="w-full p-3 mb-4 rounded-lg text-gray-900 placeholder-gray-500 border border-white" />
          <input type="email" placeholder="Email" className="w-full p-3 mb-4 rounded-lg text-gray-900 placeholder-gray-500 border border-white" />
          <input type="password" placeholder="Password" className="w-full p-3 mb-6 rounded-lg text-gray-900 placeholder-gray-500 border border-white" />
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg w-full font-semibold shadow-md hover:bg-yellow-500">
            Sign Up
          </button>
          <p className="mt-4 text-center">Already have an account? <Link to="/login" className="text-yellow-300">Log in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
