import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="p-6">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Bookings</h2>
  
  <div className="flex items-center space-x-4 mb-4">
    <label className="text-gray-700">Filter by Booking Number:</label>
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Enter booking number"
      className="border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
    />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {currentBookings.map((booking) => (
      <div key={booking.id} className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <p className="text-gray-700"><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
          <p className="text-gray-700"><strong>Check In Date:</strong> {booking.checkInDate}</p>
          <p className="text-gray-700"><strong>Check out Date:</strong> {booking.checkOutDate}</p>
          <p className="text-gray-700"><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none mt-3"
            onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
          >
            Manage Booking
          </button>
        </div>
      </div>
    ))}
  </div>

  <Pagination
    roomsPerPage={bookingsPerPage}
    totalRooms={filteredBookings.length}
    currentPage={currentPage}
    paginate={paginate}
  />
</div>

    );
};

export default ManageBookingsPage;