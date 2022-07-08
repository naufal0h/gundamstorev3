import React from "react";
// import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import intToRupiah from "../helpers/rupiah";
import base_url from "../helpers/base_url";

function Card(props) {
  // const [showOptions, setShowOptions] = useState(false);
  // const navigate = useNavigate();
  const data = props.product;
  const url = base_url;
  return (
    <div>
      <div className="w-48 h-80 bg-lightColor rounded-md shadow-sm shadow-neutral-500 hover:shadow-inner hover:inner cursor-pointer mx-auto">
        <img
          className="w-48 h-48 rounded-t-md object-cover"
          alt=""
          src={`${url}/images/${data.ProductImages[0].filename}`}
        />
        <div className="p-2 ">
          <p className="truncate">{data.name}</p>
          <div>
            <p className="font-bold inline">Rp{intToRupiah(data.price)} </p>
            <p className="inline">{data.weight} KG</p>
            {/* <p className="block">{data.category}</p> */}
          </div>
          <div className="flex grid-cols-5">
            <div className="flex col-span-2 w-12">
              <p className="text-accentColor inline text-2xl">
                <AiFillStar />
              </p>
              <p className="inline">{data.rating}</p>
            </div>
            <div className="w-5 text-center">|</div>
            <div className="w-full">
              <p className="inline">Terjual {data.totalSold}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
