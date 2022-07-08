import axios from "axios";
import Swal from "sweetalert2";

import base_url from "../helpers/base_url";

const url = base_url + "/products";

export const getAllProducts = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "GET_ALL_PRODUCTS",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "GET",
      url: url,
    })
      .then((response) => {
        dispatch({
          type: "GET_ALL_PRODUCTS",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_ALL_PRODUCTS",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const getProductById = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "GET_PRODUCT_BY_ID",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "GET",
      url: `${url}/${id}`,
    })
      .then((response) => {
        dispatch({
          type: "GET_PRODUCT_BY_ID",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch((error) => {
        dispatch({
          type: "GET_PRODUCT_BY_ID",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const create = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: "CREATE",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "POST",
      url: url,
      data: data,
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    })
      .then(async (response) => {
        await Swal.fire(
          "Add Product Success!",
          "Congratulations, You've created a Product!",
          "success"
        );
        dispatch({
          type: "CREATE",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch(async (error) => {
        await Swal.fire(
          "Add Product Failed",
          "Please input only positive numbers",
          "error"
        );
        dispatch({
          type: "CREATE",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};

export const update = (data, id) => {
  console.log(data, id);
  return (dispatch) => {
    // loading
    dispatch({
      type: "UPDATE",
      payload: {
        status: "loading",
        data: "loading",
      },
    });

    //success
    axios({
      method: "PUT",
      url: `${url}/${id}`,
      data: data,
    })
      .then(async (response) => {
        console.log(response.data);
        await Swal.fire(
          "Edit Product Success!",
          "Congratulations, You've edited your Product!",
          "success"
        );
        dispatch({
          type: "UPDATE",
          payload: {
            status: "data",
            data: response.data,
          },
        });
      })
      //error
      .catch((error) => {
        dispatch({
          type: "UPDATE",
          payload: {
            status: "error",
            data: error.message,
          },
        });
      });
  };
};
