import React from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { iterate } from "localforage";

const Cart = () => {
  const [cart, refetch] = useCart();

  // Calculate the total price by summing up the prices of all items in the cart
  const orderTotal = cart.reduce((total, item) => {
    return total + item.cartProduct[0].price;
  }, 0);
  
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="section-container">
      <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="flex flex-col items-center justify-center gap-8 py-36 ">
          {/* Banner */}
          <div className="px-4 space-y-7">
            <h2 className="text-4xl font-bold leading-snug md:text-5xl md:leading-snug text-textColor">
              Your Personalized Food <span className="text-primary">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-black rounded-md bg-primary">
            <tr>
              <th>#</th>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-textColor">
            {/* rows */}
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.cartProduct[0].itemName}</td>
                <td>{item.cartProduct[0].qty}</td>
                <td>{item.cartProduct[0].price}</td>
                <td>
                  <button
                    className="text-red btn btn-ghost btn-xs"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-12">
        <div className="space-y-3 md:w-1/2">
          <h3 className="font-medium text-textColor">Customer Details</h3>
          <p className="text-textColor">Total items: {cart.length}</p>
          <p className="text-textColor">Total price: Rs.{orderTotal.toFixed(2)}</p> {/* Displaying the total price */}
          <button className="mt-4 text-white border-none btn bg-primary"
                >Proceed to Checkout</button>
        </div>
        <div className="space-y-3 md:w-1/2"></div>
      </div>
    </div>
  );
};

export default Cart;
