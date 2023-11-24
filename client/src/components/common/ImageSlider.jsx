import React, { useState, useEffect } from 'react';

export default function ImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageUrls = [
    '/images/s1.jpeg',
    '/images/s2.jpeg',
    '/images/s3.jpeg',
    '/images/s4.jpeg',
  ];
  const currentImageUrl = imageUrls[currentImageIndex];

  // 3초마다 이미지 변경
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentImageIndex, imageUrls.length]);

  return (
    <div
      className='w-[1200px] h-full lg:block hidden'
      style={{
        backgroundImage: `url(${currentImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
      }}
    ></div>
  );
}
