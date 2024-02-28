import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { AuthContext } from "../contexts/AuthProvider";
const SelectModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    const {signUpWithGmail, login} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");

    // redirecting to home page or specifig page
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
  

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    login(email, password).then((result) => {
      const user = result.user;
      alert("Login successfull");
      document.getElementById("my_modal_5").close()
      navigate(from, {replace: true})
    }).catch((error) => {
      const errorMessage = error.message;
      setErrorMessage("Provide a correct email and password!")
    })
  };

    // google signin
    const handleLogin = () => {
      signUpWithGmail().then((result) => {
        const user = result.user;
        alert("Login successfull!")
        navigate(from, {replace: true})
      }).catch((error) => console.log(error))
    }
  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="flex flex-col justify-center mt-0 modal-action">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
            <h3 className="text-lg font-bold">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="mt-1 label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error */}
            {
              errorMessage ? <p className="text-xs italic text-red">{errorMessage}</p> : ""
            }

            {/* login btn */}
            <div className="mt-4 form-control">
              <input
                type="submit"
                value="Login"
                className="text-white border-none btn bg-primary"
              />
            </div>

            <p className="my-2 text-center">
              Donot have an account?{" "}
              <Link to="/signup" className="ml-1 underline text-primary">
                Signup Now
              </Link>{" "}
            </p>

            <button 
            htmlFor="my_modal_5"
            onClick={() => document.getElementById("my_modal_5").close()}
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            >✕</button>
          </form>

          {/* social sign in */}
          <div className="mb-5 space-x-3 text-center">
            <button className="btn btn-circle hover:bg-primary hover:text-black" onClick={handleLogin}>
              <FaGoogle />
            </button>
            <button className="btn btn-circle hover:bg-primary hover:text-black">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle hover:bg-primary hover:text-black">
            <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default SelectModal;
