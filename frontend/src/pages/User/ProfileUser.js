import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil, BiLocationPlus } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userActions";
import url from "../../helpers/base_url";

const ProfileUser = () => {
  const { action, status, data } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return status === "data" && action === "GET_USER" ? (
    <div className="container mx-auto min-h-screen">
      <div className="grid grid-cols-12 min-h-50">
        <div className=" lg:col-span-4 md:col-span-6 col-span-12 flex m-10 items-center">
          <div className=" rounded overflow-hidden p-3 justify-center shadow-lg bg-white mx-auto">
            <img
              className="w-full"
              src={url + "/images/" + data.avatar}
              alt="Sunset in the mountains"
            />
            <div className="px-6">
              <div className="font-bold text-xl my-2">{data.username}</div>
              <p className="text-gray-700 text-md my-3">Buyer Account</p>
              <div className="flex py-1">
                <AiOutlineMail className="mt-1 mr-3" size={25} />
                <p className="text-gray-500 text-sm mt-1">{data.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center lg:col-span-8 md:col-span-6 col-span-12 m-10 bg-white min-h-50">
          <div className="w-full">
            <div className="font-bold ">
              <div className="w-4/5 mx-auto text-4xl py-5">User Profile</div>
            </div>
            <div className="w-4/5 mx-auto border-b-2 border-darkColor">
              <hr />
            </div>
            <div className="grid grid-cols-12 w-4/5 mx-auto">
              <div className="p-3 col-span-6 ">
                <div className="mx-auto w-2/4">
                  <ul>
                    <li>
                      <h1 className="text-2xl font-semibold pb-2">Username</h1>
                      <p className="text-md pb-4">{data.username}</p>
                    </li>
                    <li>
                      <h1 className="text-2xl font-semibold pb-2">Email</h1>
                      <p className="text-md pb-4">{data.email}</p>
                    </li>
                    <li>
                      <h1 className="text-2xl font-semibold pb-2">Gender</h1>
                      <p className="text-md pb-4">
                        {data.gender ? "Female" : "Male"}
                      </p>
                    </li>
                    <li>
                      <h1 className="text-2xl font-semibold pb-2">
                        Birth Date
                      </h1>
                      <p className="text-md pb-4">
                        {data.birthday
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-span-6  flex justify-end items-center">
                <div className="h-full p-5">
                  <button
                    className="bg-accentColor text-black rounded p-2 mr-3 hover:bg-black hover:text-accentColor"
                    onClick={() => navigate("/user/edit")}
                  >
                    <div className="flex">
                      <BiPencil className="mt-1 mr-1 text-2xl" />
                      <h1 className="text-md font-semibold text-2xl">Edit</h1>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : status === "loading" ? (
    "loading"
  ) : status === "error" ? (
    data
  ) : (
    String(data)
  );
};

export default ProfileUser;
