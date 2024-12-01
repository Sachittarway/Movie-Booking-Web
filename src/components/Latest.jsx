import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Latest = () => {
  const [arr, setArr] = useState([]);
  /*getdata*/
  const getData = async () => {
    await fetch("http://localhost:4000/movies/allmovies", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setArr(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  //   const moviesData = [
  //     {
  //       id: 1,
  //       title: "Latest Movie 1",
  //       imageUrl:
  //         "https://m.media-amazon.com/images/M/MV5BN2IyNTcxY2UtMTJkMS00Nzg1LWEyMmItN2M1NDQzYWY5Y2YzXkEyXkFqcGc@._V1_.jpg",
  //       rating: 4.5,
  //       details:
  //         "An amazing journey of friendship and adventure, perfect for all audiences.",
  //     },
  //     {
  //       id: 2,
  //       title: "Latest Movie 2",
  //       imageUrl:
  //         "https://upload.wikimedia.org/wikipedia/en/9/9c/Yudhra_film_poster.jpg",
  //       rating: 4.7,
  //       details:
  //         "A heartwarming story with unforgettable characters and breathtaking visuals.",
  //     },
  //     {
  //       id: 3,
  //       title: "Latest Movie 3",
  //       imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/a1/Stree_2.jpg",
  //       rating: 4.3,
  //       details:
  //         "A thrilling experience that will keep you on the edge of your seat.",
  //     },
  //     {
  //       id: 4,
  //       title: "Latest Movie 4",
  //       imageUrl:
  //         "data:image/jpeg;base64,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",
  //       rating: 4.6,
  //       details:
  //         "A cinematic masterpiece that explores the complexities of human emotions.",
  //     },
  //     {
  //       id: 5,
  //       title: "Latest Movie 5",
  //       imageUrl:
  //         "https://i.pinimg.com/736x/3c/32/b7/3c32b7b5a163f8c0a4779c0ee270f16a.jpg",
  //       rating: 4.8,
  //       details:
  //         "An action-packed film with stunning effects and a powerful storyline.",
  //     },
  //     {
  //       id: 6,
  //       title: "Latest Movie 6",
  //       imageUrl:
  //         "https://m.media-amazon.com/images/I/71brG9+L5rL._AC_UF1000,1000_QL80_.jpg",
  //       rating: 4.2,
  //       details: "A fascinating documentary shedding light on untold stories.",
  //     },
  //   ];

  // Use the local JSON data as initial state
  //   const [arr, setArr] = useState(moviesData);

  return (
    <div className="bg-black w-full min-h-screen pt-10 text-white pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="sm:text-3xl md:text-4xl lg:text-5xl font-bold pb-10 text-white">
          Latest Movies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {arr.map((movie) => {
            return (
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
                  <p className="text-white text-lg font-bold">{movie.title}</p>
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Latest;
