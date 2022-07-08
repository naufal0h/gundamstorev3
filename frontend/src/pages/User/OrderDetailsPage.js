import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  getOrder,
  updatePayment,
  cancelOrder,
} from "../../actions/shoppingAction";

import Modal from "react-modal";
import Swal from "sweetalert2";
import StripeContainer from "../../components/StripeContainer";

import base_url from "../../helpers/base_url";
import intToRupiah from "../../helpers/rupiah";

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const id = Number(useParams().id);
  console.log(id);

  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );

  useEffect(() => {
    dispatch(getOrder(id));
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(55, 49, 52, 0.5)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setOpenModal(false);
    dispatch(updatePayment(id)).then(() => {
      dispatch(getOrder(id));
    });
  }

  const cancelOrderHandler = () => {
    Swal.fire({
      title: "Are you sure you want to cancel this order?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "#0B4619",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(cancelOrder(id)).then(() => {
          dispatch(getOrder(+id));
        });
      }
    });
  };

  return (
    <div className="container mx-auto">
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StripeContainer totalDue={data.totalDue} />
        <div align="center" className="py-5">
          <button
            className="bg-darkColor text-lightColor p-3 rounded font-semibold"
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      </Modal>
      {action === "GET_ORDER" && status === "data" && data !== "Loading" ? (
        <div className="w-full bg-white">
          <h1 className="text-xl text-center font-semibold py-3">
            Order Details
          </h1>
          <div className="flex">
            <h2 className="text-lg text-left font-semibold pl-24 py-3">
              TRANSACTION :
            </h2>
            {data.paymentTrasaction !== null ? (
              <h2 className="text-lg text-right font-bold py-3 pl-5 text-accentColor">
                {data.paymentTrasaction.toUpperCase()}
              </h2>
            ) : (
              <h2 className="text-lg text-right font-bold py-3 pl-5 text-accentColor">
                UNPAID
              </h2>
            )}
          </div>
          <hr className="mx-24" />
          <div className="px-24 py-3">
            <table className="w-full text-sm lg:text-base" cellspacing="0">
              <thead>
                <tr className="h-12 uppercase">
                  <th className="hidden md:table-cell"></th>
                  <th className="text-left">Product</th>
                  <th className="lg:text-right text-left pl-5 lg:pl-0">
                    <span className="lg:hidden" title="Quantity">
                      Qty
                    </span>
                    <span className="hidden lg:inline">Quantity</span>
                  </th>
                  <th className="hidden text-right md:table-cell">
                    Unit price
                  </th>
                  <th className="text-right">Total price</th>
                </tr>
              </thead>
              <tbody>
                {data.Products.map((product, index) => {
                  return (
                    <tr>
                      <td className="hidden pb-4 md:table-cell">
                        <Link to="#">
                          <img
                            src={
                              base_url +
                              "/images/" +
                              product.ProductImages[0].filename
                            }
                            className="w-40 h-30 rounded"
                            alt="Thumbnail"
                          />
                        </Link>
                      </td>
                      <td>
                        <Link to="#">
                          <p className="mb-2 md:ml-4">{product.name}</p>
                        </Link>
                      </td>
                      <td className="text-right md:table-cell pb-3">
                        <span className="text-sm lg:text-base font-medium">
                          {product.LineItem.qty}
                        </span>
                      </td>
                      <td className="hidden text-right md:table-cell pb-3">
                        <span className="text-sm lg:text-base font-medium">
                          {product.price}
                        </span>
                      </td>
                      <td className="text-right pb-3">
                        <span className="text-sm lg:text-base font-bold text-darkColor">
                          {product.price * product.LineItem.qty}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <hr className="pb-6 mt-6" />
            <div className="flex px-2">
              <div className="w-2/3">
                <h1 className="font-semibold text-lg text-center">Detail</h1>
                <div className="py-5">
                  <table>
                    <tbody>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="font-semibold text-md">Transaction</h1>
                        </td>
                        <td>
                          <Link to="#">
                            {data.paymentTrasaction !== null ? (
                              <p className="mb-4 md:ml-4">
                                {data.paymentTrasaction.toUpperCase()}
                              </p>
                            ) : (
                              <p className="mb-4 md:ml-4">-</p>
                            )}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="font-semibold text-md">Order Date</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4">
                              {String(data.createdAt).slice(0, 10)}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="font-semibold text-md">Status</h1>
                        </td>
                        <td>
                          <Link to="#">
                            {data.status === "unpaid" ? (
                              <p className="mb-4 md:ml-4 text-accentColor font-bold">
                                {data.status.toUpperCase()}
                              </p>
                            ) : (
                              <p className="mb-4 md:ml-4 text-darkColor font-bold">
                                {data.status.toUpperCase()}
                              </p>
                            )}
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="border border-1 mx-3" />
              <div className="w-1/3">
                <h1 className="font-semibold text-lg text-center">Subtotal</h1>
                <div className="py-5">
                  <table align="center">
                    <tbody>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="font-semibold text-md">Price</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 text-midColor font-semibold text-right">
                              {intToRupiah(data.subtotal)}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="font-semibold text-md">Discount</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 font-semibold text-red-600 text-right">
                              {data.discount !== 0
                                ? `-${intToRupiah(data.discount)}`
                                : intToRupiah(data.discount)}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="font-semibold text-md">Tax</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 font-semibold text-accentColor text-right">
                              {intToRupiah(data.tax)}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="font-semibold text-md">Total</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 font-bold text-midColor text-right">
                              {intToRupiah(data.totalDue)}
                            </p>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div align="center">
                    {data.status === "unpaid" ? (
                      <div className="space-x-2">
                        <button
                          className="text-lightColor bg-darkColor font-bold p-3 rounded-md mt-5"
                          onClick={() => cancelOrderHandler()}
                        >
                          CANCEL ORDER
                        </button>
                        <button
                          className="text-lightColor bg-darkColor font-bold p-3 rounded-md mt-5"
                          onClick={() => setOpenModal(true)}
                        >
                          PAY NOW
                        </button>
                      </div>
                    ) : data.status === "cancelled" ? (
                      <div className="text-lightColor bg-red-600 font-bold p-3 rounded-md mt-5">
                        CANCELLED
                      </div>
                    ) : (
                      <div className="text-lightColor bg-darkColor font-bold p-3 rounded-md mt-5">
                        ORDER HAS BEEN PAID
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="mx-5" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderDetailsPage;
