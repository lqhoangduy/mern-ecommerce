import React from 'react';
import SlideShowGallery from './SlideShowGallery';
import slideshow1 from './images/slideshow1.jpg';
import slideshow2 from './images/slideshow2.jpg';
import slideshow3 from './images/slideshow3.jpg';

const collection = [
  { src: slideshow1, caption: 'Fear of God' },
  { src: slideshow2, caption: 'Essentials' },
  { src: slideshow3, caption: 'FG7C' },
];

export default class SlideShowList extends React.Component {
  render() {
    return (
      <>
        <SlideShowGallery
          input={collection}
          ratio={`4:2`}
          mode={`automatic`}
          timeout={`3000`}
        />
      </>
    );
  }
}
