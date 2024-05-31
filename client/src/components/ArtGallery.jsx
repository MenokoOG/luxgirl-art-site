import React, { useState, useEffect } from 'react';
import images from '../imageData';
import '../ArtGallery.css';
import { FaThumbsUp } from 'react-icons/fa';

const ArtGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [likes, setLikes] = useState({});
  const [likedImages, setLikedImages] = useState({});
  const imagesPerPage = 6; // Adjust this value based on the number of images you want per page

  useEffect(() => {
    images.forEach((src, index) => {
      const imageId = `image-${index}`;
      fetch(`/api/like-count/${imageId}`)
        .then(res => res.json())
        .then(data => setLikes(prevLikes => ({ ...prevLikes, [imageId]: data.count })));
    });

    // Load liked images from local storage
    const storedLikedImages = JSON.parse(localStorage.getItem('likedImages') || '{}');
    setLikedImages(storedLikedImages);
  }, []);

  const handleLike = (imageId) => {
    fetch('/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageId }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'Image liked successfully!') {
          setLikes(prevLikes => ({ ...prevLikes, [imageId]: (prevLikes[imageId] || 0) + 1 }));
          const updatedLikedImages = { ...likedImages, [imageId]: true };
          setLikedImages(updatedLikedImages);
          // Save liked images to local storage
          localStorage.setItem('likedImages', JSON.stringify(updatedLikedImages));
        } else {
          alert(data.message);
        }
      });
  };

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(images.length / imagesPerPage));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(images.length / imagesPerPage)) % Math.ceil(images.length / imagesPerPage));
  };

  const displayedImages = images.slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage);

  return (
    <div className="background-image min-h-screen relative font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 fade-in">
        {displayedImages.map((src, index) => {
          const imageId = `image-${index + currentPage * imagesPerPage}`;
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
              <img
                src={src}
                alt={`Art ${index + 1 + currentPage * imagesPerPage}`}
                className="w-full h-64 object-cover rounded-lg"
                onClick={() => openModal(src)}
              />
              <h2 className="text-center text-2xl mt-4 font-semibold text-gray-800">{`Art ${index + 1 + currentPage * imagesPerPage}`}</h2>
              <div className="text-center mt-4">
                <button
                  onClick={() => handleLike(imageId)}
                  className={`py-2 px-4 rounded-full flex items-center justify-center gap-2 transition-colors ${
                    likedImages[imageId] ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  <FaThumbsUp /> {likedImages[imageId] ? 'Liked' : 'Like'}
                </button>
                <p className="mt-2 text-lg text-gray-700">{likes[imageId] || 0} likes</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="fixed top-1/2 transform -translate-y-1/2 left-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:from-purple-500 hover:via-pink-600 hover:to-red-600"
        onClick={handlePrev}
      >
        &larr;
      </button>
      <button
        className="fixed top-1/2 transform -translate-y-1/2 right-4 bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 text-white p-3 rounded-full shadow-lg hover:from-blue-500 hover:via-green-600 hover:to-yellow-600"
        onClick={handleNext}
      >
        &rarr;
      </button>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20" onClick={closeModal}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 bg-white text-black text-3xl font-bold rounded-full p-2 hover:bg-gray-200"
              onClick={closeModal}
            >
              &times;
            </button>
            <img src={selectedImage} alt="Selected Art" className="max-w-full max-h-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtGallery;
