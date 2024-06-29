import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";


function Navbar() {
  const isAuthenticated = ApiService.isAuthenticated();
  const isAdmin = ApiService.isAdmin();
  const isUser = ApiService.isUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    const isLogout = window.confirm(
      "Are you sure you want to logout this user?"
    );
    if (isLogout) {
      ApiService.logout();
      navigate("/home");
    }
  };

  return (
    <nav className="relative bg-white shadow">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <NavLink to="/home" className="text-3xl italic text-teal-600 font-roboto font-light">Oceanview Hotel</NavLink>
        </div>
        <div className="">
          <ul className="flex text-xl font-roboto">
            <li className="mx-2">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? 'text-white bg-teal-500 py-6 px-3 font-bold' : 'text-gray-700 hover:text-teal-500'
                }
              >
                Home
              </NavLink>
            </li>
            <li className="mx-2">
              <NavLink
                to="/rooms"
                className={({ isActive }) =>
                  isActive ? 'text-white bg-teal-500 py-6 px-3 font-bold' : 'text-gray-700 hover:text-teal-500'
                }
              >
                Rooms
              </NavLink>
            </li>
            <li className="mx-2">
              <NavLink
                to="/find-booking"
                className={({ isActive }) =>
                  isActive ? 'text-white bg-teal-500 py-6 px-3  font-bold' : 'text-gray-700 hover:text-teal-500'
                }
              >
                Find my Booking
              </NavLink>
            </li>

            {isUser && (
              <li className="mx-2">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? 'text-white bg-teal-500 py-6 px-3  font-bold' : 'text-gray-700 hover:text-teal-500'
                  }
                >
                  Profile
                </NavLink>
              </li>
            )}
            {isAdmin && (
              <li className="mx-2">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? 'text-white bg-teal-500 py-6 px-3  font-bold' : 'text-gray-700 hover:text-teal-500'
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}

            {!isAuthenticated && (
              <>
                <li className="mx-2">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? 'text-white bg-teal-500 py-6 px-3  font-bold' : 'text-gray-700 hover:text-teal-500'
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li className="mx-2">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? 'text-white bg-teal-500 py-6 px-3  font-bold' : 'text-gray-700 hover:text-teal-500'
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li className="mx-2">
                <button onClick={handleLogout} className="text-teal-500 font-bold px-3  hover:text-teal-600">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
