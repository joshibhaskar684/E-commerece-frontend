import Cookies from "js-cookie";
import {
     LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE





 } from"./actiontype";
import { toast } from "react-toastify";
import axios from "axios";


 const backendUrl=process.env.NEXT_PUBLIC_BACKEND_URL;

 export const LoginUser=(data)=>async(dispatch)=>{
    dispatch({type:LOGIN_USER_REQUEST});
    const router=data.router
    try{
        const res= await axios.post(`${backendUrl}/auth/login`,data ,{
  withCredentials: true
});
     router.push("/");
        dispatch({type:LOGIN_USER_SUCCESS,payload:res.data});
    }
    catch(err){
        toast.error(err.response.data.message);
        dispatch({type:LOGIN_USER_FAILURE,payload:err.message});
    }
 }
 export const LogoutUser = (data) => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_REQUEST });
  try {
    Cookies.remove("usertoken");  // <-- removes cookie
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data });
  } catch (err) {
    toast.error(err.message);
    dispatch({ type: LOGOUT_USER_FAILURE, payload:err.message });
  }
};

  export const RegisterUser=(data)=>async(dispatch)=>{
    dispatch({type:REGISTER_USER_REQUEST});
    try{
        const res= await axios.post(`${backendUrl}/auth/signup`,data, {
  withCredentials: true
});
        dispatch({type:REGISTER_USER_SUCCESS,payload:res.data});
    }
    catch(err){

    toast.error(err.message);
        dispatch({type:REGISTER_USER_FAILURE,payload:err.message});
    }
 }

   export const UpdateUser=(data)=>async(dispatch)=>{
    dispatch({type:UPDATE_USER_REQUEST});
    try{
        const res= await axios.post(`${backendUrl}/user/login`,data);
        const data=res.data;
        dispatch({type:UPDATE_USER_SUCCESS,payload:data});
    }
    catch(err){
        dispatch({type:UPDATE_USER_FAILURE,payload:err.message});
    }
 }

    export const GetUser=(data)=>async(dispatch)=>{
        
        const token=data.token;
    dispatch({type:GET_USER_REQUEST});
    try{
      const res = await axios.get(`${backendUrl}/auth/user/profile`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
        const data=res.data;
        dispatch({type:GET_USER_SUCCESS,payload:data});
    }
    catch(err){
        dispatch({type:GET_USER_FAILURE,payload:err.message});
    }
 }


   export const DeleteUser=(data)=>async(dispatch)=>{
    dispatch({type:DELETE_USER_REQUEST});
    try{
        const res= await axios.post(`${backendUrl}/user/login`,data);
        const data=res.data;
        dispatch({type:DELETE_USER_SUCCESS,payload:data});
    }
    catch(err){
        dispatch({type:DELETE_USER_FAILURE,payload:err.message});
    }
 }