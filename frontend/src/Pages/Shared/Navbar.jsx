import React, { useContext, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Tspeed.jpg'
import BalanceChecker from '../User/marchantAcc/BalanceChecker';

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Dropdown handlers for desktop
  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 text-white">
      <div className="navbar flex justify-between items-center p-4 lg:px-6">
        {/* Left Side - Logo */}
        <div className="navbar-center lg:navbar-start">
  <a href="/" className="lg:ml-0 ml-48">
    <img src={logo} alt="Company Logo" className="h-16 w-40 lg:h-20 lg:w-48" />
  </a>
</div>

        {/* Center Menu for Desktop */}
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal space-x-6">
            <li><Link to="/">Home</Link></li>
            <li className="relative">
              <button
                onClick={toggleServicesDropdown}
                onBlur={() => setIsServicesDropdownOpen(false)}
                className="py-2 focus:outline-none"
              >
                Services
              </button>
              {isServicesDropdownOpen && (
                <div className="absolute top-full mt-2 w-[400px] bg-white hover:bg-transparent font-medium text-black rounded-lg shadow-lg z-50">
                  <div className="p-4 grid grid-cols-2 gap-2">
                    <Link to="#" className="  p-2 rounded">Express Delivery</Link>
                    <Link to="#" className="  p-2 rounded">Same Day Delivery</Link>
                    <Link to="#" className=" p-2 rounded">International Shipping</Link>
                    <Link to="#" className="  p-2 rounded">Bulk Shipping</Link>
                  </div>
                </div>
              )}
            </li>
            <li><Link to="/branches">Branches</Link></li>
          </ul>
        </div>
        <BalanceChecker user={user} token={token} />


        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <RxHamburgerMenu size={24} />
          </button>
        </div>
        
        {/* Right Side with User Avatar */}
        <div className="navbar-end hidden lg:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 bg-gray-500 text-white font-bold rounded-full flex items-center justify-center"
              >
                {user.username[0].toUpperCase()}
              </button>
              {isUserMenuOpen && (
                <ul
                  className="absolute right-0 mt-2 p-2 shadow-lg bg-gray-700 text-white rounded-lg w-48 z-10"
                  onBlur={() => setIsUserMenuOpen(false)}
                >
                  <li className="px-4 py-2 font-bold">
                    {user.username}
                  </li>
                  <li>
                    <Link to="/userboard/profile" className="block px-4 py-2">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-white">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-700 text-white p-4">
          <ul className="space-y-4">
          <div className="">
          {user ? (
            <li>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 bg-gray-500 text-white font-bold rounded-full flex items-center justify-center"
              >
                {user.username[0].toUpperCase()}
              </button>
              {isUserMenuOpen && (
                <ul
                  className="bg-gray-800 text-white rounded-lg mt-2 space-y-2 p-4 shadow-lg"
                  onBlur={() => setIsUserMenuOpen(false)}
                >
                  <li className="block px-2 py-1 hover:bg-gray-600 rounded">
                    {user.username}
                  </li>
                  <li>
                    <Link to="/userboard/profile" className="block px-2 py-1 hover:bg-gray-600 rounded">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block px-2 py-1 hover:bg-gray-600 rounded">
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <Link to="/login" className="text-white">Login</Link>
          )}
        </div>
            <li><Link to="/">Home</Link></li>
            <li>
              <button
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className="w-full text-left focus:outline-none"
              >
                Services
              </button>
              {isServicesDropdownOpen && (
                <div className="bg-gray-800 text-white rounded-lg mt-2 space-y-2 p-4 shadow-lg">
                  <Link to="#" className="block px-2 py-1 hover:bg-gray-600 rounded">Express Delivery</Link>
                  <Link to="#" className="block px-2 py-1 hover:bg-gray-600 rounded">Same Day Delivery</Link>
                  <Link to="#" className="block px-2 py-1 hover:bg-gray-600 rounded">International Shipping</Link>
                  <Link to="#" className="block px-2 py-1 hover:bg-gray-600 rounded">Bulk Shipping</Link>
                </div>
              )}
            </li>
            <li><Link to="#">Branches</Link></li>
     
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
