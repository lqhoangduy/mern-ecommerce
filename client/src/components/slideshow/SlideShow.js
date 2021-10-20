import React, { useState } from 'react';

function SlideShow() {
  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    const newIndex = slideIndex + n <= 3 ? slideIndex + n : 1;
    setSlideIndex(newIndex);
  };

  return (
    <>
      <div className='slideshow-container'>
        {slideIndex === 1 && (
          <div className='mySlides fade'>
            <div className='numbertext'>1 / 3</div>
            <img
              src='./images/slideshow1.jpg'
              alt=''
              style={{ width: '100%' }}
            />
            <div className='text'>Fear of God</div>
          </div>
        )}

        {slideIndex === 2 && (
          <div className='mySlides fade'>
            <div className='numbertext'>2 / 3</div>
            <img
              src='./images/slideshow2.jpg'
              alt=''
              style={{ width: '100%' }}
            />
            <div className='text'>Fear of God</div>
          </div>
        )}

        {slideIndex === 3 && (
          <div className='mySlides fade'>
            <div className='numbertext'>3 / 3</div>
            <img
              src='./images/slideshow2.jpg'
              alt=''
              style={{ width: '100%' }}
            />
            <div className='text'>Fear of God</div>
          </div>
        )}

        <a href='#!' className='prev' onClick={plusSlides(-1)}>
          &#10094;
        </a>
        <a href='#!' className='next' onClick={plusSlides(1)}>
          &#10095;
        </a>
      </div>

      <div style={{ textAlign: 'center' }}>
        <span
          className={'dot' + slideIndex === 1 && 'active'}
          onClick={() => setSlideIndex(1)}></span>
        <span
          className={'dot' + slideIndex === 2 && 'active'}
          onClick={() => setSlideIndex(2)}></span>
        <span
          className={'dot' + slideIndex === 3 && 'active'}
          onClick={() => setSlideIndex(3)}></span>
      </div>
    </>
  );
}

export default SlideShow;
