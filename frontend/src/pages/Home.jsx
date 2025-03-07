import React from 'react'

function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col text-white">
      {/* Header */}
      <header className="w-full bg-black bg-opacity-10 p-4 text-center text-lg font-semibold shadow-md">
        Must-Watch Telugu Web Series
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="max-w-1xl text-center bg-black bg-opacity-10 p-8 rounded-lg shadow-lg">
          <h1 className="text-5xl font-extrabold mb-4">Discover Amazing Web Series</h1>
          <p className="text-lg mb-6">
            Explore the best Telugu web series available on YouTube! Get details on the main characters, YouTube channels, and share your ratings and comments.
          </p>
          <div className="flex justify-center mb-6">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzzE2ZCdMzyaF9eYSdVPFnvvh03WRTya5KaQ&s" 
              alt="Telugu Web Series" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-yellow-500 transition-transform transform hover:scale-105">
            Explore Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-black bg-opacity-10 p-4 text-center text-sm shadow-md">
        © 2025 Must-Watch Telugu Web Series. All rights reserved.
      </footer>
    </div>
    </div>
  )
}

export default Home
