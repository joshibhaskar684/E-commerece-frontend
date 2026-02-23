import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_DETAILS_FAILURE, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "./actiontype";


const initialState = {
  data:[],
    isLoading: false,
    user: null,
    error: null,
    token: null
}

export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_ORDER_DETAILS_REQUEST:
        case GET_ORDER_REQUEST:
          case CREATE_ORDER_REQUEST:
        return { ...state, isLoading: true };


        case GET_ORDER_DETAILS_SUCCESS:
          case GET_ORDER_SUCCESS:
            case CREATE_ORDER_SUCCESS:
        return { ...state, isLoading: false, data: action.payload };


        
        case GET_ORDER_FAILURE:
          case CREATE_ORDER_FAILURE:
            case GET_ORDER_DETAILS_FAILURE:
        return { ...state, isLoading: false, error: action.payload };

      default:
        return state;
    }
}



