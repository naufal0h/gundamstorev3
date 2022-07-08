import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import CardContainerCMS from "../../components/CardContainerCMS";
import ProductFilter from "../../components/ProductFilter";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const CMSDashboard = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [query, setQuery] = useState("");
  const [queryDone, setQueryDone] = useState(false);

  useEffect(() => {
    navigate(`/cms/dashboard/${query}`);
  }, [queryDone]);

  return (
    <div className="pt-20">
      <h1 className="text-4xl font-bold py-3">Welcome, Admin!</h1>
      <div className="flex py-2">
        <h2 className="flex flex-col text-lg font-semibold py-2">
          Your Products
        </h2>
        <div className="flex absolute right-40 top-5">
          <input
            className="rounded mt-6 p-2 w-full"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="ml-1 mt-6 p-3 rounded bg-white text-darkColor hover:bg-midColor hover:text-white"
            onClick={() => setQueryDone(true)}
          >
            <FaSearch />
          </button>
        </div>
      </div>
      <hr />
      <div className="p-3">
        <div className="flex flex-wrap space-x-2 p-3  rounded w-fit">
        <button
              className="hover:bg-lightColor hover:text-darkColor w-36 p-2 text-2xl rounded-md bg-darkColor text-lightColor font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/fruit`);
              }}>
                BANDAI
            </button>
          
            <button
              className="hover:bg-lightColor hover:text-darkColor w-36 p-2 text-2xl rounded-md bg-darkColor text-lightColor font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/vegetable`);
              }}>
                BOOTLEG
            </button>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen py-5 no-scrollbar">
        {action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <CardContainerCMS data={data} />
        ) : (
          "loading"
        )}
      </div>
      <div className="fixed right-20 bottom-8">
        <button onClick={() => navigate("/cms/add")}>
          <BsFillPlusCircleFill size={50} className="text-darkColor" />
        </button>
      </div>
    </div>
  );
};

export default CMSDashboard;
