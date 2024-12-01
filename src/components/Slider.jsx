import React, { useState, useEffect } from "react";
import "../index.css";
import Loader from "./Loader";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [arr, setArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // const getData = async () => {
  //   await fetch("https://my-json-server.typicode.com/nileshkr17/api-bookmyshowSELF/movies", {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setArr(data);
  //       setIsLoading(false); // Set loading state to false once data is fetched
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     goToNextSlide();
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [currentSlide]);

  const moviesData = [
    {
      id: 1,
      title: "Movie 1",
      imageUrl:
        "https://www.livemint.com/lm-img/img/2024/11/04/600x338/GbCJ_1730179557968_1730683155678.jfif",
      details:
        "This is the first movie in the list. It has an exciting plot and features an amazing cast.",
      trailerUrl: "https://example.com/trailer1",
    },
    {
      id: 2,
      title: "Movie 2",
      imageUrl:
        "https://static.tnn.in/thumb/msid-113692995,thumbsize-1869280,width-1280,height-720,resizemode-75/113692995.jpg?quality=100",
      details:
        "The second movie is a thrilling adventure with breathtaking visuals.",
      trailerUrl: "https://example.com/trailer2",
    },
    {
      id: 3,
      title: "Movie 3",
      imageUrl:
        "https://images.ottplay.com/images/bloody-daddy-trailer-112.jpg?impolicy=ottplay-20210210&width=1200&height=675",
      details:
        "A captivating story of heroism and sacrifice. This movie is sure to impress.",
      trailerUrl: "https://example.com/trailer3",
    },
    {
      id: 4,
      title: "Movie 4",
      imageUrl:
        "https://i.ytimg.com/vi/LA2O1Le1YBE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCaKn0zoNevdrukn7BCvHBgPdnhmA",
      details:
        "A fascinating documentary that sheds light on lesser-known stories.",
      trailerUrl: "https://example.com/trailer4",
    },
  ];

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading state to false after delay
    }, 1000); // Delay for 1 second

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNextSlide();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlide]);

  // const goToNextSlide = () => {
  //   setCurrentSlide((prevSlide) =>
  //     prevSlide === arr.length - 1 ? 0 : prevSlide + 1
  //   );
  // };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % moviesData.length);
  };

  if (isLoading) {
    return <Loader />;
  }

  // return (
  //   <div className="relative w-full h-80 lg:h-96 z-10">
  //     <div className="absolute inset-0 bg-black bg-opacity-50 blur"></div>
  //     <div className="max-w-[1240px] mx-auto h-full">
  //       <div className="relative w-full h-full flex items-center justify-center">
  //         <img
  //           src={arr[currentSlide].imageUrl}
  //           alt={arr[currentSlide].title}
  //           className="object-cover max-h-full max-w-full transition-opacity duration-500"
  //         />
  //         <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
  //           <div className="text-center rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black">
  //             <h2 className="text-lg font-bold text-white">
  //               {arr[currentSlide].title}
  //             </h2>
  //             <div className="sm:mx-10 md:mx-40 lg:mx-40">
  //               <p className="text-sm text-white mt-2 px-4 text-center ">
  //                 {arr[currentSlide].details}
  //               </p>
  //             </div>
  //             <a
  //               href={arr[currentSlide].trailerUrl}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="inline-block mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
  //             >
  //               Play Trailer
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="relative w-full h-80 lg:h-96 z-10">
      <div className="absolute inset-0 bg-black bg-opacity-50 blur"></div>
      <div className="max-w-[1240px] mx-auto h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={moviesData[currentSlide]?.imageUrl}
            alt={moviesData[currentSlide]?.title}
            className="object-cover max-h-full max-w-full transition-opacity duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="text-center rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-black">
              <h2 className="text-lg font-bold text-white">
                {moviesData[currentSlide]?.title}
              </h2>
              <div className="sm:mx-10 md:mx-40 lg:mx-40">
                <p className="text-sm text-white mt-2 px-4 text-center ">
                  {moviesData[currentSlide]?.details}
                </p>
              </div>
              <a
                href={moviesData[currentSlide]?.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Play Trailer
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
