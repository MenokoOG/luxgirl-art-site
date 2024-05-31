import React from 'react';
import NavBar from './NavBar';

const Bio = () => {
  return (
    <div className="min-h-screen bg-black bg-opacity-50 flex flex-col items-center text-white">
      <NavBar />
      <div className="flex-grow flex flex-col justify-center items-center p-4 max-w-4xl mt-16">
        <h2 className="text-4xl mb-4">About LuxGirl OG</h2>
        <p className="text-lg leading-relaxed">
          LuxGirl OG is a talented digital artist known for her unique style and vibrant compositions...
        </p>
        {/* Add more bio content here */}
      </div>
    </div>
  );
};

export default Bio;
