import { 
   
    GET_CATEGORIES_REQUEST, 
    GET_CATEGORIES_SUCCESS, 
    GET_CATEGORIES_FAILURE
    
} from "./actiontype";
const initialState = {
  data:[],
    isLoading: false,
    user: null,
    error: null,
    token: null
}

export const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_CATEGORIES_REQUEST:
        return { ...state, isLoading: true };

        case GET_CATEGORIES_SUCCESS:
        return { ...state, isLoading: false, data: action.payload };
        case GET_CATEGORIES_FAILURE:
        return { ...state, isLoading: false, error: action.payload };

      default:
        return state;
    }
}




