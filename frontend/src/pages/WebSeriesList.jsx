import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

function WebSeriesList() {
  const [webSeries, setWebSeries] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadWebSeries = async () => {
      const data = await fetchWebSeries();
      setWebSeries(data);
    };
    loadWebSeries();
  }, []);

  const handleCommentChange = (index, value) => {
    setNewComment({ ...newComment, [index]: value });
  };

  const handleCommentSubmit = (index) => {
    if (!newComment[index]) return;
    setComments({
      ...comments,
      [index]: [...(comments[index] || []), newComment[index]],
    });
    setNewComment({ ...newComment, [index]: "" });
  };

  const handleCommentDelete = (seriesIndex, commentIndex) => {
    setComments({
      ...comments,
      [seriesIndex]: comments[seriesIndex].filter((_, i) => i !== commentIndex),
    });
  };

  const filteredWebSeries = webSeries.filter((series) =>
    series.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col text-white">
      <header className="w-full bg-black bg-opacity-10 p-4 flex flex-col items-center shadow-md">
        <h1 className="text-lg font-semibold text-center">
          Must-Watch Telugu Web Series
        </h1>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <Link to="/admin" className="hover:underline">
            Admin Panel
          </Link>
          <Link to="/profile" className="hover:underline">
            Profile
          </Link>
          <button className="hover:underline">Logout</button>
        </div>
      </header>

      <div className="p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-6">
          Discover Amazing Web Series
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-2xl p-2 mb-6 rounded-md text-black shadow-md placeholder-gray-700"
          placeholder="Search for a web series..."
        />

        <div className="w-full max-w-4xl">
          {filteredWebSeries.map((series, index) => (
            <div
              key={index}
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
                <strong>Cast:</strong> {series.cast.map((actor) => actor.actor).join(", ")}
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

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Comments</h3>
                <div className="mt-2">
                  {comments[index] &&
                    comments[index].map((comment, i) => (
                      <div
                        key={i}
                        className="text-white bg-gray-800 bg-opacity-40 p-2 rounded-md mb-2 flex justify-between"
                      >
                        <span>{comment}</span>
                        <button
                          onClick={() => handleCommentDelete(index, i)}
                          className="text-red-400 hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
                <input
                  type="text"
                  value={newComment[index] || ""}
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                  className="w-full p-2 rounded-md text-white mt-2"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={() => handleCommentSubmit(index)}
                  className="mt-2 bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
                >
                  Post Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="w-full bg-black bg-opacity-10 p-4 text-center text-sm shadow-md">
        © 2025 Must-Watch Telugu Web Series. All rights reserved.
      </footer>
    </div>
  );
}

export default WebSeriesList;
