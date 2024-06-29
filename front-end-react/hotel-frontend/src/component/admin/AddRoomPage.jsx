import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';


const AddRoomPage = () => {
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const [newRoomType, setNewRoomType] = useState(false);


    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error fetching room types:', error.message);
            }
        };
        fetchRoomTypes();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleRoomTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewRoomType(true);
            setRoomDetails(prevState => ({ ...prevState, roomType: '' }));
        } else {
            setNewRoomType(false);
            setRoomDetails(prevState => ({ ...prevState, roomType: e.target.value }));
        }
    };


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };


    const addRoom = async () => {
        if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
            setError('All room details must be provided.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('Do you want to add this room?')) {
            return
        }

        try {
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.addRoom(formData);
            if (result.statusCode === 200) {
                setSuccess('Room Added successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Room</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <div className="edit-room-form">
            <div className="form-group mb-4">
              {preview ? (
                <img src={preview} alt="Room Preview" className="w-full h-auto mb-4 rounded-lg" />
              ) : (
                <div className="w-full h-40 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Upload room photo</span>
                </div>
              )}
              <input
                type="file"
                name="roomPhoto"
                onChange={handleFileChange}
                className="hidden"
                id="roomPhotoInput"
              />
              <label
                htmlFor="roomPhotoInput"
                className="block text-teal-500 cursor-pointer mt-2"
              >
                Choose a file
              </label>
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-700">Room Type</label>
              <select
                value={roomDetails.roomType}
                onChange={handleRoomTypeChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg"
              >
                <option value="">Select a room type</option>
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
                <option value="new">Other (please specify)</option>
              </select>
              {newRoomType && (
                <input
                  type="text"
                  name="roomType"
                  placeholder="Enter new room type"
                  value={roomDetails.roomType}
                  onChange={handleChange}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg mt-2"
                />
              )}
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-700">Room Price</label>
              <input
                type="text"
                name="roomPrice"
                value={roomDetails.roomPrice}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="form-group mb-4">
              <label className="block text-gray-700">Room Description</label>
              <textarea
                name="roomDescription"
                value={roomDetails.roomDescription}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg"
              ></textarea>
            </div>
            <button
              className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onClick={addRoom}
            >
              Add Room
            </button>
          </div>
        </div>
      </div>
    );
};

export default AddRoomPage;