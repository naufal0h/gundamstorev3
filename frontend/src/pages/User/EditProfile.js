import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../actions/userActions";
import url from "../../helpers/base_url";

function CMSProfile() {
  const { action, status, data } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "",
    birthday: "",
    password: "",
    avatar: null,
    type: "",
  });

  useEffect(() => {
    if (action === "GET_USER" && status === "data") {
      setForm({
        username: data.username,
        email: data.email,
        gender: data.gender,
        birthday: data.birthday.split("T")[0],
        password: "",
        avatar: null,
        type: data.type,
      });
    } else if (action === "UPDATE_USER" && status === "data") {
      dispatch(getUser());
    }
  }, [data, dispatch]);

  const submitHandler = () => {
    console.log(form);
    let formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("birthday", form.birthday);
    formData.append("gender", form.gender);
    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }
    formData.append("type", "user");
    dispatch(updateUser(formData));
  };

  useEffect(() => {
    if (action === "UPDATE_USER" && status === "data") {
      navigate("/user/profile");
    }
  });
  return (
    <div className="overflow-scroll max-h-screen py-5 no-scrollbar">
      <div className="mx-auto lg:w-2/5 md:w-3/5 sm:w-96 bg-white rounded-md">
        <div className="p-5">
          <div className="py-4 text-5xl font-bold text-darkColor text-center">
            Edit Profile
          </div>{" "}
          <hr className="border-green-800 mx-5" />
          <div className="px-5 py-5">
            <div className="overflow-x-scroll flex space-x-8">
              <div className="mx-auto my-5 w-40 h-40 bg-white border-4 border-darkColor relative cursor-pointer rounded-full flex justify-center items-center">
                <label
                  className="cursor-pointer custom-file-upload"
                  htmlFor="file-upload"
                >
                  <img
                    className="mx-auto object-cover w-36 h-36 rounded-full"
                    src={
                      form.avatar
                        ? URL.createObjectURL(form.avatar)
                        : url + "/images/" + data.avatar
                    }
                    alt="Flower and sky"
                  />
                </label>
                <input
                  className="hidden"
                  id="file-upload"
                  type="file"
                  name="image"
                  accept="image"
                  onChange={(e) => {
                    setForm({ ...form, avatar: e.target.files[0] });
                  }}
                />
                <div className=" bg-darkColor rounded-full absolute top-0 left-0 px-2 py-2">
                  <div className="text-2xl text-lightColor">
                    <BiPencil />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 py-2">
            <label className="block text-darkColor text-lg font-bold pb-2">
              Username
            </label>
            <input
              type="text"
              className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-darkColor text-lg font-bold pb-2">
              Email
            </label>
            <input
              type="text"
              className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-darkColor text-lg font-bold pb-2">
              Password
            </label>
            <input
              type="password"
              className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-full"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-darkColor text-lg font-bold pb-2">
              Birth Date
            </label>
            <input
              type="date"
              className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
              value={form.birthday}
              onChange={(e) => setForm({ ...form, birthday: e.target.value })}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-darkColor text-lg font-bold pb-2">
              Gender
            </label>
            <select
              className="border hover:border-green-800 focus:border-darkColor p-2 rounded-md bg-lightColor w-2/5"
              name="gender"
              id="gender"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="false">Male</option>
              <option value="true">Female</option>
            </select>
          </div>
          <div className="px-5 py-8">
            <button
              className="text-2xl py-2 border text-lightColor hover:border-lightColor focus:border-lightColor bg-darkColor p-2 rounded-md w-full"
              name="condition"
              id="condition"
              onClick={() => submitHandler()}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CMSProfile;
