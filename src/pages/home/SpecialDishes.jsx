/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaHeart} from "react-icons/fa"
import Cards from "../../components/Cards";
import { FaAngleRight, FaAngleLeft  } from "react-icons/fa6";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "primary" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "primary" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        // console.log(specials)
        setRecipes(specials);
      });
  }, []);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="relative px-4 mx-auto my-20 max-w-screen-2xl section-container xl:px-24">
       <div className='text-left'>
            <p className='subtitle'>Special Dishess</p>
            <h2 className='title max-w-[500px]'>Standout Dishes From Our Menu</h2>
        </div>
      <div className="mb-10 md:absolute right-3 top-8 md:mr-24">
        <button onClick={() => slider?.current?.slickPrev()}
        className="p-2 ml-5 rounded-full btn"
        >
        <FaAngleLeft className="w-8 h-8 p-1"/>
        </button>
        <button
          className="p-2 ml-5 border-none rounded-full bg-primary btn"
          onClick={() => slider?.current?.slickNext()}
        >
          <FaAngleRight className="w-8 h-8 p-1 "/>
        </button>
      </div>

      <Slider ref={slider} {...settings} className="mt-10 space-x-5 overflow-hidden">
        {recipes.map((item, i) => (
          <Cards item={item} key={i}/>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;