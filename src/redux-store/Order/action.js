import { toast } from "react-toastify";
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_DETAILS_FAILURE, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS } from "./actiontype";


import axios from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;

export const getOrderRequest = (data) =>async (dispatch) => {

    dispatch({ type: GET_ORDER_REQUEST });
    try{
        const response =await axios(`${backendUrl}/user/getuser`);
        
        dispatch({ type: GET_ORDER_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type: GET_ORDER_FAILURE, payload: error.message });
        
    }

}