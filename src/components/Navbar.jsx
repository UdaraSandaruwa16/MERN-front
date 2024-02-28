import React, { useContext, useEffect, useState } from "react";
import logo from "../../public/logo.png";
import { IoMdLogIn } from "react-icons/io";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li className="text-textColor">
        <a href="/">Home</a>
      </li>
      <li className="text-textColor">
        <a href="/">About</a>
      </li>
      <li className="text-textColor">
        <a href="/menu">Menu</a>
      </li>
      <li tableIndex={0} className="text-textColor">
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a href="/menu">Online Ordering</a>
            </li>
            <li>
              <a>Dine-in</a>
            </li>
          </ul>
        </details>
      </li>
      <li className="text-textColor">
        <Link to="/book-table">Book a table</Link> {/* Added Link component */}
      </li>
      <li className="text-textColor">
        <a href="/">Contact</a>
      </li>
    </>
  );

  return (
    <header className="container fixed top-0 left-0 right-0 mx-auto transition-all duration-300 ease-in-out max-w-screen-2xl">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-bgColor transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>

          {/* logo */}

          <a href="/">
            <img src={logo} id="logo" alt="Logo" width="100" height="25" />
          </a>
        </div>
        <div className="hidden navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">{navItems}</ul>
        </div>
        <div className="gap-3 navbar-end">
          {/* Search btn */}
          <button className="items-center justify-center hidden btn btn-ghost btn-circle lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart btn */}
          <Link to="cart-page">
            <label
              tabIndex={0}
              className="items-center justify-center hidden mr-3 btn btn-ghost btn-circle lg:flex"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-white badge badge-sm indicator-item">{cart.length || 0}</span>
              </div>
            </label>
          </Link>

          {/* Login btn */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="flex items-center gap-2 px-6 text-white border-none rounded-full btn bg-primary"
            >
              <IoMdLogIn /> Log In
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
