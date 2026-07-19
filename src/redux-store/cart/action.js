import { toast } from "react-toastify";
import { ADD_TO_CART_FAILURE, 
    ADD_TO_CART_REQUEST,
     ADD_TO_CART_SUCCESS, 
     GET_CART_FAILURE,
      GET_CART_REQUEST,
       GET_CART_SUCCESS, REMOVE_FROM_CART_FAILURE, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./actiontype";

import axios from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;

export const AddToCartRequest = (data) =>async (dispatch) => {

    dispatch({ type: ADD_TO_CART_REQUEST });
    const token = data?.usertoken;
    
    try{
        const response =await axios(`${backendUrl}/cart/getuser`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
            data:data
        });
        
        dispatch({ type:ADD_TO_CART_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type: ADD_TO_CART_FAILURE, payload: error.message });
        
    }

}



export const GetCartRequest = (data) =>async (dispatch) => {

    const usertoken = data.usertoken;
    dispatch({ type: GET_CART_REQUEST });
    try{
        const response = await axios.get(`${backendUrl}/cart`,{
            headers: {
                Authorization: `Bearer ${usertoken}`
            }
        });
        
        dispatch({ type:GET_CART_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type:GET_CART_FAILURE, payload: error.message });
        
    }

}



export const GetCartRequest1 = (data) =>async (dispatch) => {

    dispatch({ type: GET_CART_REQUEST });
    try{
        const response =await axios(`${backendUrl}/cart/getuser`);
        
        dispatch({ type:GET_CART_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type:GET_CART_FAILURE, payload: error.message });
        
    }

}




export const GetCartRequest2 = (data) =>async (dispatch) => {

    dispatch({ type: GET_CART_REQUEST });
    try{
        const response =await axios(`${backendUrl}/cart/getuser`);
        
        dispatch({ type:GET_CART_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type:GET_CART_FAILURE, payload: error.message });
        
    }

}