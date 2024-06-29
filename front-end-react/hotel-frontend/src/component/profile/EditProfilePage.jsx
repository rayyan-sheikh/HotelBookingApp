import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className=" shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto my-8">
  <div className="p-6 border-b bg-teal-500">
    <h2 className="text-2xl font-semibold text-white mb-4">Edit Profile</h2>
    {error && <p className="text-red-500">{error}</p>}
  </div>
  
  {user && (
    <div className="p-6">
      <div className="mb-4">
        <p className="text-gray-700 mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Phone Number:</strong> {user.phoneNumber}
        </p>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
        onClick={handleDeleteProfile}
      >
        Delete Profile
      </button>
    </div>
  )}
</div>

    );
};

export default EditProfilePage;