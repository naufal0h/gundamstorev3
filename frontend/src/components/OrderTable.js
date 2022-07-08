import React from "react";
import { useNavigate, Link } from "react-router-dom";
import intToRupiah from "../helpers/rupiah";

const OrderTable = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  return (
    <div>
      <table className="w-full text-sm lg:text-base" cellSpacing="0">
        <thead>
          <tr className="h-12 uppercase">
            <th className="text-left">No</th>
            <th className="md:visible invisible text-left">Transaction</th>
            <th className="lg:text-right text-left">
              <span className="lg:inline">Order Date</span>
            </th>
            <th className="md:visible invisible text-right">Price</th>
            <th className="text-right">Total price</th>
            <th className="text-right">Status</th>
            {/* <th className="text-right">Order Status</th> */}
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((order, index) => {
              return (
                <tr
                  className="border"
                  key={index}
                  onClick={() => navigate("/user/orderDetail/" + order.id)}
                >
                  <td className="pb-4 md:table-cell p-2">
                    <Link to="#">
                      <p className="md:table-cell">{index + 1}</p>
                    </Link>
                  </td>
                  <td className="md:visible invisible text-left md:table-cell pb-3 p-2">
                    {order.status === "unpaid" ? (
                      <span className="text-sm lg:text-base font-bold text-darkColor ">
                        UNPAID
                      </span>
                    ) : order.status === "ready to collect" ? (
                      <span className="text-sm lg:text-base font-bold text-darkColor ">
                        READY TO COLLECT
                      </span>
                    ) : order.status === "cancelled" ? (
                      <span className="text-sm lg:text-base font-bold text-darkColor ">
                        CANCELLED
                      </span>
                    ) : (
                      <></>
                    )}
                  </td>
                  <td className="text-right md:table-cell pb-3">
                    <span className="text-sm lg:text-base font-medium">
                      {String(order.createdAt).split('T')[0].split('-').reverse().join("-")}
                    </span>
                  </td>
                  <td className="md:visible invisible text-right md:table-cell pb-3">
                    <span className="text-sm lg:text-base font-medium">
                      {`Rp${intToRupiah(+order.subtotal)}`}
                    </span>
                  </td>
                  <td className="text-right md:table-cell pb-3">
                    <span className="text-sm lg:text-base font-medium">
                      {`Rp${intToRupiah(+order.totalDue)}`}
                    </span>
                  </td>
                  {order.status !== null ? (
                    <td className="text-right md:table-cell pb-3 p-2">
                      <span className="text-sm lg:text-base font-bold text-darkColor ">
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                  ) : (
                    <td className="text-right md:table-cell pb-3 p-2">
                      <span className="text-sm lg:text-base font-bold text-darkColor ">
                        UNPAID
                      </span>
                    </td>
                  )}
                </tr>
              );
            })
            : console.log(data)}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
