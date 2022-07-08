import React from "react";

const CategoryCard = () => {
  return (
    <div class="flex flex-wrap space-x-2 p-3 bg-darkColor rounded w-1/3">
      <label for="toogleA" class="flex items-center cursor-pointer">
        <div class="relative">
          <input id="toogleA" type="checkbox" class="sr-only" />
          <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div class="ml-3 text-lightColor font-medium">BANDAI</div>
      </label>

      <label for="toogleB" class="flex items-center cursor-pointer">
        <div class="relative">
          <input id="toogleB" type="checkbox" class="sr-only" />
          <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div class="ml-3 text-lightColor font-medium">BOOTLEG</div>
      </label>
    </div>
  );
};

export default CategoryCard;
