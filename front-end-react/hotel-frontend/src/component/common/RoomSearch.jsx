import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';

const RoomSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);
  const [error, setError] = useState('');

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

  
  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, timeout);
  };

  
  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError('Please select all fields');
      return false;
    }
    try {
      
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;
      
      const response = await ApiService.getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);

     
      if (response.statusCode === 200) {
        if (response.roomList.length === 0) {
          showError('Room not currently available for this date range on the selected rom type.');
          return
        }
        handleSearchResult(response.roomList);
        setError('');
      }
    } catch (error) {
      showError("Unown error occured: " + error.response.data.message);
    }
  };

  return (
    <section className="bg-gray-100 py-8 w-full">
  <div className="mx-auto px-4">
    <div className=" shadow-md bg-white rounded-lg p-6 flex flex-wrap items-center justify-center space-y-4 md:space-y-0">
      <div className='flex w-[60%] justify-center gap-6'>
      <div className=" ">
        
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Check-in Date"
          className="w-full px-8 py-3 border-2  focus:outline-none focus:ring-2 placeholder:text-black placeholder:font-roboto focus:ring-teal-500 border-teal-500 placeholder:text-l rounded-lg"
        />
      </div>
      <div className=" ">
        
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Check-out Date"
          className="w-full px-8 py-3 border-2 border-teal-500 placeholder:text-l placeholder:text-black placeholder:font-roboto  focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg"
        />
      </div>
      <div className=" ">
        
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="w-full px-8 py-3 border-teal-500 border-2 focus:outline-none focus:ring-2 focus:ring-teal-500 font-roboto rounded-lg text-black"
        >
          <option disabled value="" >
            Select Room Type
          </option>
          {roomTypes.map((roomType) => (
            <option key={roomType} value={roomType}>
              {roomType}
            </option>
          ))}
        </select>
      </div>
      </div>
      <div className="flex justify-center  flex-1">
        <button
          className="w-[90%] h-[80%] bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 font-roboto text-2xl"
          onClick={handleInternalSearch}
        >
          Search Rooms
        </button>
      </div>
    </div>
    {error && <p className="text-red-500 mt-4">{error}</p>}
  </div>
</section>


  );
};

export default RoomSearch;