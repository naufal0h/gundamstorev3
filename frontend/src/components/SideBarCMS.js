import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import CMSRoute from "../Routes/CMSRoute";
import Swal from "sweetalert2";

function SideBarCMS() {
  const [showDashboard, setShowDashboard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") && localStorage.getItem("type") === "user") {
      navigate('/user/home');
    }else if (!localStorage.getItem("access_token") || localStorage.getItem("type") !== "cms") {
      navigate('/login')
    }
  }, []);

  return (
    <div className="flex">
      <aside
        className={`flex transform top-0 left-0 w-96 fixed h-screen overflow-auto ease-in-out transition-all duration-300 z-[3] ${showDashboard ? "translate-x-0" : "-translate-x-3/4"
          } `}
      >
        <div className="justify-between border-r-4 border-lightColor pt-6 w-3/4 bg-darkColor">
          <div>
            <div className=" text-3xl h-2/12 font-semibold text-center text-lightColor">
              Gundam Store
            </div>
            <div className=" text-lg h-2/12 font-semibold text-center mt-2 text-lightColor">
              <em>Admin Dashboard</em>
            </div>
          </div>
          <div className="mx-auto flex">
            <ul className="my-2">
              <li className="my-2">
                <button
                  className="flex items-center px-4 py-2 text-lightColor bg-darkColor hover:bg-lightColor hover:text-darkColor rounded-md "
                  onClick={() => navigate("/cms/dashboard")}
                >
                  <FaRobot size={25} />
                  <span className="mx-4 font-medium">Products</span>
                </button>
              </li>

              <li className="my-2">
                <button
                  className="flex items-center px-4 py-2 text-lightColor bg-darkColor hover:bg-lightColor hover:text-darkColor rounded-md "
                  onClick={() => navigate("/cms/profile")}
                >
                  <CgProfile size={25} />
                  <span className="mx-4 font-medium">Profile</span>
                </button>
              </li>

              <li className="my-2 absolute bottom-5">
                <button
                  className="flex items-center px-4 py-2 text-lightColor bg-darkColor hover:bg-lightColor hover:text-darkColor rounded-md "
                  onClick={() => {
                    localStorage.clear();
                    Swal.fire("Logout Success!", "See you later!", "success");
                    navigate("/login");
                  }}
                >
                  <BiLogOut size={25} />
                  <span className="mx-4 font-medium">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/4 flex justify-center items-center max-h-screen">
          <div className="h-14 w-14 bg-darkColor rounded-full flex justify-center items-center">
            <button
              className="h-12 w-12 bg-lightColor text-darkColor text-2xl flex justify-center items-center rounded-full"
              onClick={() => setShowDashboard(!showDashboard)}
            >
              <HiMenu />
            </button>
          </div>
        </div>
      </aside>
      <main className="mx-auto w-full">
        <div className="container mx-auto">
          <CMSRoute />
        </div>
      </main>
    </div>
  );
}

export default SideBarCMS;