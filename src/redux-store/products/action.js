import { toast } from "react-toastify";
import { GET_PRODUCT_DETAILS_FAILURE, GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from "./actiontype";

import axios from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;

export const getProducts = (data) =>async (dispatch) => {
console.log("get products called")
    dispatch({ type: GET_PRODUCTS_REQUEST });

    try{
         const res = await axios.get(`${backendUrl}/products/test`);
    console.log('Response data:', res.data);
        const response =await axios.get(`${backendUrl}/products`);
        console.log(response);
        
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
        
    }

}
export const getProductDetailsById = (data) =>async (dispatch) => {
    const productId=data.id;
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });
    try{
        const response =await axios.get(`${backendUrl}/products/${productId}`);
        console.log(response);
        dispatch({ type: GET_PRODUCT_DETAILS_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type: GET_PRODUCT_DETAILS_FAILURE , payload: error.message });
        
    }

}