import React, { useEffect } from "react";
import OrderTable from "../../components/OrderTable";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../actions/shoppingAction";

const FilteredOrdersPage = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { query } = useParams();
  // console.log(query);

  useEffect(() => {
    dispatch(getOrdersByUserId());
  }, []);

  // useEffect(() => {
  //   console.log(action, "||", status, "||", data, "||");
  // }, [status]);

  return (
    <div className="py-3 bg-white">
      <div className="container mx-auto min-h-screen">
        <h1 className="font-semibold text-center text-5xl py-3">Your Orders</h1>
        <div className="p-3">
          <div className="flex flex-wrap space-x-2 rounded w-full">
            <button
              className={`${(query === "unpaid") ? "bg-lightColor text-darkColor hover:bg-darkColor hover:text-lightColor" : "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-36 p-2 text-lg rounded-md  font-semibold`}
              onClick={() => {
                (query === "unpaid") ? navigate(`/user/orders`) : navigate(`/user/orders/unpaid`);
              }}
            >
              Unpaid
            </button>

            <button
              className={`${(query === "ready") ? "bg-lightColor text-darkColor hover:bg-darkColor hover:text-lightColor" : "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-40 p-2 text-lg rounded-md  font-semibold`}
              onClick={() => {
                (query === "ready") ? navigate(`/user/orders`) : navigate(`/user/orders/ready`);
              }}
            >
              Ready to Collect
            </button>

            <button
              className={`${(query === "cancelled") ? "bg-lightColor text-darkColor hover:bg-darkColor hover:text-lightColor" : "hover:bg-lightColor hover:text-darkColor bg-darkColor text-lightColor"} w-36 p-2 text-lg rounded-md  font-semibold`}
              onClick={() => {
                (query === "cancelled") ? navigate(`/user/orders`) : navigate(`/user/orders/cancelled`);
              }}
            >
              Cancelled
            </button>
          </div>
        </div>
        <div className="p-5 border border-1">
          {action === "GET_ORDERS_BY_USER_ID" && status === "data" ? (
            <OrderTable
              data={data.filter((order) => order.status.includes(query))}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredOrdersPage;
