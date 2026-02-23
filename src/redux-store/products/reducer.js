import { GET_PRODUCT_DETAILS_FAILURE, GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "./actiontype";

const initialState = {
  data:[],
    isLoading: false,
    user: null,
    error: null,
    token: null
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_PRODUCTS_REQUEST:
        case GET_PRODUCT_DETAILS_REQUEST:
        return { ...state, isLoading: true };


        case GET_PRODUCTS_SUCCESS:
          case GET_PRODUCT_DETAILS_SUCCESS:
        return { ...state, isLoading: false, data: action.payload };
        
        case GET_PRODUCTS_FAILURE:
          case GET_PRODUCT_DETAILS_FAILURE:
        return { ...state, isLoading: false, error: action.payload };

      default:
        return state;
    }
}



