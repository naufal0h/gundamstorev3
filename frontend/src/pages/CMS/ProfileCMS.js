import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiPencil, BiLocationPlus } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/userActions';
import url from '../../helpers/base_url';


const ProfileCMS = () => {
  const { action, status, data } = useSelector(state => state.userReducer)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
  }, []);

  return (
    (status === "data" && action === "GET_USER") ?
      (<div>
        <div className="grid md:grid-cols-12 sm:grid-cols-1">
          <div className="md:col-span-6 sm:col-span-12 sm:min-h-screen mx-auto">
            <div className="flex">
              <h1 className="text-xl font-semibold pt-10 pb-5">Profile</h1>
              <div className="pt-10 pl-48">
                <button
                  className="bg-accentColor text-black rounded px-2 py-1 hover:bg-black hover:text-accentColor"
                  onClick={() => navigate("/cms/editProfile")}
                >
                  <div className="flex">
                    <BiPencil className="mt-1 mr-1" />
                    <h1 className="text-sm font-semibold">Edit</h1>
                  </div>
                </button>
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden">
              <img
                className="w-full"
                src={url + "/images/" + data.avatar}
                alt="Sunset in the mountains"
              />
              <div className="px-6">
                <div className="font-bold text-xl my-2">
                  {data.username}
                </div>
                {/* <div className="flex py-1">
                <BiLocationPlus className="mt-1 mr-3" size={30} />
                <p className="text-gray-500 text-sm">
                  Hazlehurst Ln, Lightwood Ln, Sheffield S8 8BG, United Kingdom
                </p>
              </div> */}
                {/* <div className="flex py-1">
                <BsTelephone className="mt-1 mr-3" size={25} />
                <p className="text-gray-500 text-sm mt-1">+44 1234567890</p>
              </div> */}
                <div className="flex py-1">
                  <AiOutlineMail className="mt-1 mr-3" size={25} />
                  <p className="text-gray-500 text-sm mt-1">
                    {data.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-r w-5 border-gray-300 m-5" />
          <div className=" md:col-span-5 sm:col-span-12 overflow-scroll no-scrollbar p-5">
            <h1 className="text-xl font-semibold pt-10 pb-5 text-center">
              User Description
            </h1>
            <div>
              <ul>
                {/* <li>
                <h1 className="text-lg font-semibold pb-2">Overview</h1>
                <p className="text-md pb-4">
                  Welcome to Sheffield Organic Growers. We are four independent
                  organic growers, on the outskirts of Sheffield. Growing a
                  range of vegetables, fruit and herbs, we sell through
                  independent grocers and veg bag schemes all based in the city
                  of Sheffield. Please note we are not open to the public.
                  Please email vegbagscheme@sheffieldorganicgrowers.co.uk for
                  all inquiries.
                </p>
              </li> */}
                <li>
                  <h1 className="text-lg font-semibold pb-2">Birth Date</h1>
                  <p className="text-md pb-4">
                    {data.birthday.split('T')[0].split('-').reverse().join("-")}
                  </p>
                </li>
                <li>
                  <h1 className="text-lg font-semibold pb-2">Gender</h1>
                  <p className="text-md pb-4">
                    {data.gender?"Female":"Male"}
                  </p>
                </li>
                <li>
                  <h1 className="text-lg font-semibold pb-2">Type</h1>
                  <p className="text-md pb-4">
                    {data.type}
                  </p>
                </li>
                {/* <li>
                <h1 className="text-lg font-semibold pb-2">Address</h1>
                <p className="text-md pb-4">
                  Hazlehurst Ln, Lightwood Ln, Sheffield S8 8BG, United Kingdom
                </p>
              </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>) : status === "loading" ? "loading" : status === "error" ? data : String(data)
  );
};

export default ProfileCMS;
