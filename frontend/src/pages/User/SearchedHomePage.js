import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardContainerUser from "../../components/CardContainerUser";

import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";

const SearchedHomePage = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { query } = useParams();

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
              className={` ${(query === "fruit") ? "bg-lightColor text-darkColor hover:bg-darkColor hover:text-lightColor" : "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-36 p-2 text-2xl rounded-md font-semibold`}
              onClick={() => {
                (query === "fruit") ? navigate(`/user/home`) : navigate(`/user/home/fruit`);
              }}>
              BANDAI
            </button>

            <button
              className={` ${(query === "vegetable") ? "bg-lightColor text-darkColor hover:bg-darkColor hover:text-lightColor" : "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-36 p-2 text-2xl rounded-md font-semibold`}
              onClick={() => {
                (query === "vegetable") ? navigate(`/user/home`) : navigate(`/user/home/vegetable`);
              }}>
              BOOTLEG
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-scroll max-h-screen py-5 no-scrollbar">
        {action === "GET_ALL_PRODUCTS" &&
          status === "data" &&
          (query === "fruit" || query === "vegetable") ? (
          <CardContainerUser
            data={data.filter((product) => product.category.includes(query))}
          />
        ) : action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <CardContainerUser
            data={data.filter((product) =>
              product.name.toLowerCase().includes(query.toLowerCase())
            )}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default SearchedHomePage;
