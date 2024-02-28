import React from "react";
import bannerImg from "../../public/images/home/banner.png";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="flex flex-col items-center justify-between gap-8 py-24 md:flex-row-reverse">

        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
          <div className="flex flex-col items-center justify-around gap-4 md:flex-row -mt-14">
            <div className="flex items-center w-64 gap-3 px-3 py-2 bg-white shadow-sm rounded-2xl">
              <img src="/images/home/b-food1.png" alt=""  className="rounded-2xl"/>
              <div className="space-y-1">
                <h5>Spicy noodles</h5>
                <div className="rating rating-sm">
              
                <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-500 mask mask-star-2"
                    readOnly
                  />
                <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-500 mask mask-star-2"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-500 mask mask-star-2"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-400 mask mask-star-2"
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-400 mask mask-star-2"
                    readOnly
                  />
                
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
            <div className="items-center hidden w-64 gap-3 px-3 py-2 bg-white shadow-sm rounded-2xl md:flex">
              <img src="/images/home/b-food1.png" alt=""  className="rounded-2xl"/>
              <div className="space-y-1">
                <h5>Spicy noodles</h5>
                <div className="rating rating-sm">
                <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-500 mask mask-star-2"
                    readOnly
                  />
                <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-500 mask mask-star-2"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-500 mask mask-star-2"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-400 mask mask-star-2"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="bg-orange-400 mask mask-star-2"
                    readOnly
                  />
                
                </div>
                <p className="text-red">$18.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="px-4 md:w-1/2 space-y-7">
        <h2 className="text-4xl font-bold leading-snug md:text-5xl md:leading-snug text-textColor">
            Dive into Delights Of Delectable <span className="text-primary">Food</span>
          </h2>
          <p className="text-xl text-textColor">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className="px-8 py-3 font-semibold text-white border-none rounded-full bg-primary btn">
            Order Now
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Banner;