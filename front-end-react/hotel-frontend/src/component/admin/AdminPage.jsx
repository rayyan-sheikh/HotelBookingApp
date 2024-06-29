import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        <div className="flex items-start pt-16 justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome, {adminName}</h1>
        <div className="flex justify-between">
          <button
            className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg mr-4 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={() => navigate('/admin/manage-rooms')}
          >
            Manage Rooms
          </button>
          <button
            className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg ml-4 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={() => navigate('/admin/manage-bookings')}
          >
            Manage Bookings
          </button>
        </div>
      </div>
    </div>
    );
}

export default AdminPage;