import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page

  useEffect(() => {
    // Fetch data from the backend using Axios
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/menuitem");
        setMenu(response.data);
        setFilteredItems(response.data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  //show all items
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.itemName.localeCompare(b.itemName));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.itemName.localeCompare(a.itemName));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.basePrice - a.basePrice);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }
    

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Get unique categories from menu items
  const categories = [...new Set(menu.map((item) => item.category))];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="flex flex-col items-center justify-center py-48">
          {/* content */}
          <div className="px-4 text-center space-y-7">
            <h2 className="text-4xl font-bold leading-snug text-textColor md:text-5xl md:leading-snug">
              For the Love of Delicious <span className="text-primary">Food</span>
            </h2>
            <p className="mx-auto text-xl text-textColor md:w-4/5">
              Come with family & feel the joy of mouthwatering food such as
              Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas
              Rellenas and more for a moderate cost
            </p>
            <button className="px-8 py-3 font-semibold text-white border-none rounded-full bg-primary btn">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop  */}
      <div className="section-container">
        <div className="flex flex-col flex-wrap items-center mb-8 space-y-3 md:flex-row md:justify-between">
          
           {/* all category buttons */}
          <div className="flex flex-row flex-wrap justify-start gap-4 md:items-center md:gap-8">
            <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>
              All
            </button>
            {categories.map((category) => (
              <button key={category} onClick={() => filterItems(category)} className={selectedCategory === category ? "active" : ""}>
                {category}
              </button>
            ))}
          </div>

          {/* filter options */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="p-2 bg-secondary ">
              <FaFilter className="w-4 h-4 text-white" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="px-2 py-1 text-white rounded-sm bg-secondary"
            >
              <option value="default"> Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* product card */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2 ">
          {Array.isArray(currentItems) && currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

       {/* Pagination */}
       <div className="flex justify-center my-8">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
