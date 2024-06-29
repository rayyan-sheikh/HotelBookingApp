import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js
import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailsPage = () => {
  const navigate = useNavigate(); // Access the navigate function to navigate
  const { roomId } = useParams(); // Get room ID from URL parameters
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any errors
  const [checkInDate, setCheckInDate] = useState(null); // State variable for check-in date
  const [checkOutDate, setCheckOutDate] = useState(null); // State variable for check-out date
  const [numAdults, setNumAdults] = useState(1); // State variable for number of adults
  const [numChildren, setNumChildren] = useState(0); // State variable for number of children
  const [totalPrice, setTotalPrice] = useState(0); // State variable for total booking price
  const [totalGuests, setTotalGuests] = useState(1); // State variable for total number of guests
  const [showDatePicker, setShowDatePicker] = useState(false); // State variable to control date picker visibility
  const [userId, setUserId] = useState(''); // Set user id
  const [showMessage, setShowMessage] = useState(false); // State variable to control message visibility
  const [confirmationCode, setConfirmationCode] = useState(''); // State variable for booking confirmation code
  const [errorMessage, setErrorMessage] = useState(''); // State variable for error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };
    fetchData();
  }, [roomId]); // Re-run effect when roomId changes


  const handleConfirmBooking = async () => {
    // Check if check-in and check-out dates are selected
    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select check-in and check-out dates.');
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
      return;
    }

    // Check if number of adults and children are valid
    if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
      setErrorMessage('Please enter valid numbers for adults and children.');
      setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
      return;
    }

    // Calculate total number of days
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    // Calculate total number of guests
    const totalGuests = numAdults + numChildren;

    // Calculate total price
    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    try {

      // Ensure checkInDate and checkOutDate are Date objects
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      // Log the original dates for debugging
      console.log("Original Check-in Date:", startDate);
      console.log("Original Check-out Date:", endDate);

      // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
      const formattedCheckInDate = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      const formattedCheckOutDate = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];


      // Log the original dates for debugging
      console.log("Formated Check-in Date:", formattedCheckInDate);
      console.log("Formated Check-out Date:", formattedCheckOutDate);

      // Create booking object
      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren
      };
      console.log(booking)
      console.log(checkOutDate)

      // Make booking
      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode);
        setShowMessage(true); // 
       
        setTimeout(() => {
          setShowMessage(false);
          navigate('/rooms'); 
        }, 10000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  if (isLoading) {
    return <p className='room-detail-loading'>Loading room details...</p>;
  }

  if (error) {
    return <p className='room-detail-loading'>{error}</p>;
  }

  if (!roomDetails) {
    return <p className='room-detail-loading'>Room not found.</p>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } = roomDetails;

  return (
    <div className="room-details-booking h-auto">
      {showMessage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
        <div className="bg-green-500 rounded-lg overflow-hidden shadow-xl transform translate-y-1/4">
          <div className="p-6">
          <p className="text-white">
          Booking successful! Confirmation code: {confirmationCode}. An SMS and email of your booking details have been sent to you.
        </p>
          </div>
        </div>
      </div>
      
        
      )}
      {errorMessage && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
        <div className="bg-red-700 rounded-lg overflow-hidden shadow-xl transform translate-y-1/4">
          <div className="p-6">
          <p className="text-white">
          {errorMessage}
        </p>
          </div>
        </div>
      </div>
      
        
      )}
      <div className="max-w-4xl mx-auto px-4 py-8">

{/* Room Details */}
<div className="bg-white shadow-md rounded-lg overflow-hidden">
  <h2 className="text-3xl font-semibold text-gray-800 mb-4 px-6">Room Details</h2>
  <div className="relative">
    <div className="overflow-hidden rounded-t-lg">
      <img
        src={roomPhotoUrl}
        alt={roomType}
        className="w-full h-auto object-cover"
        style={{ aspectRatio: '16/9' }}
      />
    </div>
  </div>
  <div className="p-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{roomType}</h3>
    <p className="text-gray-600 mb-2">Price: ${roomPrice} / night</p>
    <p className="text-gray-700">{description}</p>
  </div>
</div>


{/* Existing Bookings */}
{bookings && bookings.length > 0 && (
  <div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
    <h3 className="text-2xl font-semibold text-gray-800 px-6 pt-4">Existing Booking Details</h3>
    <ul className="divide-y divide-gray-200">
      {bookings.map((booking, index) => (
        <li key={booking.id} className="px-6 py-4 flex items-center justify-between">
          <span className="text-gray-800">Booking {index + 1}</span>
          <span className="text-gray-600">Check-in: {booking.checkInDate} | Check-out: {booking.checkOutDate}</span>
        </li>
      ))}
    </ul>
  </div>
)}

{/* Booking Options */}
<div className="bg-white shadow-md rounded-lg overflow-hidden mt-8">
  <div className="p-6">
    <div className="flex items-center justify-between">
      <button className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-300" onClick={() => setShowDatePicker(true)}>Book Now</button>
      <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-300" onClick={() => setShowDatePicker(false)}>Go Back</button>
    </div>

    {/* Date Picker */}
    {showDatePicker && (
      <div className="mt-4">
        <div className="flex items-center justify-center space-x-4">
          <DatePicker
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-black"
            selected={checkInDate}
            onChange={(date) => setCheckInDate(date)}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            placeholderText="Check-in Date"
            dateFormat="dd/MM/yyyy"
          />
          <DatePicker
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-black"
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={checkInDate}
            placeholderText="Check-out Date"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="flex items-center mt-4">
          <div className="flex-1 mr-4">
            <label className="text-gray-700">Adults:</label>
            <input
              type="number"
              min="1"
              value={numAdults}
              onChange={(e) => setNumAdults(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-700">Children:</label>
            <input
              type="number"
              min="0"
              value={numChildren}
              onChange={(e) => setNumChildren(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        <button className="confirm-booking mt-4 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-300" onClick={handleConfirmBooking}>Confirm Booking</button>
      </div>
    )}

    {/* Total Price and Guests */}
    {totalPrice > 0 && (
      <div className="mt-4">
        <div className="text-2xl font-semibold text-gray-800">Booking Summary</div>
        <div className="mt-2 text-gray-700">
          <p>Total Price: ${totalPrice}</p>
          <p>Total Guests: {totalGuests}</p>
        </div>
        <button onClick={acceptBooking} className="accept-booking mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300">Accept Booking</button>
      </div>
    )}

  </div>
</div>

</div>

    </div>
  );
};

export default RoomDetailsPage;