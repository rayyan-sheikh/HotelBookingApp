import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditRoomPage = () => {
    const { roomId } = useParams();
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

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails({
                    roomPhotoUrl: response.room.roomPhotoUrl,
                    roomType: response.room.roomType,
                    roomPrice: response.room.roomPrice,
                    roomDescription: response.room.roomDescription,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
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


    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateRoom(roomId, formData);
            if (result.statusCode === 200) {
                setSuccess('Room updated successfully.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Do you want to delete this room?')) {
            try {
                const result = await ApiService.deleteRoom(roomId);
                if (result.statusCode === 200) {
                    setSuccess('Room Deleted successfully.');
                    
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-rooms');
                    }, 3000);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Room</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && 
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
        <div className="bg-green-500 rounded-lg overflow-hidden shadow-xl transform translate-y-1/4">
          <div className="p-6">
          <p className="text-white">{success}</p>
          </div>
        </div>
      </div>
        }
        <div className="edit-room-form">
          <div className="form-group mb-4">
            {preview ? (
              <img src={preview} alt="Room Preview" className="w-full h-auto mb-4 rounded-lg" />
            ) : (
              roomDetails.roomPhotoUrl && (
                <img src={roomDetails.roomPhotoUrl} alt="Room" className="w-full h-auto mb-4 rounded-lg" />
              )
            )}
            <input
              type="file"
              name="roomPhoto"
              onChange={handleFileChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700">Room Type</label>
            <input
              type="text"
              name="roomType"
              value={roomDetails.roomType}
              onChange={handleChange}
              className="w-full py-2 px-4 border border-gray-300 rounded-lg"
            />
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
          <div className="flex justify-between">
            <button
              className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onClick={handleUpdate}
            >
              Update Room
            </button>
            <button
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleDelete}
            >
              Delete Room
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default EditRoomPage;