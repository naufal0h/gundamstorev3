import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductFilter = () => {
  const { query } = useParams();

  const [filterSwitch, setFilterSwitch] = useState({
    fruit: query === "fruit" ? true : false,
    vegetable: query === "vegetable" ? true : false
  })

  useEffect(() => {
    if ((filterSwitch.vegetable === true && filterSwitch.fruit === true) || (filterSwitch.vegetable === false && filterSwitch.fruit === false)) {
      navigate(`/user/home`)
    } else {
      if (filterSwitch.vegetable === true) {
        navigate(`/user/home/vegetable`)
      } else if (filterSwitch.fruit === true){
        navigate(`/user/home/fruit`)
      }
    }
  }, [filterSwitch])


  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap space-x-2 p-3 bg-darkColor rounded w-fit">
      <label htmlFor="toogleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleA"
            type="checkbox"
            className="sr-only checked:text-blue"
            checked={filterSwitch.fruit}
            onChange={(e) => {
              setFilterSwitch({ ...filterSwitch, vegetable: false, fruit: !e.target.value });
            }}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">BANDAI</div>
      </label>

      <label htmlFor="toogleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="toogleB"
            type="checkbox"
            className="sr-only"
            checked={filterSwitch.vegetable}
            onChange={(e) => {
              setFilterSwitch({ ...filterSwitch, fruit: false, vegetable: !e.target.value });
            }}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">BOOTLEG</div>
      </label>
    </div>
  );
};

export default ProductFilter;