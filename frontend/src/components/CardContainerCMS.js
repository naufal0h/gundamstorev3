
import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const CardContainerCMS = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  return (
    <div className="grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-5 ">
      {data.map((product,index) => {
        return (
          <button key={index} onClick={() => navigate(`/cms/details/${product.id}`)}>
            <Card product={product} />
          </button>
        );
      })}
    </div>
  );
};

export default CardContainerCMS;