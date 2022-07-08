const initialState = {
  action: "",
  status: "loading",
  data: "Loading",
};

const cmsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        action: "GET_ALL_PRODUCTS",
        status: payload.status,
        data: payload.data,
      };
    case "GET_PRODUCT_BY_ID":
      return {
        ...state,
        action: "GET_PRODUCT_BY_ID",
        status: payload.status,
        data: payload.data,
      };
    case "CREATE":
      return {
        ...state,
        action: "CREATE",
        status: payload.status,
        data: payload.data,
      };
    case "UPDATE":
      return {
        ...state,
        action: "UPDATE",
        status: payload.status,
        data: payload.data,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        action: "DELETE_PRODUCT",
        status: payload.status,
        data: payload.data,
      };
    default:
      return state;
  }
};

export default cmsReducer;
