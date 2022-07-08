import React from "react";

const OrderFilter = () => {
  return (
    <div className="flex flex-wrap space-x-2 p-3 bg-darkColor rounded w-full">
      <label htmlFor="toggleA" className="flex items-center cursor-pointer">
        <div className="relative">
          <input id="toggleA" type="checkbox" className="sr-only" />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">Unpaid</div>
      </label>

      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input id="toggleB" type="checkbox" className="sr-only" />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">Paid</div>
      </label>

      <label htmlFor="toggleC" className="flex items-center cursor-pointer">
        <div className="relative">
          <input id="toggleC" type="checkbox" className="sr-only" />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">Ready to Collect</div>
      </label>

      <label htmlFor="toggleD" className="flex items-center cursor-pointer">
        <div className="relative">
          <input id="toggleD" type="checkbox" className="sr-only" />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">Completed</div>
      </label>

      <label htmlFor="toggleE" className="flex items-center cursor-pointer">
        <div className="relative">
          <input id="toggleE" type="checkbox" className="sr-only" />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-lightColor font-medium">Failed</div>
      </label>
    </div>
  );
};

export default OrderFilter;
