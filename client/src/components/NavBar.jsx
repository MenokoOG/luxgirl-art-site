import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="w-full p-4 flex justify-between items-center text-white fixed top-0 bg-black bg-opacity-70 z-10">
      <div className="flex items-center">
        <Link to="/bio" className="text-3xl font-lobster cursor-pointer">
          LuxGirl OG - Original Geek !
        </Link>
      </div>
      <div>
        <Link to="/" className="mx-2 p-2 hover:bg-white hover:text-black transition-colors">Home</Link>
        <Link to="/art-gallery" className="mx-2 p-2 hover:bg-white hover:text-black transition-colors">Gallery</Link>
        <Link to="/bio" className="mx-2 p-2 hover:bg-white hover:text-black transition-colors">Bio</Link>
        <Link to="/quotes" className="mx-2 p-2 hover:bg-white hover:text-black transition-colors">Inspirational Quotes</Link>
      </div>
    </nav>
  );
};

export default NavBar;
