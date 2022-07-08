import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardContainerUser from "../../components/CardContainerUser";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const HomePage = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="mx-auto md:container">
      <div className="py-3">
      </div>
      <div>
        <div>
          <h1 className="font-bold text-xl mt-3">
            Choose from these categories
          </h1>
        </div>
        <div className="p-3">
          <div className="flex flex-wrap space-x-2 p-3 rounded w-fit">
            
            <button
              className="hover:bg-lightColor hover:text-darkColor w-36 p-2 text-2xl rounded-md bg-darkColor text-lightColor font-semibold"
              onClick={() => {
                navigate(`/user/home/fruit`);
              }}>
                BANDAI
            </button>
          
            <button
              className="hover:bg-lightColor hover:text-darkColor w-36 p-2 text-2xl rounded-md bg-darkColor text-lightColor font-semibold"
              onClick={() => {
                navigate(`/user/home/vegetable`);
              }}>
                BOOTLEG
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen py-5 no-scrollbar">
        {action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <CardContainerUser data={data} />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default HomePage;
