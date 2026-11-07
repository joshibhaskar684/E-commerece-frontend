import { toast } from "react-toastify";
import { 
    ADD_TO_CART_FAILURE, 
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS, 
    GET_CART_FAILURE,
    GET_CART_REQUEST,
    GET_CART_SUCCESS, 
    REMOVE_FROM_CART_FAILURE, 
    REMOVE_FROM_CART_REQUEST, 
    REMOVE_FROM_CART_SUCCESS, 
    UPDATE_CART_ITEM_FAILURE, 
    UPDATE_CART_ITEM_REQUEST, 
    UPDATE_CART_ITEM_SUCCESS,
    CLEAR_CART_REQUEST,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAILURE
} from "./actiontype";

import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Helper to sanitize error message
const sanitizeError = (error, defaultMsg = "An error occurred. Please try again.") => {
    if (error.response?.status === 401 || error.response?.status === 403) {
        return "Your session has expired. Please log in again.";
    }
    const rawMsg = error.response?.data?.message || error.message;
    if (rawMsg) {
        const str = String(rawMsg);
        if (str.toLowerCase().includes("insufficient") || str.toLowerCase().includes("stock")) {
            return "Cannot add more. Maximum available product stock reached.";
        }
        if (str.includes("Exception") || str.includes("cannot be cast") || str.includes("UserPrincipal") || str.includes("Internal Server Error")) {
            return "Session invalid. Please log in again.";
        }
        if (str === "Network Error") {
            return "Network error. Please check your internet connection.";
        }
        return str;
    }
    return defaultMsg;
};

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
        const errorMsg = sanitizeError(error, "Failed to add item to cart. Please try again.");
        toast.error(errorMsg);
        dispatch({
            type: ADD_TO_CART_FAILURE,
            payload: errorMsg
        });
        return { success: false, error: errorMsg };
    }
};

export const GetCartRequest = (data) => async (dispatch) => {
    const usertoken = data?.usertoken;
    if (!usertoken) {
        dispatch({ type: GET_CART_FAILURE, payload: "User not authenticated" });
        return { success: false, error: "User not authenticated" };
    }

    dispatch({ type: GET_CART_REQUEST });
    try {
        const response = await axios.get(`${backendUrl}/cart`, {
            headers: {
                Authorization: `Bearer ${usertoken}`
            }
        });
        
        dispatch({ type: GET_CART_SUCCESS, payload: response.data });
        return { success: true, data: response.data };
    } catch (error) {
        const errorMsg = sanitizeError(error, "Failed to load cart.");
        dispatch({ type: GET_CART_FAILURE, payload: errorMsg });
        return { success: false, error: errorMsg };
    }
};

export const UpdateCartItemRequest = (data) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST });
    const token = data?.usertoken;

    if (!token) {
        const authMsg = "Please log in first to update cart items";
        toast.error(authMsg);
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: authMsg });
        return { success: false, error: authMsg };
    }

    try {
        const response = await axios.put(
            `${backendUrl}/cart/item`,
            {
                productId: data.productId,
                quantity: data.quantity
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: UPDATE_CART_ITEM_SUCCESS,
            payload: response.data
        });

        return { success: true, data: response.data };
    } catch (error) {
        const errorMsg = sanitizeError(error, "Failed to update item quantity");
        toast.error(errorMsg);
        dispatch({
            type: UPDATE_CART_ITEM_FAILURE,
            payload: errorMsg
        });
        return { success: false, error: errorMsg };
    }
};

export const RemoveCartItemRequest = (data) => async (dispatch) => {
    dispatch({ type: REMOVE_FROM_CART_REQUEST });
    const token = data?.usertoken;

    if (!token) {
        const authMsg = "Please log in first to remove items";
        toast.error(authMsg);
        dispatch({ type: REMOVE_FROM_CART_FAILURE, payload: authMsg });
        return { success: false, error: authMsg };
    }

    try {
        const response = await axios.delete(
            `${backendUrl}/cart/item/${data.productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: REMOVE_FROM_CART_SUCCESS,
            payload: response.data
        });

        toast.success("Item removed from cart");
        return { success: true, data: response.data };
    } catch (error) {
        const errorMsg = sanitizeError(error, "Failed to remove item from cart");
        toast.error(errorMsg);
        dispatch({
            type: REMOVE_FROM_CART_FAILURE,
            payload: errorMsg
        });
        return { success: false, error: errorMsg };
    }
};

export const ClearCartRequest = (data) => async (dispatch) => {
    dispatch({ type: CLEAR_CART_REQUEST });
    const token = data?.usertoken;

    if (!token) {
        const authMsg = "Please log in first to clear your cart";
        toast.error(authMsg);
        dispatch({ type: CLEAR_CART_FAILURE, payload: authMsg });
        return { success: false, error: authMsg };
    }

    try {
        const response = await axios.delete(
            `${backendUrl}/cart/clear`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: CLEAR_CART_SUCCESS,
            payload: response.data
        });

        toast.success("Cart cleared");
        return { success: true, data: response.data };
    } catch (error) {
        const errorMsg = sanitizeError(error, "Failed to clear cart");
        toast.error(errorMsg);
        dispatch({
            type: CLEAR_CART_FAILURE,
            payload: errorMsg
        });
        return { success: false, error: errorMsg };
    }
};

// Aliases for backwards compatibility
export const GetCartRequest1 = GetCartRequest;
export const GetCartRequest2 = GetCartRequest;
