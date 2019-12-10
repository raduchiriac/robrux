import React, { useState, Fragment } from 'react';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Image } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.scss';

const Carousel = props => {
  const { images, width, height } = props;
  if (!images.length) {
    return <Fragment></Fragment>;
  }
  return (
    <CarouselProvider
      step={1}
      visibleSlides={1}
      naturalSlideWidth={width || 1024}
      naturalSlideHeight={height}
      totalSlides={images.length}
      lockOnWindowScroll
      infinite={false}
      style={{ width, height }}
    >
      <Slider>
        {images.map((img, idx) => (
          <Slide key={idx} index={idx}>
            <ImageWithZoom src={img} alt={`Slide ${idx}`} />
          </Slide>
        ))}
      </Slider>
      <ButtonBack className="buttonBack">
        <KeyboardArrowLeftRoundedIcon />
      </ButtonBack>
      <ButtonNext className="buttonNext">
        <KeyboardArrowRightRoundedIcon />
      </ButtonNext>
    </CarouselProvider>
  );
};

export default Carousel;
