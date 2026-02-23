import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "./actiontype";

const initialState = {
  data:[],
    isLoading: false,
    user: null,
    error: null,
    token: null
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_USER_REQUEST:
        return { ...state, isLoading: true };


        case GET_USER_SUCCESS:
        return { ...state, isLoading: false, data: action.payload };


        
        case GET_USER_FAILURE:
        return { ...state, isLoading: false, error: action.payload };

      default:
        return state;
    }
}



