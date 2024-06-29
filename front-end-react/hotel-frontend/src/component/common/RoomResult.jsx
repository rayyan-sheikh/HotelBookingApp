import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../service/ApiService';

const RoomResult = ({ roomSearchResults }) => {
    const navigate = useNavigate(); 
    const isAdmin = ApiService.isAdmin();
    return (
        <section className="room-results bg-gray-100 py-8">
  {roomSearchResults && roomSearchResults.length > 0 && (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomSearchResults.map((room) => (
          <div key={room.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={room.roomPhotoUrl} alt={room.roomType} />
            <div className="p-4">
              <h3 className="text-xl font-semibold font-roboto text-gray-800 mb-2">{room.roomType}</h3>
              <p className="text-gray-700 mb-2 font-roboto font-semibold">Price: ${room.roomPrice} / night</p>
              <p className="text-gray-700 mb-4 font-roboto">Description: {room.roomDescription}</p>

              <div className="flex justify-end">
                {isAdmin ? (
                  <button
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={() => navigate(`/admin/edit-room/${room.id}`)}
                  >
                    Edit Room
                  </button>
                ) : (
                  <button
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={() => navigate(`/room-details-book/${room.id}`)}
                  >
                    View/Book Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</section>

    );
}

export default RoomResult;