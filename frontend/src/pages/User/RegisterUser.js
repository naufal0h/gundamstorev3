import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from "react-redux";
import { register, clear } from "../../actions/userActions";

function RegisterUser() {
  const { action, status, data } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    birthday: "",
    gender: false,
    avatar: null,
  });


  useEffect(() => {
    console.log(`${action} | ${status}`);
  }, [status])

  useEffect(() => {
    if (action === "REGISTER" && status === "data") {
      dispatch(clear()).then(() => {
        navigate(`/login`);
      })
    }
  }, [status]);

  const registerHandler = () => {
    let formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("birthday", form.birthday);
    formData.append("gender", form.gender);
    formData.append("avatar", form.avatar);
    formData.append("type", "user");
    dispatch(register(formData));
  }
  return (
    <div className="mx-auto lg:w-2/5 md:w-3/5 sm:w-96 bg-white rounded-md">
      <div className="p-5">
        <div className="py-4 text-5xl font-bold text-darkColor text-center">
          Register
        </div>
        <hr className="border-blue-800 mx-5" />
        <div className="px-5 py-5">
          <div className="mx-auto my-5 w-40 h-40 bg-white border-4 border-darkColor relative rounded-full flex justify-center items-center">
            <label
              className="cursor-pointer custom-file-upload"
              htmlFor="file-upload"
            >
              <img
                className="mx-auto object-cover w-36 h-36 rounded-full"
                src={
                  form.avatar
                    ? URL.createObjectURL(form.avatar)
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
                alt="Profile Picture"
              />
            </label>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              name="image"
              accept="image"
              onChange={(e) => {
                setForm({ ...form, avatar: e.target.files[0] });
              }}
            />
            <div className=" bg-darkColor rounded-full absolute top-0 left-0 px-2 py-2">
              <div className="text-2xl text-lightColor">
                <BiPencil />
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Username
          </label>
          <input
            type="text"
            className="border hover:border-blue-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          ></input>
        </div>
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
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Birth Day
          </label>
          <input
            type="date"
            className="border hover:border-blue-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
            onChange={(e) => setForm({ ...form, birthday: e.target.value })}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Gender
          </label>
          <select
            className="border hover:border-blue-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
            name="gender"
            id="gender"
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="false">Male</option>
            <option value="true">Female</option>
          </select>
        </div>

        <div className="px-5 py-8">
          <button
            className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
            name="condition"
            id="condition"
            onClick={() => registerHandler()}
          >
            Register
          </button>
          <h1 className="text-md mt-2 text-center">
            Already have an account ?, Click{" "}
            <button
              className="font-bold text-darkColor"
              onClick={() => navigate("/registerCMS")}
            >
              here!
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
