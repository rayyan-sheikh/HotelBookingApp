import React from 'react';

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=" my-4">
      <ul className=" flex space-x-2 items-center justify-center ">
        {pageNumbers.map((number) => (
          <li key={number} className="pagination-li">
            <button
              onClick={() => paginate(number)}
              className={`pagination-button py-2 px-4 rounded-md focus:outline-none 
                          ${currentPage === number ? 'bg-teal-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
