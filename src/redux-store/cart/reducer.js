import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_FROM_CART_FAILURE, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./actiontype";

const initialState = {
  data:[],
    isLoading: false,
    user: null,
    error: null,
    token: null
}

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_CART_REQUEST:
        case ADD_TO_CART_REQUEST:
          case UPDATE_CART_ITEM_REQUEST:
            case REMOVE_FROM_CART_REQUEST:
        return { ...state, isLoading: true };


        case GET_CART_SUCCESS:
          case ADD_TO_CART_SUCCESS:
            case UPDATE_CART_ITEM_SUCCESS:
              case REMOVE_FROM_CART_SUCCESS:
        return { ...state, isLoading: false, data: action.payload };


        
        case GET_CART_FAILURE:
          case ADD_TO_CART_FAILURE:
            case UPDATE_CART_ITEM_FAILURE:
              case REMOVE_FROM_CART_FAILURE:
        return { ...state, isLoading: false, error: action.payload };

      default:
        return state;
    }
}



