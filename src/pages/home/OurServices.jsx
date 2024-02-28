import React from "react";

const serviceLists = [
    {id:1, title: "Catering", des: "Delight your guests with our flavors and  presentation", img: "/images/home/services/icon1.png"},
    {id:2, title: "Fast delivery", des: "We deliver your order promptly to your door", img: "/images/home/services/icon2.png"},
    {id:3, title: "Online Ordering", des: "Explore menu & order with ease using our Online Ordering n", img: "/images/home/services/icon3.png"},
    {id:4, title: "Gift Cards", des: "Give the gift of exceptional dining with Foodi Gift Cards", img: "/images/home/services/icon4.png"},
]

const OurServices = () => {
  return (
    <div className="my-16 section-container">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Culinary Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>

            <button className="px-8 py-3 font-semibold text-white border-none rounded-full bg-primary btn">
              Explore
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
            <div className="grid items-center grid-cols-1 gap-8 sm:grid-cols-2">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="px-4 py-5 space-y-2 text-center transition-all duration-200 rounded-sm shadow-md cursor-pointer text-green hover:border hover:border-indigo-600">
                            <img src={service.img} alt="" className="mx-auto "/>
                            <h5 className="pt-3 font-semibold"> {service.title}</h5>
                            <p className="text-textColor">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;