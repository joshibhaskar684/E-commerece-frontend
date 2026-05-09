import { toast } from "react-toastify";
import { GET_PRODUCT_DETAILS_FAILURE, GET_PRODUCT_DETAILS_REQUEST, GET_PRODUCT_DETAILS_SUCCESS, GET_PRODUCTS_FAILURE, GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS } from "./actiontype";

import axios from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;






export const getProductswithQuery = (data) =>async (dispatch) => {
    const pageno=data.pageno-1;
    const pagesize=data.pagesize;
    const query=data.query;
console.log("get products called")
    dispatch({ type: GET_PRODUCTS_REQUEST });

    try{
        const response =await axios.get(`${backendUrl}/products/page/query/main`,{
            params: {
                pageno,
                pagesize,
                query,
            }
        });
        console.log(response,"from product api user");
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
        
    }

}

export const getProductswithCategory = (data) =>async (dispatch) => {
    const pageno=data.pageno-1;
    const pagesize=data.pagesize;
    const category=data.category;
console.log("get products called")
    dispatch({ type: GET_PRODUCTS_REQUEST });

    try{
        const response =await axios.get(`${backendUrl}/products/page/category/main`,{
            params: {
                pageno,
                pagesize,
                category,
            }
        });
        console.log(response,"from product api user");
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type: GET_PRODUCTS_FAILURE, payload: error.message });
        
    }

}

export const getProducts = (data) =>async (dispatch) => {
    const pageno=data.pageno-1;
    const pagesize=data.pagesize;
console.log("get products called")
    dispatch({ type: GET_PRODUCTS_REQUEST });

    try{
        const response =await axios.get(`${backendUrl}/products/page`,{
            params: {
                pageno,
                pagesize,
            }
        });
        console.log(response,"from product api user");
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