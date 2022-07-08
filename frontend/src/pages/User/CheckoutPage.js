import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import Header from "../../components/Header";
import StripeContainer from "../../components/StripeContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  updatePayment,
  cancelOrder,
} from "../../actions/shoppingAction";
import Swal from "sweetalert2";

import base_url from "../../helpers/base_url";

const CheckoutPage = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let subtitle;
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getOrder(+id));
  }, []);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(55, 49, 52, 0.5)",
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
    dispatch(updatePayment(+id)).then(() => {
      dispatch(getOrder(+id));
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

  return action === "GET_ORDER_BY_USER_ID" &&
    status === "data" &&
    data !== "loading" ? (
    <div className="container mx-auto">
      <Header />
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
      <div className="w-full bg-white">
        <h1 className="text-xl text-center font-semibold py-3">Checkout</h1>
        <h2 className="text-lg text-left font-semibold px-24 py-3">
          Items Bought
        </h2>
        <hr className="mx-24" />
        <div className="px-24 py-3">
          <table className="w-full text-sm lg:text-base" cellSpacing="0">
            <thead>
              <tr className="h-12 uppercase">
                <th className="hidden md:table-cell"></th>
                <th className="text-left">Product</th>
                <th className="lg:text-right text-left pl-5 lg:pl-0">
                  <span className="lg:hidden" title="Quantity">
                    Qtd
                  </span>
                  <span className="hidden lg:inline">Quantity</span>
                </th>
                <th className="hidden text-right md:table-cell">Unit price</th>
                <th className="text-right">Total price</th>
              </tr>
            </thead>
            <tbody>
              {data.Products !== undefined
                ? data.Products.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td className="hidden pb-4 md:table-cell">
                          <a href="#">
                            <img
                              src={
                                base_url +
                                "/images/" +
                                product.ProductImages[0].filename
                              }
                              className="w-40 h-30 rounded"
                              alt="Thumbnail"
                            />
                          </a>
                        </td>
                        <td>
                          <a href="#">
                            <p className="mb-2 md:ml-4">{product.name}</p>
                          </a>
                        </td>
                        <td className="hidden text-right md:table-cell pb-3">
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
                            {product.LineItem.qty * product.price}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                : "loading"}
            </tbody>
          </table>
          <hr className="pb-6 mt-6" />
          <div className="flex px-2">
            <div className="w-2/3">
              <h1 className="font-semibold text-lg text-center">
                Buyer Details
              </h1>
              <div className="py-5">
                <table>
                  <tbody>
                    <tr>
                      <td className="hidden pb-4 md:table-cell">
                        <h1 className="font-semibold text-md">Name</h1>
                      </td>
                      <td>
                        <a href="#">
                          <p className="mb-4 md:ml-4">{data.User.username}</p>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="hidden pb-4 md:table-cell">
                        <h1 className="font-semibold text-md">Email</h1>
                      </td>
                      <td>
                        <a href="#">
                          <p className="mb-4 md:ml-4">{data.User.email}</p>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="hidden pb-4 md:table-cell">
                        <h1 className="font-semibold text-md">Gender</h1>
                      </td>
                      <td>
                        <a href="#">
                          <p className="mb-4 md:ml-4">
                            {data.User.gender === true ? "Female" : "Male"}
                          </p>
                        </a>
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
                        <a href="#">
                          <p className="mb-4 md:ml-4 text-midColor font-semibold">
                            {data.subtotal}
                          </p>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="hidden pb-4 md:table-cell">
                        <h1 className="font-semibold text-md">Discount</h1>
                      </td>
                      <td>
                        <a href="#">
                          <p className="mb-4 md:ml-4 font-semibold text-red-600">
                            {data.discount}
                          </p>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="hidden pb-4 md:table-cell">
                        <h1 className="font-semibold text-md">Tax</h1>
                      </td>
                      <td>
                        <a href="#">
                          <p className="mb-4 md:ml-4 font-semibold text-accentColor">
                            {data.tax}
                          </p>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="hidden pb-4 md:table-cell">
                        <h1 className="font-semibold text-md">Total</h1>
                      </td>
                      <td>
                        <a href="#">
                          <p className="mb-4 md:ml-4 font-bold text-midColor">
                            {data.totalDue}
                          </p>
                        </a>
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
    </div>
  ) : (
    <></>
  );
};

export default CheckoutPage;
