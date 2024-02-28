import React, { useState, useRef, useEffect, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Cards = ({ item }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedExtraIngredients, setSelectedExtraIngredients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const modalRef = useRef();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleExtraIngredientChange = (ingredient) => {
    if (selectedExtraIngredients.includes(ingredient)) {
      setSelectedExtraIngredients(
        selectedExtraIngredients.filter((item) => item === ingredient)
      );
    } else {
      setSelectedExtraIngredients([...selectedExtraIngredients, ingredient]);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = item.basePrice;
    if (selectedSize) {
      totalPrice += (totalPrice * parseFloat(selectedSize.percentage)) / 100;
    }
    selectedExtraIngredients.forEach((ingredient) => {
      totalPrice += parseFloat(ingredient.ingredientPrice);
    });
    return totalPrice;
  };

  const handleAddToCart = async () => {
    try {
      if (user && user.email) {
        const sizesData = selectedSize
          ? {
              sizeName: selectedSize.sizeName[0],
              percentage: parseFloat(selectedSize.percentage[0]),
            }
          : null;
        const extraIngredientsData = selectedExtraIngredients.map(
          (ingredient) => ({
            ingredientName: ingredient.ingredientName[0],
            ingredientPrice: parseFloat(ingredient.ingredientPrice[0]),
          })
        );

        const orderData = {
          userEmail: user.email,
          cartProduct: [
            {
              itemName: item.itemName,
              qty: "1", // Assuming you always add 1 item at a time
              sizes: sizesData ? [sizesData] : [],
              extraIngredients: extraIngredientsData,
              price: calculateTotalPrice(),
            },
          ],
        };

        console.log("Order Data:", orderData); // Log order data before sending to API

        await axios.post("http://localhost:3000/api/cart", orderData);
        console.log("Item added to cart successfully!");
        setIsCartAdded(true);
        setIsModalOpen(false);
      } else {
        Swal.fire({
          title: "Are you sure?",
          text: "You should log in first!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sign up now!",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/signup', {state:{from: location}})
          }
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleModalClick = (event) => {
    event.stopPropagation(); // Prevent clicks inside modal from closing the modal
  };

  return (
    <div className="relative mr-5 shadow-xl card md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-primary ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure className="transition-all duration-300 hover:scale-105">
          <img
            src={item.imgURL}
            alt="Shoes"
            className="rounded-[25px] hover:scale-105 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title text-textColor">{item.itemName}</h2>
        </Link>
        <Link to={`/menu/${item._id}`}>
          <p className="text-textColor">{item.description}</p>
        </Link>

        <div className="relative items-center justify-between mt-2 card-actions">
          <h5 className="font-bold text-textColor">
            <span className="text-sm font-bold text-textColor">Rs. </span>{" "}
            {calculateTotalPrice()}
          </h5>
          <button
            onClick={handleAddToCartClick}
            className="text-white border-none btn bg-primary"
            disabled={!item.itemAvailable}
          >
            Add to Cart
          </button>
          {isModalOpen && (
            <div
              className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
              onClick={handleCloseModal}
            >
              <div
                ref={modalRef}
                className="p-4 bg-white rounded-md shadow-md"
                onClick={handleModalClick}
              >
                <h3 className="mb-2 text-lg font-semibold text-textColor">
                  Select Options
                </h3>
                <div className="flex flex-col">
                  {item.sizes.map((size) => (
                    <label
                      key={size._id}
                      className="inline-flex items-center mt-3"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 form-checkbox text-primary"
                        value={size.sizeName[0]}
                        checked={selectedSize === size}
                        onChange={() => handleSizeChange(size)}
                      />
                      <span className="ml-2 text-textColor">
                        {size.sizeName}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="flex flex-col">
                  {item.extraIngredients.map((ingredient) => (
                    <label
                      key={ingredient._id}
                      className="inline-flex items-center mt-3"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 form-checkbox text-primary"
                        value={ingredient.ingredientName[0]}
                        checked={selectedExtraIngredients.includes(ingredient)}
                        onChange={() => handleExtraIngredientChange(ingredient)}
                      />
                      <span className="ml-2 text-textColor">
                        {ingredient.ingredientName}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={handleAddToCart}
                  className="mt-4 text-white border-none btn bg-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )}
        </div>
        {isCartAdded && (
          <span className="text-sm text-green-500">Item added to cart!</span>
        )}
        {!item.itemAvailable && (
          <span className="text-sm text-red">Out of Stock</span>
        )}
      </div>
    </div>
  );
};

export default Cards;
