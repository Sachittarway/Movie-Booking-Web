import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import { useAuth0 } from "@auth0/auth0-react";
import "../pages/Buy.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const seats = Array.from({ length: 8 * 8 }, (_, i) => i + 1); // Seat numbers 1-64

export default function Buy() {
  const { isAuthenticated, user } = useAuth0();
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [currentMovie, setCurrentMovie] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      setCustomerName(user?.name || "");
    }
  }, [isAuthenticated, user]);

  const handleSelectedState = (seat) => {
    if (selectedSeats.includes(seat)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < 4) {
      // Select the seat if fewer than 4 are selected
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getMovieInfo = async (id) => {
    const url = `http://localhost:4000/movies/movie/${id}`;
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }
    const data = await response.json();
    setCurrentMovie(data);
  };
  const uniqueDates = [
    ...new Set(currentMovie?.showtimes?.map((showtime) => showtime.date)),
  ];

  useEffect(() => {
    const showtime = currentMovie?.showtimes?.find(
      (show) => show.date === selectedDate && show.time === selectedTime
    );
    setOccupiedSeats(showtime ? showtime.occupiedSeats : []);
  }, [selectedDate, selectedTime, currentMovie]);
  console.log("currentMovie", currentMovie);
  console.log("uniqueDates", uniqueDates);
  console.log("selectedDate", selectedDate);
  console.log("selectedTime", selectedTime);
  console.log("selected seat", selectedSeats);
  useEffect(() => {
    getMovieInfo(id);
  }, [id]);

  const buyTckets = async () => {
    try {
      const response = await fetch("http://localhost:4000/movies/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId: currentMovie.id,
          date: selectedDate,
          time: selectedTime,
          selectedSeats,
          userEmail: user?.email,
          userName: user?.name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Booking successful!");
        // Optionally refresh data or navigate to a confirmation page
      } else {
        alert(data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };
  return (
    <>
      {Object.keys(currentMovie).length ? (
        //  map in the object
        <div
          className="flex gap-5 p-6 h-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${currentMovie.imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className=" rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black mt-40 pl-6 pb-4 "
            style={{ width: "70%" }}
          >
            <h3 className="text-4xl font-bold text-white">
              {currentMovie.title}
            </h3>
            <div className="flex gap-2 mt-3">
              <h3>
                <span className="text-slate-500"></span>
              </h3>
            </div>
            <p className="text-white mt-15 leading-[1.5rem]">
              {currentMovie.details}
            </p>
            {/* button to buy tickets*/}
            <a
              href={currentMovie.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Play Trailer
            </a>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <div className="parent grid justify-center mx-auto my-10">
        <div className="child1 p-4 ">
          {isAuthenticated ? (
            <div className="Movies mb-6"></div>
          ) : (
            <p>Please log in to book a ticket.</p>
          )}

          {/* Display seat selection */}
          <ul className="ShowCase flex justify-center bg-gray-800 py-3 rounded text-gray-500">
            <li className="mx-2">
              <span className="seat selected" /> <small>Selected</small>
            </li>
            <li className="mx-2">
              <span className="seat occupied" /> <small>Occupied</small>
            </li>
          </ul>
          <div className="Cinema mb-6">
            <div className="screen bg-white h-12 w-full transform rotate-x-12 scale-110 rounded-lg shadow-md mb-4" />
            <div className="seats grid grid-cols-8 gap-2">
              {seats.map((seat) => {
                const isSelected = selectedSeats.includes(seat);
                const isOccupied = occupiedSeats.includes(seat);
                const isDisabled =
                  !selectedTime || (selectedSeats.length >= 4 && !isSelected);

                return (
                  <span
                    tabIndex="0"
                    key={seat}
                    className={clsx(
                      "seat",
                      isSelected && "selected",
                      isOccupied && "occupied",
                      isDisabled && "disabled"
                    )}
                    onClick={() =>
                      !isOccupied && !isDisabled && handleSelectedState(seat)
                    }
                    role="button"
                    aria-disabled={isOccupied || isDisabled}
                    aria-label={`Seat ${seat}`}
                  ></span>
                );
              })}
            </div>
          </div>

          <div className="showtime-selector mt-6">
            <label className="block mb-2 text-lg font-semibold">
              Select Date
            </label>
            <div className="date-buttons flex gap-2 mb-4">
              {uniqueDates.map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                    setOccupiedSeats([]);
                  }}
                  className={`p-2 rounded ${
                    selectedDate === date
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            {selectedDate && (
              <>
                <label className="block mb-2 text-lg font-semibold">
                  Select Time
                </label>
                <div className="time-buttons flex gap-2">
                  {currentMovie?.showtimes
                    .filter((showtime) => showtime.date === selectedDate)
                    .map((showtime, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(showtime.time)}
                        className={`p-2 rounded ${
                          selectedTime === showtime.time
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {showtime.time}
                      </button>
                    ))}
                </div>
              </>
            )}
          </div>
          <div className="CustomerDetails mt-6">
            <label htmlFor="customerName" className="block mb-2">
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          {isAuthenticated && (
            <button
              className={clsx(
                "confirm-button",
                selectedSeats.length === 0 && "disabled",
                "py-2 px-4 mt-10 rounded bg-blue-500 text-white hover:bg-blue-600"
              )}
              disabled={selectedSeats.length === 0 || selectedSeats.length > 4}
              onClick={() => {
                buyTckets();
              }}
            >
              Confirm Booking
            </button>
          )}
        </div>
      </div>
    </>
  );
}
