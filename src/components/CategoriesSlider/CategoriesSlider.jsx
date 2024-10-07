import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAllCategories from "../../CustomHooks/useAllCategories";
import { CircularProgress } from "@mui/material";

export default function CategoriesSlider() {
  const { isError, isLoading, data } = useAllCategories();

  if (isLoading) {
    return (
        <div className="h-screen bg-[#508C9B] flex justify-center items-center">
        <CircularProgress size={80} color="inherit" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <h2>Error loading categories</h2>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <Slider {...settings}>
      {data.data.data.map((category) => (
        <div key={category._id}>
          <img className="w-full h-60" src={category.image} alt={category.name} />
          <h4 
      className="md:text-xl text-sm"
      style={{
        overflowWrap: 'break-word',   
        wordBreak: 'break-word',      
        textOverflow: 'ellipsis',    
        whiteSpace: 'normal',         
      }}
    >
      {category.name}
    </h4>

        </div>
      ))}
    </Slider>
  );
}
