import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddWebSeries() {
  const [form, setForm] = useState({
    name: '',
    channel: '',
    episodes: '',
    genre: [],
    rating: '',
    link: '',
    description: '',
    cast: [''],
  });

  const genresList = ['comedy', 'drama', 'thriller', 'romance', 'romantic comedy', 'family'];

  const handleGenreChange = (selectedGenre) => {
    setForm((prevForm) => {
      const isSelected = prevForm.genre.includes(selectedGenre);
      const updatedGenres = isSelected
        ? prevForm.genre.filter((g) => g !== selectedGenre)
        : [...prevForm.genre, selectedGenre];
      return { ...prevForm, genre: updatedGenres };
    });
  };

  const handleAddCast = () => {
    setForm((prevForm) => ({ ...prevForm, cast: [...prevForm.cast, ''] }));
  };

  const handleCastChange = (index, value) => {
    setForm((prevForm) => {
      const updatedCast = [...prevForm.cast];
      updatedCast[index] = value;
      return { ...prevForm, cast: updatedCast };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col text-white">
      <header className="w-full bg-black bg-opacity-10 p-4 text-center text-lg font-semibold shadow-md">
        Add Web Series
      </header>
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="max-w-md w-full bg-black bg-opacity-10 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center">Add a New Web Series</h2>
          <input type="text" placeholder="Name" className="w-full p-3 mb-4 rounded-lg text-gray-900 placeholder-gray-500 border border-white" />
          <input type="text" placeholder="Channel" className="w-full p-3 mb-4 rounded-lg text-gray-900 placeholder-gray-500 border border-white" />
          <input type="number" placeholder="Episodes" className="w-full p-3 mb-4 rounded-lg text-gray-900 placeholder-gray-500 border border-white" />
          
          <div className="mb-4">
            <p className="text-white mb-2">Genre:</p>
            <div className="flex flex-wrap gap-2">
              {genresList.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreChange(genre)}
                  className={`px-3 py-2 rounded-lg border border-white text-white flex items-center gap-2 ${form.genre.includes(genre) ? 'bg-green-500' : ''}`}
                >
                  {genre} {form.genre.includes(genre) && '✔'}
                </button>
              ))}
            </div>
          </div>

          <input type="number" placeholder="Rating (0-10)" className="w-full p-3 mb-4 rounded-lg text-gray-900 placeholder-gray-500 border border-white" />
          <input type="text" placeholder="Link" className="w-full p-3 mb-4 rounded-lg text-gray-900 placeholder-gray-500 border border-white" />
          <textarea placeholder="Description" className="w-full p-3 mb-4 rounded-lg text-gray-900 placeholder-gray-500 border border-white"></textarea>
          
          <div className="mb-4">
            <p className="text-white mb-2">Cast:</p>
            {form.cast.map((actor, index) => (
              <input
                key={index}
                type="text"
                value={actor}
                onChange={(e) => handleCastChange(index, e.target.value)}
                placeholder="Actor Name"
                className="w-full p-3 mb-2 rounded-lg text-gray-900 placeholder-gray-500 border border-white"
              />
            ))}
            <button onClick={handleAddCast} className="bg-green-500 px-4 py-2 rounded-lg mt-2">
              + Add Cast
            </button>
          </div>
          
          <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg w-full font-semibold shadow-md hover:bg-yellow-500">
            Add Series
          </button>
          <p className="mt-4 text-center"><Link to="/home" className="text-yellow-300">Back to Home</Link></p>
        </div>
      </div>
    </div>
  );
}

export default AddWebSeries;