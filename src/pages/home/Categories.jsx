import React from 'react'

const categoryItems = [
    {id: 1, title: "Main Dish", despriction: "(86 dishes)", image: "/images/home/category/img1.png"},
    {id: 2, title: "Break Fast", despriction: "(12 break fast)", image: "/images/home/category/img2.png"},
    {id: 3, title: "Dessert", despriction: "(48 dessert)", image: "/images/home/category/img3.png"},
    {id: 4, title: "Browse All", despriction: "(255 Items)", image: "/images/home/category/img4.png"}
]

const Catagories = () => {
  return (
    <div className='px-4 py-16 mx-auto section-container max-w-screen-2xl xl:px-24'>
        <div className='text-center'>
            <p className='subtitle'>Customer Favorites</p>
            <h2 className='title'>Popular Catagories</h2>
        </div>

        {/* category cards */}
        <div className='flex flex-col flex-wrap items-center justify-around gap-8 mt-12 sm:flex-row '>
            {
                categoryItems.map((item, i) => (
                    <div key={i} className='z-10 px-5 py-6 mx-auto text-center transition-all duration-300 bg-white rounded-md shadow-lg cursor-pointer w-72 hover:-translate-y-4'>
                        <div className='flex items-center justify-center w-full mx-auto'><img src={item.image} alt="" className='bg-[#fde4af] p-5 rounded-full w-28 h-28' /></div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
                            <p className='text-sm text-secondary'>{item.despriction}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Catagories