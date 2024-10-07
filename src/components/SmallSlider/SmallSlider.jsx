import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderimage1 from '../../assets/images/1.jpg'
import sliderimage2 from '../../assets/images/2.jpg'
import sliderimage3 from '../../assets/images/3.jpg'


export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };
  return (
    <Slider {...settings}>
      <div>
      <img className="w-full h-[413px] " src={sliderimage1} alt="" />

      </div>
      <div>
      <img className="w-full h-[413px] " src={sliderimage2} alt="" />

      </div>
      <div>
      <img className="w-full h-[413px] " src={sliderimage3} alt="" />

      </div>
      
    </Slider>
  );
}