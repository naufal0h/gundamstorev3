import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { BiPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { create } from "../../actions/cmsActions";

function AddProduct() {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: 0,
    stock: 0,
    expire: null,
    weight: 0,
    unit: "",
    category: "fruit",
    condition: "ripe",
  });

  const [images, setImages] = useState([]);

  const addProductHandler = () => {
    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("expire", form.expire);
    formData.append("weight", form.weight);
    formData.append("unit", form.unit);
    formData.append("category", form.category);
    formData.append("condition", form.condition);

    if (images.length !== 0) {
      for (const image of images) {
        formData.append("filename", image);
      }
    }
    dispatch(create(formData));
  };

  useEffect(() => {
    if (action === "CREATE" && status === "data") {
      navigate("/cms/dashboard");
    }
  }, [data]);

  const addImagesHandler = (files) => {
    setImages([...images, ...files]);
  };

  return (
    <div className="mx-auto lg:w-2/5 md:w-3/5 sm:w-96 bg-white rounded-md overflow-scroll max-h-screen py-5 no-scrollbar">
      <div className="p-5">
        <div className="py-4 text-5xl font-bold text-darkColor text-center">
          Add Product
        </div>
        <hr className="border-green-800 mx-5" />
        <div className="px-5 py-5">
          <div className="overflow-x-scroll flex space-x-8">
            {images !== undefined ? (
              Array.from(images).map((img, index) => {
                return (
                  <div
                    className="flex-shrink-0 my-5 w-36 h-36 bg-gray-100 shadow-gray-600 shadow-md text-gray-500 p-2 rounded-md cursor-pointer"
                    key={index}
                  >
                    <label
                      className="cursor-pointer custom-file-upload"
                      htmlFor="file-upload"
                    >
                      <div className="text-7xl">
                        <img
                          className="object-cover w-32 h-32"
                          src={
                            img
                              ? URL.createObjectURL(img)
                              : "https://www.w3schools.com/howto/img_avatar.png"
                          }
                        />
                      </div>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple="multiple"
                      accept="image/*"
                      name="filename"
                      id="file-upload"
                      onChange={(e) =>
                        setImages([...images, ...e.target.files])
                      }
                    />
                  </div>
                );
              })
            ) : (
              <></>
            )}

            <div className="flex-shrink-0 my-5 w-36 h-36 bg-gray-100 shadow-gray-600 shadow-md text-gray-500 p-2 rounded-md cursor-pointer">
              <label
                className="cursor-pointer custom-file-upload"
                htmlFor="file-upload"
              >
                <div className="text-2xl">
                  <IoAddCircleOutline />
                </div>
                <div className="text-7xl">
                  <FaRobot className="m-auto" />
                </div>
                <p className="text-center">Tambah foto</p>
              </label>
              <input
                className="hidden"
                type="file"
                multiple="multiple"
                accept="image/*"
                name="filename"
                id="file-upload"
                onChange={(e) => addImagesHandler(e.target.files)}
              />
            </div>
          </div>
        </div>

        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Name
          </label>
          <input
            type="text"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Description
          </label>
          <textarea
            rows="4"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          ></textarea>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Price
          </label>
          <input
            type="number"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Stock
          </label>
          <input
            type="number"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Expired Date
          </label>
          <input
            type="date"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
            onChange={(e) => setForm({ ...form, expire: e.target.value })}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Weight
          </label>
          <input
            type="number"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Unit
          </label>
          <input
            type="text"
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          ></input>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Category
          </label>
          <select
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
            name="category"
            id="category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="fruit">BANDAI</option>
            <option value="vegetable">BOOTLEG</option>
          </select>
        </div>
        <div className="px-5 py-2">
          <label className="block text-darkColor text-lg font-bold pb-2">
            Condition
          </label>
          <select
            className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
            name="condition"
            id="condition"
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
          >
            <option value="ripe">Baru</option>
            <option value="raw">Bekas</option>
          </select>
        </div>
        <div className="px-5 py-5">
          <button
            className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
            name="condition"
            id="condition"
            onClick={() => {
              addProductHandler();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
