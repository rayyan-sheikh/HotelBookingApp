import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';ApiService.js

const EditBookingPage = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccessMessage] = useState(null); 



    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode);
                setBookingDetails(response.booking);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);


    const acheiveBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to Acheive this booking?')) {
            return; 
        }

        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage("The boking was Successfully Acheived")
                
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Detail</h2>
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        
        {bookingDetails && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800">Booking Details</h3>
                <p><strong>Confirmation Code:</strong> {bookingDetails.bookingConfirmationCode}</p>
                <p><strong>Check-in Date:</strong> {bookingDetails.checkInDate}</p>
                <p><strong>Check-out Date:</strong> {bookingDetails.checkOutDate}</p>
                <p><strong>Num Of Adults:</strong> {bookingDetails.numOfAdults}</p>
                <p><strong>Num Of Children:</strong> {bookingDetails.numOfChildren}</p>
                <p><strong>Guest Email:</strong> {bookingDetails.guestEmail}</p>
              </div>
              
              <hr className="my-6" />
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800">Booker Details</h3>
                <p><strong>Name:</strong> {bookingDetails.user.name}</p>
                <p><strong>Email:</strong> {bookingDetails.user.email}</p>
                <p><strong>Phone Number:</strong> {bookingDetails.user.phoneNumber}</p>
              </div>
              
              <hr className="my-6" />
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Room Details</h3>
                <p><strong>Room Type:</strong> {bookingDetails.room.roomType}</p>
                <p><strong>Room Price:</strong> ${bookingDetails.room.roomPrice}</p>
                <p><strong>Room Description:</strong> {bookingDetails.room.roomDescription}</p>
                <img
  src={bookingDetails.room.roomPhotoUrl}
  alt={bookingDetails.room.roomType}
  className="w-full h-auto rounded-lg my-4 max-w-md"
/>
              </div>
              
              <button
                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none mt-6"
                onClick={() => acheiveBooking(bookingDetails.id)}
              >
                Archive Booking
              </button>
            </div>
          </div>
        )}
      </div>
      
    );
};

export default EditBookingPage;