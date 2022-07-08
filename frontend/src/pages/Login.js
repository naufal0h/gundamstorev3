import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Swal from 'sweetalert2'

function Login() {
  const { action, status, data } = useSelector(state => state.userReducer)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (localStorage.getItem("access_token")){
      if(localStorage.getItem("type")==="user"){
        Swal.fire("Login Success!", "Welcome!", "success");
        navigate('/user/home');
      }else if(localStorage.getItem("type")==="cms"){
        Swal.fire("Login Success!", "Logged in as Admin", "success");
        navigate('/cms/dashboard');
      }
    } ;
  }, [data]);

  const loginHandler = () => {
    dispatch(login(form));
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="lg:w-96 md:w-3/5 sm:w-96 bg-white rounded-md">
        <div className="p-5">
          <div className="py-4 text-5xl font-bold text-darkColor text-center">
            Login
          </div>
          <hr className="border-blue-800 mx-5" />

          <div className="px-5 py-2">
            <label className="block text-darkColor text-lg font-bold pb-2">
              Email
            </label>
            <input
              type="text"
              className="border hover:border-blue-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-darkColor text-lg font-bold pb-2">
              Password
            </label>
            <input
              type="password"
              className="border hover:border-blue-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            ></input>
          </div>

          <div className="px-5 py-8">
            <button
              className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
              name="condition"
              id="condition"
              onClick={() => loginHandler()}
            >
              Login
            </button>



            {/* {type === "user" ? (
            <button
              className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
              name="condition"
              id="condition"
              onClick={() => navigate("/user/")}
            >
              Login
            </button>
          ) : type === "admin" ? (
            <button
              className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
              name="condition"
              id="condition"
              onClick={() => navigate("/cms/")}
            >
              Login
            </button>
          ) : (
            <button
              className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
              name="condition"
              id="condition"
            >
              Login
            </button>
          )} */}

            <h1 className="text-md mt-2 text-center">
              Don't have an account? Register{" "}
              <button
                className="font-bold text-darkColor"
                onClick={() => navigate("/registerUser")}
              >
                here!
              </button>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
