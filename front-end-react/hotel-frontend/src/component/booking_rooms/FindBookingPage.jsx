import React, { useState } from "react";
import ApiService from "../../service/ApiService";

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState(""); 
  const [bookingDetails, setBookingDetails] = useState(null); 
  const [error, setError] = useState(null); 

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      setError("Please Enter a booking confirmation code");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      
      const response = await ApiService.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);
      setError(null); 
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="find-booking-page flex flex-col justify-start items-center  h-[88vh]">
      <div className="search-container flex items-center w-[35%] border border-gray-300 rounded-lg overflow-hidden shadow-sm my-4">
        <input
          required
          type="text"
          placeholder="Enter your booking confirmation code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          className="w-full px-4 py-2 bg-white focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-teal-500 text-white px-4 py-2 hover:bg-teal-600 focus:outline-none"
        >
          Find
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookingDetails && (
        <div className="flex flex-col items-center space-y-4">

        {/* Booking Details Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xl">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-teal-500">Booking Details</h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Confirmation Code:</span>{" "}
                {bookingDetails.bookingConfirmationCode}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Check-in Date:</span>{" "}
                {bookingDetails.checkInDate}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Check-out Date:</span>{" "}
                {bookingDetails.checkOutDate}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Num Of Adults:</span>{" "}
                {bookingDetails.numOfAdults}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Num Of Children:</span>{" "}
                {bookingDetails.numOfChildren}
              </p>
            </div>
          </div>
        </div>
      
        {/* Booker Details Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xl">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-teal-500">Booker Details</h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span>{" "}
                {bookingDetails.user.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                {bookingDetails.user.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Phone Number:</span>{" "}
                {bookingDetails.user.phoneNumber}
              </p>
            </div>
          </div>
        </div>
      
        {/* Room Details Card */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xl">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 text-teal-500">Room Details</h3>
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={bookingDetails.room.roomPhotoUrl}
                  alt={bookingDetails.room.roomType}
                  className="h-24 w-24 object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Room Type:</span>{" "}
                  {bookingDetails.room.roomType}
                </p>
              </div>
            </div>
          </div>
        </div>
      
      </div>
      
      )}
    </div>
  );
};

export default FindBookingPage;
