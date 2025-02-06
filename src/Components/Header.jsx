import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSaveUser = () => {
    navigate("/add-employee");
    setIsMenuOpen(false);
  };

  const handleUser = () => {
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-lg py-4 sticky top-0 z-50">
        <div className="mx-auto flex items-center justify-between px-4">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center text-primary hover:text-secondary"
          >
            <svg
              className="h-8 w-8 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707.707m12.728 0l.707.707M6.343 17.657l.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-2xl font-bold">MyBrand</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 hover:text-primary focus:outline-none transition-colors duration-300"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li
                className="hover:text-primary transition-colors duration-300 text-[1.2rem] font-medium cursor-pointer"
                onClick={handleUser}
              >
                Users
              </li>
              <li
                className="hover:text-primary transition-colors duration-300 text-[1.2rem] font-medium cursor-pointer"
                onClick={handleSaveUser}
              >
                New Employee
              </li>
            </ul>
          </nav>
        </div>

       
        <nav
          className={`md:hidden fixed inset-y-0 left-0 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-end mb-4 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Menu Links */}
            <ul className="space-y-4">
              <li
                className="text-gray-800 hover:text-primary transition-colors duration-300 text-lg font-medium cursor-pointer"
                onClick={handleUser}
              >
                Users
              </li>
              <li
                className="text-gray-800 hover:text-primary transition-colors duration-300 text-lg font-medium cursor-pointer"
                onClick={handleSaveUser}
              >
                New Employee
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
