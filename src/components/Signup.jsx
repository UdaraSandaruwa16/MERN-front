import React, { useContext } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import axios from 'axios';

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createUser, login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        const { email, password, userName } = data;
        try {
            // Create user in Firebase
            await createUser(email, password);

            // Send user data to backend API
            const response = await axios.post("http://localhost:3000/api/users", { email, userName });
            console.log("User created in backend:", response.data);

            alert("Account creation successfully done!");
            document.getElementById("my_modal_5").close();
            navigate(from, { replace: true });
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    return (
        <div className="flex items-center justify-center w-full max-w-md mx-auto my-20 bg-white shadow">
            <div className="flex flex-col justify-center mt-0 modal-action">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
                    <h3 className="text-lg font-bold text-textColor">Create A Account!</h3>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-textColor">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="username"
                            className="input input-bordered"
                            {...register("userName")}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-textColor">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            className="input input-bordered"
                            {...register("email")}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-textColor">Password</span>
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

                    <div className="mt-6 form-control">
                        <input
                            type="submit"
                            value="Signup"
                            className="text-white btn bg-green"
                        />
                    </div>

                    <p className="my-2 text-center">
                        Have an account?{" "}
                        <button className="ml-1 underline text-red"
                            onClick={() => document.getElementById("my_modal_5").showModal()}
                        >
                            Login
                        </button>{" "}
                    </p>

                    <Link
                        to="/"
                        className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
                    >✕</Link>
                </form>

                <div className="mb-5 space-x-3 text-center">
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaGoogle />
                    </button>
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaFacebookF />
                    </button>
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaGithub />
                    </button>
                </div>
            </div>
            <Modal />
        </div>
    )
}

export default Signup;
