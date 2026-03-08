import axios from "axios";

import { toast } from "react-toastify";
import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  CREATE_PAYMENT_FAILURE,
  VERIFY_PAYMENT_REQUEST,
  VERIFY_PAYMENT_SUCCESS,
  VERIFY_PAYMENT_FAILURE,
} from "./actiontype";



 const backendUrl=process.env.NEXT_PUBLIC_BACKEND_URL;


 
export const CreatePayment = ({ token, id, router }) => async (dispatch) => {
  console.log(token,id,"store")
  dispatch({ type:CREATE_PAYMENT_REQUEST });

  try {
    const response = await axios.post(
      `${backendUrl}/api/payments/${id}`,
      {}, // only send required payload
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const apiData = response.data;
console.log(apiData,"store")

    if (apiData.payment_link_url) {
      router.push(apiData.payment_link_url); // redirect to payment page
    }

    dispatch({ type: CREATE_PAYMENT_SUCCESS, payload: apiData });
   
  } catch (error) {
    toast.error(error.message);
    const errorMessage = error.response?.data || error.message;
    dispatch({ type: CREATE_PAYMENT_FAILURE, payload: errorMessage });

    toast.error(`Payment Error: ${errorMessage}`, { autoClose: 1500 });
    
  }
};

export const VerifyPayment = (data) => async (dispatch) => {
  console.log(data,"store")
  const {
    razorpay_payment_id,
    razorpay_payment_link_id,
    razorpay_payment_link_status,
    token,
    id,
  } = data;

  dispatch({ type: VERIFY_PAYMENT_REQUEST });
  console.log("payment verified")
  try {
    const response = await axios.get(`${backendUrl}/api/payments`, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  params: {
    razorpay_payment_id,
    razorpay_payment_link_id,
    razorpay_payment_link_status,
    purchase_id: id,
  },
});


    dispatch({ type: VERIFY_PAYMENT_SUCCESS, payload: response.data });
    console.log("payment verified")
     } catch (error) {
    dispatch({ type:  VERIFY_PAYMENT_FAILURE, payload: error.message });
    toast.error(`Verification failed: ${error.message}`, { autoClose: 1500 });
    }
};
