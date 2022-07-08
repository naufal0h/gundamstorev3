import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import CardContainerCMS from "../../components/CardContainerCMS";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const CMSSearchedDashboard = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query } = useParams();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div>
      <h1 className="text-xl font-bold py-3">Welcome, Admin!</h1>
      <div className="flex py-2">
        <h2 className="flex flex-col text-lg font-semibold py-2">
          Your Products
        </h2>
        <div className="flex absolute right-40 top-5">
          <input
            className="rounded mt-6 p-2 w-full"
            placeholder="Search"
          ></input>
          <button
            className="ml-1 mt-6 p-3 rounded bg-white text-darkColor hover:bg-midColor hover:text-white"
            onClick={() => navigate("/cms/dashboard")}
          >
            <ImCross />
          </button>
        </div>
      </div>
      <hr />
      <div className="overflow-scroll max-h-screen py-5 no-scrollbar">
        {action === "GET_ALL_PRODUCTS" &&
        status === "data" &&
        (query === "fruit" || query === "vegetable") ? (
          <CardContainerCMS
            data={data.filter((product) => product.category.includes(query))}
          />
        ) : action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <CardContainerCMS
            data={data.filter((product) =>
              product.name.toLowerCase().includes(query.toLowerCase())
            )}
          />
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

export default CMSSearchedDashboard;
