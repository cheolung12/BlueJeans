import React, { useEffect, useState } from 'react';
import m1 from '../main/mainImg/m1.png';
import m2 from '../main/mainImg/m2.png';
import m3 from '../main/mainImg/m3.png';
import m4 from '../main/mainImg/m4.png';
import m5 from '../main/mainImg/m5.png';
import m6 from '../main/mainImg/m6.png';
import m7 from '../main/mainImg/m7.png';
import m8 from '../main/mainImg/m8.png';
import m9 from '../main/mainImg/m9.png';
import m10 from '../main/mainImg/m10.png';

const Calligraphy = () => {
  const [isVisible, setIsVisible] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const threshold = 900;

      if (scrollY >= threshold) {
        const delays = [0, 100, 150, 200, 250, 300, 350, 400, 450, 500];

        setIsVisible(
          isVisible.map((_, index) => scrollY >= threshold + delays[index])
        );
      } else {
        setIsVisible(Array(10).fill(false));
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return (
    <div>
      <div>
        <div className='flex p-5'>
          <div className='h-5 w-20 mt-20'>
            {isVisible[5] && (
              <div className='image-container opacity-40'>
                <img src={m6} className='m-3' alt='m6' />
              </div>
            )}
            {isVisible[6] && (
              <div className='image-container opacity-40'>
                <img src={m7} className='m-3' alt='m7' />
              </div>
            )}
            {isVisible[7] && (
              <div className='image-container opacity-40'>
                <img src={m8} className='m-3' alt='m8' />
              </div>
            )}
            {isVisible[8] && (
              <div className='image-container opacity-40'>
                <img src={m9} className='m-3' alt='m9' />
              </div>
            )}
            {isVisible[9] && (
              <div className='image-container opacity-40'>
                <img src={m10} className='m-3' alt='m10' />
              </div>
            )}
          </div>
          {/* 반반 */}
          <div className='h-5 w-20'>
            {isVisible[0] && (
              <div className='image-container opacity-40'>
                <img src={m1} className='m-3' alt='m1' />
              </div>
            )}
            {isVisible[1] && (
              <div className='image-container opacity-40'>
                <img src={m2} className='m-3' alt='m2' />
              </div>
            )}
            {isVisible[2] && (
              <div className='image-container opacity-40'>
                <img src={m3} className='m-3' alt='m3' />
              </div>
            )}
            {isVisible[3] && (
              <div className='image-container opacity-40'>
                <img src={m4} className='m-3' alt='m4' />
              </div>
            )}
            {isVisible[4] && (
              <div className='image-container opacity-40'>
                <img src={m5} className='m-3' alt='m5' />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calligraphy;
