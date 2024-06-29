import React, { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
import image from "../../assets/ocean-view.jpg";
import ac from "../../assets/ac.jpg";
import minibar from "../../assets/minibar.jpg";
import wifi from "../../assets/wifi.jpg";
import carpark from "../../assets/carpark.jpg";

const HomePage = () => {
  const [roomSearchResults, setRoomSearchResults] = useState([]);

  // Function to handle search results
  const handleSearchResult = (results) => {
    setRoomSearchResults(results);
  };

  return (
    <div className="">
      {/* HEADER / BANNER ROOM SECTION */}
      <section>
        <header className="relative">
          <img
            src={image}
            alt="Oceanview Hotel"
            className="w-full h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 "></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            
            
             
            <h1 className="text-[125px] leading-[100px] font-roboto ">
              Welcome to
            </h1>
            <div className="">
              <h1 className="text-[200px] font-roboto text-teal-300 font-extralight leading-[150px] pb-4">
                Oceanview
              </h1>
            </div>
            <h2 className="font-roboto text-5xl italic">
              Make the Best of your Vacation!
            </h2>
            
               
               
          
          </div>

          

          
        </header>
      </section>

      {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
<div className="flex flex-1 items-center w">
            <RoomSearch handleSearchResult={handleSearchResult} />
          </div>

          <RoomResult roomSearchResults={roomSearchResults} />
      {/* <div className="text-center my-6">
        <h4>
          <a
            className="text-blue-500 hover:underline text-lg font-semibold"
            href="/rooms"
          >
            All Rooms
          </a>
        </h4>
      </div> */}

      <div className="text-center my-12">
        <h2 className="text-3xl font-roboto md:text-4xl font-light">
          Services at <span className="text-teal-500 font-bold italic">Oceanview Hotel</span>
        </h2>
      </div>

      {/* SERVICES SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8 mb-16">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={ac}
            alt="Air Conditioning"
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl text-teal-500 font-semibold">Air Conditioning</h3>
            <p className="text-gray-600 mt-2">
              Stay cool and comfortable throughout your stay with our
              individually controlled in-room air conditioning.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={minibar}
            alt="Mini Bar"
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-teal-500">Mini Bar</h3>
            <p className="text-gray-600 mt-2">
              Enjoy a convenient selection of beverages and snacks stocked in
              your room's mini bar with no additional cost.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={carpark}
            alt="Parking"
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-teal-500">Parking</h3>
            <p className="text-gray-600 mt-2">
              We offer on-site parking for your convenience. Please inquire
              about valet parking options if available.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src={wifi}
            alt="WiFi"
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-teal-500">WiFi</h3>
            <p className="text-gray-600 mt-2">
              Stay connected throughout your stay with complimentary high-speed
              Wi-Fi access available in all guest rooms and public areas.
            </p>
          </div>
        </div>
      </section>

      {/* AVAILABLE ROOMS SECTION */}
      <section></section>
    </div>
  );
};

export default HomePage;
