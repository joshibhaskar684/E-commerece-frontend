import { toast } from "react-toastify";
import { ADD_TO_CART_FAILURE, 
    ADD_TO_CART_REQUEST,
     ADD_TO_CART_SUCCESS, 
     GET_CART_FAILURE,
      GET_CART_REQUEST,
       GET_CART_SUCCESS, REMOVE_FROM_CART_FAILURE, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./actiontype";

import axios from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;

export const AddToCartRequest = (data) => async (dispatch) => {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const token = data?.usertoken;

    if (!token) {
        const authMsg = "Please login first to add items to your cart";
        toast.error(authMsg);
        dispatch({
            type: ADD_TO_CART_FAILURE,
            payload: authMsg
        });
        return { success: false, error: authMsg };
    }

    const requestData = {
        productId: data?.productId,
        quantity: data?.quantity || 1,
        productName: data?.productName,
        productImage: data?.productImage,
        price: data?.price
    };

    try {
        const response = await axios.post(
            `${backendUrl}/cart/item/add`,
            requestData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: response.data
        });

        const itemName = data?.productName ? `"${data.productName}"` : "Item";
        toast.success(`${itemName} added to cart successfully!`);

        return { success: true, data: response.data };
    } catch (error) {
        let errorMsg = "Failed to add item to cart. Please try again.";

        if (error.response?.status === 401 || error.response?.status === 403) {
            errorMsg = "Your session has expired. Please login again.";
        } else if (error.response?.data?.message) {
            const rawMsg = String(error.response.data.message);
            if (
                rawMsg.includes("Exception") ||
                rawMsg.includes("cannot be cast") ||
                rawMsg.includes("UserPrincipal") ||
                rawMsg.includes("Internal Server Error")
            ) {
                errorMsg = "Session invalid. Please login again to add items.";
            } else {
                errorMsg = rawMsg;
            }
        } else if (error.message) {
            if (error.message === "Network Error") {
                errorMsg = "Network error. Please check your connection and try again.";
            } else {
                errorMsg = error.message;
            }
        }

        toast.error(errorMsg);

        dispatch({
            type: ADD_TO_CART_FAILURE,
            payload: errorMsg
        });

        return { success: false, error: errorMsg };
    }
};



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