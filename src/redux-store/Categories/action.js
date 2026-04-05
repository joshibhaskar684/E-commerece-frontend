import { toast } from "react-toastify";
import { 
   
    GET_CATEGORIES_REQUEST, 
    GET_CATEGORIES_SUCCESS, 
    GET_CATEGORIES_FAILURE
    
} from "./actiontype";

import axios from "axios";


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ;


export const getCategories = () => async (dispatch) => {
    
    dispatch({ type: GET_CATEGORIES_REQUEST });
    try{
        const response =await axios.get(`${backendUrl}/products/category/tree`);
        
        console.log(response.data,"categories data");
        dispatch({ type: GET_CATEGORIES_SUCCESS, payload: response.data });
    }
        catch(error){   
            toast.error("Please try again."+error.message)
        dispatch({ type: GET_CATEGORIES_FAILURE, payload: error.message });
        
    }
}

