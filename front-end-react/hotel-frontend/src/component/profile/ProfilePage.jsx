import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.getUserProfile();
        // Fetch user bookings using the fetched user ID
        const userPlusBookings = await ApiService.getUserBookings(
          response.user.id
        );
        setUser(userPlusBookings.user);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    ApiService.logout();
    navigate("/home");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className=" ">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto my-8">
  {user && (
    <>
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {user.name}
        </h2>
        <div className="flex justify-between items-center">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          
        </div>
      </div>

      {error && <p className="text-red-500 px-6 mt-4">{error}</p>}

      <div className="p-6 bg-teal-500">
        <h3 className="text-2xl font-bold text-white mb-2">
          My Profile Details
        </h3>
        <p className="text-white mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-white">
          <strong>Phone Number:</strong> {user.phoneNumber}
        </p>
      </div>
    </>
  )}
</div>


      <div className="bg-gray-50 m-3 shadow-md rounded-lg overflow-hidden p-4 mb-6">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            My Booking History
          </h3>
          <div className=" space-y-4">
            {user && user.bookings.length > 0 ? (
              user.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white shadow-md rounded-lg flex p-4 items-start"
                >
                  <img
                    src={booking.room.roomPhotoUrl}
                    alt="Room"
                    className="w-32 h-32 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <p className="text-gray-800 mb-1">
                      <strong>Booking Code:</strong>{" "}
                      {booking.bookingConfirmationCode}
                    </p>
                    <p className="text-gray-800 mb-1">
                      <strong>Check-in Date:</strong> {booking.checkInDate}
                    </p>
                    <p className="text-gray-800 mb-1">
                      <strong>Check-out Date:</strong> {booking.checkOutDate}
                    </p>
                    <p className="text-gray-800 mb-1">
                      <strong>Total Guests:</strong> {booking.totalNumOfGuest}
                    </p>
                    <p className="text-gray-800 mb-2">
                      <strong>Room Type:</strong> {booking.room.roomType}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
