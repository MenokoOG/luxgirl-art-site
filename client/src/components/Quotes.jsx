import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

const Quotes = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => setQuote(data.content));
  }, []);

  return (
    <div className="min-h-screen bg-black bg-opacity-50 flex flex-col items-center text-white">
      <NavBar />
      <div className="flex-grow flex flex-col justify-center items-center p-4 max-w-4xl mt-16">
        <h2 className="text-4xl mb-4">Inspirational Quote</h2>
        <p className="text-lg italic leading-relaxed">{quote}</p>
      </div>
    </div>
  );
};

export default Quotes;
