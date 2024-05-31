import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import backgroundImage from '../../public/A visually appealing digitaures.png'; // Ensure the image file is in the correct directory

const Home = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-black bg-opacity-70 min-h-screen flex flex-col items-center text-white">
        <NavBar />
        <div className="flex-grow flex flex-col justify-center items-center p-4 max-w-4xl mt-16 text-center">
          <Link to="/art-gallery">
            <h1 className="text-6xl font-bold font-lobster cursor-pointer mb-4">Welcome to LuxGirl OG's Gallery</h1>
          </Link>
          <Link to="/art-gallery">
            <p className="text-2xl font-poppins font-bold cursor-pointer mb-4">
              Discover a world of vibrant digital art and unique compositions crafted by LuxGirl OG. Explore her
              gallery to immerse yourself in creativity and artistic brilliance.
            </p>
          </Link>
        </div>
        <footer className="text-center p-4 bg-black bg-opacity-50 w-full">
          Made by: Menoko OG - Original Geek ! 2024
        </footer>
      </div>
    </div>
  );
};

export default Home;
