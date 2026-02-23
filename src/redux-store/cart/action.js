import { toast } from "react-toastify";
import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_FROM_CART_FAILURE, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./actiontype";

import axios from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;

export const getUserRequest = (data) =>async (dispatch) => {

    dispatch({ type: GET_USER_REQUEST });
    try{
        const response =await axios(`${backendUrl}/user/getuser`);
        
        dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type: GET_USER_FAILURE, payload: error.message });
        
    }

}