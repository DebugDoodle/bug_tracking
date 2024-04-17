import { useState } from 'react';

const HamburgerIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className=" text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>
      <div
        className={`absolute right-0 lg:right-auto lg:left-0 mt-2 lg:mt-0 bg-white rounded-lg shadow-md ${
          isOpen ? 'block' : 'hidden'
        }`}
      >

      </div>
    </div>
  );
};

export default HamburgerIcon;
