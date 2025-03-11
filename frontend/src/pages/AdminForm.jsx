import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminForm() {
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === "1234") {
      setMessage("Access Granted ✅");
      setTimeout(() => {
        navigate("/admin-profile"); 
      }, 1000);
    } else {
      setMessage("Incorrect PIN ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col justify-center items-center text-white">
      {/* Admin Panel Box */}
      <div className="bg-black bg-opacity-30 p-6 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* PIN Input */}
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter Access PIN"
            className="p-2 bg-transparent text-white border-2 border-white rounded-md mb-4 text-center"
            required
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500"
          >
            Submit
          </button>
        </form>
        {/* Message */}
        {message && <p className="mt-4 text-lg">{message}</p>}
      </div>
    </div>
  );
}

export default AdminForm;
