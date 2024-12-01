import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";
import "../pages/Ticket.css";
import { useAuth0 } from "@auth0/auth0-react";
const Ticket = () => {
  const ticketRef = useRef();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth0();
  useEffect(() => {
    fetchTickets();
  }, [user]);
  const fetchTickets = async () => {
    try {
      const response = await fetch("http://localhost:4000/movies/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: user.email }),
      });
      const data = await response.json();
      setTicket(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets: ", error);
    }
  };

  console.log("ticket", ticket);

  const downloadTicket = () => {
    html2canvas(ticketRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "ticket.png";
      link.click();
    });
  };

  const storedCustomerName = JSON.parse(localStorage.getItem("customerName"));
  const storedMovieName = JSON.parse(localStorage.getItem("movieName")) || "";
  const storedTime = JSON.parse(localStorage.getItem("time"))?.slice(0, 21);
  const storedSeatNumber = JSON.parse(localStorage.getItem("seatNumber"));

  const seatNumbers = storedSeatNumber
    ? storedSeatNumber.split(",").map(Number)
    : [];

  // Generate a random code value (can be replaced with the actual ticket information)
  const codeValue = Math.random().toString(36).substr(2, 10);

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center justify-center h-screen">
          <div className="ticket-container w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 sm:mt-[10rem]">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {ticket && ticket.length > 0 ? (
                  ticket.map((ticket, index) => (
                    <>
                      <div className="ticket" ref={ticketRef}>
                        <div className="card card-left w-full sm:w-72 md:w-96">
                          <h1 className="text-xl font-bold">Movie Cinema</h1>
                          <div className="title">
                            <h2 className="text-sm text-gray-600">
                              {ticket?.movieTitle}
                            </h2>
                            <span className="text-xs text-gray-500">Movie</span>
                          </div>
                          <div className="name">
                            <h2 className="text-sm text-gray-600">
                              {user?.given_name}
                            </h2>
                            <span className="text-xs text-gray-500">
                              Customer
                            </span>
                          </div>
                          <div className="time">
                            <h2 className="text-sm text-gray-600">
                              {ticket?.date} - {ticket?.time}
                            </h2>
                          </div>
                        </div>

                        <div className="card card-right w-24 sm:w-32">
                          <div className="eye"></div>
                          <div className="number">
                            <h5 className="font-bold">
                              {ticket?.seats?.map((seatNumber, index) => (
                                <span
                                  key={index}
                                  className="seat-number text-black"
                                >
                                  {seatNumber}
                                </span>
                              ))}
                            </h5>
                            <span className="text-xs mt-9 text-gray-700">
                              Seat number{ticket?.seats?.length > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={downloadTicket}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                      >
                        Download Ticket
                      </button>
                    </>
                  ))
                ) : (
                  <h1 className="text-3xl font-bold text-gray-800">
                    No tickets found
                  </h1>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-3xl font-bold text-gray-800 text-center mt-10">
            Please login to view your tickets
          </h1>
        </div>
      )}
    </>
  );
};

export default Ticket;
