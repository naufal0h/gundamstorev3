import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import {
  BsCurrencyDollar,
  BsBasketFill,
  BsFillStarFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../actions/cmsActions";
import {
  addToCart,
  getCartByUserId,
  addViews,
} from "../../actions/shoppingAction";

import intToRupiah from "../../helpers/rupiah";

import Swal from "sweetalert2";

import base_url from "../../helpers/base_url";

const ProductDetailsUser = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  useEffect(() => {
    dispatch(addViews(id));
    dispatch(getProductById(id));
  }, []);

  async function inputQty() {
    const { value: qty } = await Swal.fire({
      title: "Input the desired quantity",
      input: "number",
      inputLabel: "Product Quantity",
      inputPlaceholder: "Enter qty",
      confirmButtonColor: "#0B4619",
    });

    if (qty >= 1 && qty <= data.stock) {
      dispatch(
        addToCart({
          ProductId: id,
          qty: qty,
        })
      ).then(() => {
        dispatch(getCartByUserId());
      });
    } else if (qty < 1) {
      Swal.fire(
        "Add to Cart Error",
        "Quantity must be a positive integer!",
        "error"
      );
    } else if (qty > data.stock) {
      Swal.fire(
        "Add to Cart Error",
        "Quantity must not be higher than the Product Stock!",
        "error"
      );
    }
  }

  return (
    <div>
      <div className="grid md:grid-cols-12 sm:grid-cols-1">
        <div className="md:col-span-4 sm:col-span-12 sm:min-h-screen mx-auto ">
          <div className="flex px-5">
            <h1 className="text-lg font-semibold pt-10 pb-5">
              Product Details
            </h1>
          </div>
          <div className="max-w-sm px-5 rounded overflow-hidden">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {action === "GET_PRODUCT_BY_ID" && data !== "loading"
                ? data.ProductImages.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img src={`${url}/images/${img.filename}`}></img>
                      </SwiperSlide>
                    );
                  })
                : "Loading"}
            </Swiper>
            <div className="px-6">
              <div className="font-bold text-xl my-2">{data.name}</div>
              <p className="text-gray-700 text-md my-3">{data.desc}</p>
              <div className="flex py-1">
                {/* <BsCurrencyDollar className="mt-1 mr-3" size={20} /> */}
                Rp
                <p className="text-midColor font-semibold text-md pr-1">
                  {intToRupiah(data.price)}
                </p>
                <p>/ {data.weight} KG</p>
              </div>
              <div className="flex py-2">
                <BsBasketFill className="mr-3" size={20} />
                <p className="text-midColor font-semibold text-md pr-1">
                  {data.stock}
                </p>
                <p>in stock</p>
              </div>
              <div className="flex justify-center mt-2">
                <button
                  className="bg-darkColor text-lightColor p-2 font-semibold rounded-md"
                  onClick={() => inputQty()}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-r w-5 border-gray-300 m-5" />
        <div className="md:col-span-7 sm:col-span-12 overflow-scroll no-scrollbar">
          <div className="p-5">
            <h1 className="text-xl font-semibold pt-10 pb-5 text-center">
              Product Description
            </h1>
            <div>
              <ul>
                <li>
                  <h1 className="text-lg font-semibold pb-2">Description</h1>
                  <p className="text-md pb-4">{data.desc}</p>
                </li>
                {/* <li>
                  <h1 className="text-lg font-semibold pb-2">Category</h1>
                  <p className="text-md pb-4">{data.category}</p>
                </li>
                <li>
                  <h1 className="text-lg font-semibold pb-2">Condition</h1>
                  <p className="text-md pb-4">{data.condition}</p>
                </li> */}
                <li>
                  <h1 className="text-lg font-semibold pb-2">Expiry Date</h1>
                  <p className="text-md pb-4">
                    {String(data.expire).slice(0, 10)}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="p-5">
            <h1 className="text-xl font-semibold pt-5 pb-5 text-center">
              Analytics
            </h1>
            <div className="flex py-5">
              <div className="flex-row w-1/3">
                <div>
                  <h1 className="text-md font-semibold">Rating</h1>
                  <div className="flex py-1">
                    {data.rating !== 0 && data.rating !== null
                      ? [...Array(data.rating)].map((x, i) => (
                          <BsFillStarFill
                            key={i}
                            className="text-accentColor"
                            size={20}
                          />
                        ))
                      : "No ratings given"}
                  </div>
                </div>
              </div>
              <div className="flex-row w-1/3">
                <h1 className="text-md font-semibold">Views</h1>
                <h1 className="text-lg font-bold">{data.views}</h1>
              </div>
              <div className="flex-row w-1/3">
                <h1 className="text-md font-semibold">Total Sold</h1>
                <h1 className="text-lg font-bold">{data.totalSold}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsUser;
