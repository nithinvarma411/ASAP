import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const fetchWebSeries = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}api/v1/WebSeries/get-webseries`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching web series:", error);
    return [];
  }
};

function AdminPanel() {
  const [webSeries, setWebSeries] = useState([]);
  const [editingSeries, setEditingSeries] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadWebSeries = async () => {
      const data = await fetchWebSeries();
      setWebSeries(data);
    };
    loadWebSeries();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this web series?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }api/v1/WebSeries/delete-webseries/${id}`
      );
      setWebSeries(webSeries.filter((series) => series._id !== id));
    } catch (error) {
      console.error("Error deleting web series:", error);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/WebSeries/update-webseries/${id}`,
        updatedData
      );
      setWebSeries(
        webSeries.map((series) =>
          series._id === id ? { ...series, ...updatedData } : series
        )
      );
      setEditingSeries(null);
    } catch (error) {
      console.error("Error updating web series:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col text-white">
      <header className="w-full bg-black bg-opacity-10 p-4 flex items-center justify-between shadow-md">
        <h1 className="text-lg font-semibold text-center flex-1">
          Admin Panel
        </h1>
        <div className="flex gap-4">
          <Link to="/home" className=" text-white pt-2.5">
            Home
          </Link>
          <button
            onClick={() => navigate("/add-series")}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
          >
            Add Series
          </button>
        </div>
      </header>

      <div className="p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6">
          Manage Web Series
        </h1>
        <div className="w-full max-w-4xl">
          {webSeries.map((series) => (
            <div
              key={series._id}
              className="mb-6 bg-black bg-opacity-20 p-4 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold">{series.name}</h2>
              <p className="text-gray-300">{series.description}</p>
              <p className="mt-2">
                <strong>Channel:</strong> {series.channel}
              </p>
              <p>
                <strong>Episodes:</strong> {series.episodes}
              </p>
              <p>
                <strong>Genres:</strong> {series.genre.join(", ")}
              </p>
              <p>
                <strong>Rating:</strong> {series.rating}/10
              </p>
              <p>
                <strong>Cast:</strong>{" "}
                {series.cast.map((actor) => actor.actor).join(", ")}
              </p>

              <a
                href={series.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 underline text-lg font-bold block mt-2"
              >
                Watch {series.name} on YouTube
              </a>

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

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setEditingSeries(series)}
                  className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(series._id)}
                  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingSeries && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Update Web Series</h2>

            <label className="block mb-2">Name:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editingSeries.name}
              onChange={(e) =>
                setEditingSeries({ ...editingSeries, name: e.target.value })
              }
            />

            <label className="block mt-2">Description:</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editingSeries.description}
              onChange={(e) =>
                setEditingSeries({
                  ...editingSeries,
                  description: e.target.value,
                })
              }
            />

            <label className="block mt-2">Channel:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editingSeries.channel}
              onChange={(e) =>
                setEditingSeries({ ...editingSeries, channel: e.target.value })
              }
            />

            <label className="block mt-2">Episodes:</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editingSeries.episodes}
              onChange={(e) =>
                setEditingSeries({ ...editingSeries, episodes: e.target.value })
              }
            />

            <label className="block mt-2">Genres:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editingSeries.genre.join(", ")}
              onChange={(e) =>
                setEditingSeries({
                  ...editingSeries,
                  genre: e.target.value.split(","),
                })
              }
            />

            <label className="block mt-2">Rating:</label>
            <input
              type="number"
              step="0.1"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editingSeries.rating}
              onChange={(e) =>
                setEditingSeries({ ...editingSeries, rating: e.target.value })
              }
            />

            <label className="block mt-2">Cast:</label>
            {editingSeries.cast.map((actor, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={actor.actor}
                  onChange={(e) => {
                    let updatedCast = [...editingSeries.cast];
                    updatedCast[index] = { actor: e.target.value };
                    setEditingSeries({ ...editingSeries, cast: updatedCast });
                  }}
                />
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                  onClick={() => {
                    let updatedCast = editingSeries.cast.filter(
                      (_, i) => i !== index
                    );
                    setEditingSeries({ ...editingSeries, cast: updatedCast });
                  }}
                >
                  ✖
                </button>
              </div>
            ))}

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={() =>
                setEditingSeries({
                  ...editingSeries,
                  cast: [...editingSeries.cast, { actor: "" }],
                })
              }
            >
              + Add Cast Member
            </button>

            <label className="block mt-2">YouTube Link:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editingSeries.link}
              onChange={(e) =>
                setEditingSeries({ ...editingSeries, link: e.target.value })
              }
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setEditingSeries(null)}
                className="bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(editingSeries._id, editingSeries)}
                className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full bg-black bg-opacity-10 p-4 text-center text-sm shadow-md">
        © 2025 Admin Panel. All rights reserved.
      </footer>
    </div>
  );
}

export default AdminPanel;
