import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const fetchWebSeries = async () => {
  return [
    {
      name: "Series 1",
      channel: "Channel A",
      episodes: 10,
      genre: ["comedy", "drama"],
      rating: 8.5,
      link: "https://www.youtube.com/playlist?list=PL_T8fm8NU8ZHZLJ9TCRIZ0mEqpXQ0Nfik",
      description: "A fun and entertaining web series.",
      cast: [{ actor: "Actor 1" }, { actor: "Actor 2" }],
    },
    {
      name: "Series 2",
      channel: "Channel B",
      episodes: 12,
      genre: ["thriller"],
      rating: 9.0,
      link: "https://www.youtube.com/playlist?list=PLtK75qxsQaMLZ822YbEOdV4jZbAl8Lx92",
      description: "An intense thriller series with a gripping storyline.",
      cast: [{ actor: "Actor 3" }, { actor: "Actor 4" }],
    },
  ];
};

function AdminPanel() {
  const [webSeries, setWebSeries] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const loadWebSeries = async () => {
      const data = await fetchWebSeries();
      setWebSeries(data);
    };
    loadWebSeries();
  }, []);

  const handleDelete = (index) => {
    const updatedList = webSeries.filter((_, i) => i !== index);
    setWebSeries(updatedList);
  };

  const handleUpdate = (index) => {
    const updatedName = prompt("Enter new name:", webSeries[index].name);
    if (updatedName) {
      const updatedList = [...webSeries];
      updatedList[index].name = updatedName;
      setWebSeries(updatedList);
    }
  };

  const handleAddSeries = () => {
    const newSeries = {
      name: "New Series",
      channel: "New Channel",
      episodes: 0,
      genre: ["unknown"],
      rating: 0,
      link: "#",
      description: "Newly added web series.",
      cast: [{ actor: "Unknown" }],
    };
    setWebSeries([...webSeries, newSeries]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col text-white">
      {/* Header */}
      <header className="w-full bg-black bg-opacity-10 p-4 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-semibold text-center flex-1">Admin Panel</h1>
        <div className="flex gap-4">
          <Link to="/home" className=" text-white pt-2.5">Home</Link>
          <button
            onClick={handleAddSeries}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
          >
            Add Series
          </button>
        </div>
      </header>

      {/* Web Series List */}
      <div className="p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6">Manage Web Series</h1>
        <div className="w-full max-w-4xl">
          {webSeries.map((series, index) => (
            <div key={index} className="mb-6 bg-black bg-opacity-20 p-4 rounded-lg shadow-md">
              {/* Web Series Details */}
              <h2 className="text-2xl font-semibold">{series.name}</h2>
              <p className="text-gray-300">{series.description}</p>
              <p className="mt-2"><strong>Channel:</strong> {series.channel}</p>
              <p><strong>Episodes:</strong> {series.episodes}</p>
              <p><strong>Genres:</strong> {series.genre.join(", ")}</p>
              <p><strong>Rating:</strong> {series.rating}/10</p>
              <p><strong>Cast:</strong> {series.cast.map((actor) => actor.actor).join(", ")}</p>

              {/* Watch Link */}
              <a
                href={series.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 underline text-lg font-bold block mt-2"
              >
                Watch {series.name} on YouTube
              </a>

              {/* Embedded YouTube Video */}
              <div className="mt-4 w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src={series.link.replace("playlist", "embed/videoseries")}
                  title={series.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Admin Controls */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleUpdate(index)}
                  className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="w-full bg-black bg-opacity-10 p-4 text-center text-sm shadow-md">
        © 2025 Admin Panel. All rights reserved.
      </footer>
    </div>
  );
}

export default AdminPanel;
