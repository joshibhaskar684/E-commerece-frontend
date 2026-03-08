import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAILURE,
} from "./actiontype";

const initialState = {
    user: null,
    data: null,
    productdetails:null,
    loading: false,
    error: null,

}
export default function CheckOutReducer(state = initialState, action) {

    switch (action.type) {
        case CREATE_PAYMENT_REQUEST:
        case VERIFY_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CREATE_PAYMENT_SUCCESS:

            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }
        case VERIFY_PAYMENT_SUCCESS:
            return {
                ...state,
                productdetails: action.payload,
                loading: false,
                error: null
            }
        case VERIFY_PAYMENT_FAILURE:
        case CREATE_PAYMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }
}