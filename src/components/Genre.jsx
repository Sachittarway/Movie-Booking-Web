import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { FaGithub } from "react-icons/fa";

const Search = () => {
  // const [movies, setMovies] = useState([]);
  // const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // const getData = async () => {
  //   await fetch(
  //     "https://my-json-server.typicode.com/nileshkr17/api-bookmyshowSELF/movies"
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMovies(data);
  //       setFilteredMovies(data);
  //       setIsLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const moviesData = [
    {
      id: 1,
      title: "Movie 1",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BN2IyNTcxY2UtMTJkMS00Nzg1LWEyMmItN2M1NDQzYWY5Y2YzXkEyXkFqcGc@._V1_.jpg",
      rating: 4.5,
      genre: "Action",
      details: "An action-packed thriller with breathtaking scenes.",
    },
    {
      id: 2,
      title: "Movie 2",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/9/9c/Yudhra_film_poster.jpg",
      rating: 4.7,
      genre: "Drama",
      details: "A heartwarming drama that explores complex relationships.",
    },
    {
      id: 3,
      title: "Movie 3",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/a1/Stree_2.jpg",
      rating: 4.2,
      genre: "Action",
      details: "A fast-paced adventure with a gripping storyline.",
    },
    {
      id: 4,
      title: "Movie 4",
      imageUrl:
        "https://i.pinimg.com/736x/3c/32/b7/3c32b7b5a163f8c0a4779c0ee270f16a.jpg",
      rating: 4.8,
      genre: "Comedy",
      details: "A hilarious comedy that will leave you in splits.",
    },
  ];
  const [movies, setMovies] = useState(moviesData);
  const [filteredMovies, setFilteredMovies] = useState(moviesData);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  if (isLoading) {
    return <Loader />; // Replace with your loader component or content
  }

  const genres = [...new Set(movies.map((movie) => movie.genre))];

  return (
    <div className="bg-black w-full min-h-screen pt-10 text-white pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="sm:text-3xl md:text-4xl lg:text-5xl font-bold pb-10 text-white">
          {" "}
          Movies Genre
        </h2>
        <p className="text-white text-center">
          Contribute to our API:
          <a
            href="https://my-json-server.typicode.com/nileshkr17/api-bookmyshowSELF"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="inline m-2 text-2xl" />
          </a>
        </p>

        {genres.map((genre) => (
          <div key={genre} className="genre-container " data-genre={genre}>
            <h3 className="text-2xl font-bold text-white mt-10 mb-4">
              {genre}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMovies
                .filter((movie) => movie.genre === genre)
                .map((movie) => (
                  <div
                    key={movie.id}
                    className="relative group overflow-hidden border-r border-b border-red-700 rounded-md cursor-pointer"
                  >
                    <div className="flex justify-center items-center">
                      <img
                        src={movie.imageUrl}
                        alt="Latest movie"
                        className="object-contain h-60 sm:h-80 md:h-30 lg:h-30 transition-opacity duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                      <p className="text-white text-lg font-bold">
                        {movie.title}
                      </p>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">&#9733;</span>
                        <span className="text-white">{movie.rating}</span>
                      </div>
                      <p className="text-white mt-2 px-4 text-center">
                        {movie.details}
                      </p>
                      <Link to={`/movies/${movie.id}`}>
                        <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md">
                          Go to Movie
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;