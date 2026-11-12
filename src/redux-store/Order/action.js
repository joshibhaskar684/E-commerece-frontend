import { toast } from "react-toastify";
import { 
  CREATE_ORDER_FAILURE, 
  CREATE_ORDER_REQUEST, 
  CREATE_ORDER_SUCCESS, 
  GET_ORDER_DETAILS_FAILURE, 
  GET_ORDER_DETAILS_REQUEST, 
  GET_ORDER_DETAILS_SUCCESS, 
  GET_ORDER_FAILURE, 
  GET_ORDER_REQUEST, 
  GET_ORDER_SUCCESS 
} from "./actiontype";
import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Helper to get auth headers
const getAuthHeaders = (token) => {
  const authToken = token || Cookies.get("usertoken");
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
};

export const getOrderRequest = (data = {}) => async (dispatch) => {
  dispatch({ type: GET_ORDER_REQUEST });
  try {
    const pageno = data?.pageno ?? 0;
    const pagesize = data?.pagesize ?? 20;
    const response = await axios.get(`${backendUrl}/orders`, {
      headers: getAuthHeaders(data?.usertoken),
      params: { pageno, pagesize }
    });
    
    dispatch({ type: GET_ORDER_SUCCESS, payload: response.data });
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error?.response?.data?.message || error?.message || "Failed to fetch orders";
    dispatch({ type: GET_ORDER_FAILURE, payload: errorMsg });
    return { success: false, error: errorMsg };
  }
};

export const getOrderDetailsByOrderId = (data) => async (dispatch) => {
  dispatch({ type: GET_ORDER_DETAILS_REQUEST });
  const orderId = typeof data === 'object' ? (data?.orderId || data?.id) : data;
  try {
    const response = await axios.get(`${backendUrl}/orders/${orderId}`, {
      headers: getAuthHeaders(data?.usertoken)
    });
    
    dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload: response.data });
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error?.response?.data?.message || error?.message || "Failed to fetch order details";
    dispatch({ type: GET_ORDER_DETAILS_FAILURE, payload: errorMsg });
    return { success: false, error: errorMsg };
  }
};

export const cancelOrderRequest = (data) => async (dispatch) => {
  const orderId = typeof data === 'object' ? (data?.orderId || data?.id) : data;
  try {
    const response = await axios.post(`${backendUrl}/orders/${orderId}/cancel`, {}, {
      headers: getAuthHeaders(data?.usertoken)
    });
    toast.success("Order cancelled successfully");
    dispatch(getOrderRequest({ usertoken: data?.usertoken }));
    return { success: true, data: response.data };
  } catch (error) {
    const errorMsg = error?.response?.data?.message || error?.message || "Failed to cancel order";
    toast.error(errorMsg);
    return { success: false, error: errorMsg };
  }
};

export const getOrderDetailsByUserId = (data) => async (dispatch) => {
  return dispatch(getOrderRequest(data));
};

export const getOrderDetailsRequest1 = (data) => async (dispatch) => {
  return dispatch(getOrderRequest(data));
};
