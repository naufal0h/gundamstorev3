import React, { useState, useEffect } from "react";
import OrderTable from "../../components/OrderTable";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../actions/shoppingAction";

function OrdersPage() {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrdersByUserId());
  }, []);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (action === "GET_ORDERS_BY_USER_ID" && status === 'data') {
      setOrders(data);
    }
  }, [status]);

  return (
    <div className="py-3 bg-white">
      <div className="container mx-auto min-h-screen">
        <h1 className="font-semibold text-center text-5xl">Your Orders</h1>
        <div className="p-3">
          <div className="flex flex-wrap space-x-2 rounded w-full">
            <button
              className="hover:bg-lightColor hover:text-darkColor w-36 p-2 text-lg rounded-md bg-darkColor text-lightColor font-semibold"
              onClick={() => {
                navigate(`/user/orders/unpaid`);
              }}
            >
              Unpaid
            </button>

            <button
              className="hover:bg-lightColor hover:text-darkColor w-40 p-2 text-lg rounded-md bg-darkColor text-lightColor font-semibold"
              onClick={() => {
                navigate(`/user/orders/ready`);
              }}
            >
              Ready to Collect
            </button>

            <button
              className="hover:bg-lightColor hover:text-darkColor w-36 p-2 text-lg rounded-md bg-darkColor text-lightColor font-semibold"
              onClick={() => {
                navigate(`/user/orders/cancelled`);
              }}
            >
              Cancelled
            </button>
          </div>
        </div>
        <div className="p-5 border border-1">
          {orders ? (
            <OrderTable data={orders} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage