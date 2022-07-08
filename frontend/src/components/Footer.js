import React from "react";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
} from "react-icons/ai";
import logo from "../assets/images/gundam.png";

function Footer() {
  return (
    <div className="text-darkColor">
      <div className="grid p-10 md:grid-cols-3 sm:grid-cols-1 bg-lightColor">
        <div className="text-2xl mx-auto mb-10">
          <ul>
            <li className="text-3xl font-bold">GUNDAM STORE</li>
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
          </ul>
        </div>
        <div className="mx-auto mb-10">
          <div className="font-bold text-2xl">Follow Us</div>
          <div className="flex grid-cols-4 text-6xl space-x-4">
            <div className="">
              <AiFillInstagram />
            </div>
            <div className="">
              <AiFillFacebook />
            </div>
            <div className="">
              <AiFillTwitterSquare />
            </div>
            <div className="">
              <AiFillYoutube />
            </div>
          </div>
        </div>
        <div className="align-right w-40 mb-10">
          <img className="mx-auto" src={logo} alt="logo" />
        </div>
      </div>
      <div className="flex text-center text-lightColor bg-darkColor h-14">
        <div className="m-auto text-2xl">
        </div>
      </div>
    </div>
  );
}

export default Footer;
