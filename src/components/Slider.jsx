import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import sliderImage1 from '../assets/slider.jpg';
import sliderImage2 from '../assets/slider2.jpg';

export default function Carousel() {
  const arrowStyles = {
    color: 'black', // Cambia el color de las flechas a negro
  };

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
      loop
      pagination={{ clickable: true }}
      className='w-full h-[30rem] sm:h-[38rem]'
    >
      <SwiperSlide>
        <img className='w-full h-[30rem] sm:h-[38rem]' src={sliderImage2} alt="Slider Image 2" />
      </SwiperSlide>

      {/* Flechas de navegación */}
      <div className="swiper-button-next" style={arrowStyles}></div>
      <div className="swiper-button-prev" style={arrowStyles}></div>
    </Swiper>
  );
}
