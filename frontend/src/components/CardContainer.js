import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const CardContainer = () => {
  const navigate = useNavigate();
  return (
    <div class="grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-5 ">
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
      <button onClick={() => navigate("/cms/details")}>
        <Card />
      </button>
    </div>
  );
};

export default CardContainer;
