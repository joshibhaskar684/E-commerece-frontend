
import { 
  GET_PRODUCT_DETAILS_FAILURE, 
  GET_PRODUCT_DETAILS_REQUEST, 
  GET_PRODUCT_DETAILS_SUCCESS, 
  GET_PRODUCTS_FAILURE, 
  GET_PRODUCTS_REQUEST, 
  GET_PRODUCTS_SUCCESS, 
  GET_USER_FAILURE, 
  GET_USER_REQUEST, 
  GET_USER_SUCCESS,
  GET_SUGGESTIONS_REQUEST,
  GET_SUGGESTIONS_SUCCESS,
  GET_SUGGESTIONS_FAILURE,
  CLEAR_SUGGESTIONS
} from "./actiontype";

const initialState = {
  data: [],
  isLoading: false,
  isSuggestionsLoading: false,
  suggestions: [],
  products: null,
  productdata: null,
  user: null,
  error: null,
  token: null
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {

      case GET_PRODUCTS_REQUEST:
      case GET_PRODUCT_DETAILS_REQUEST:
        return { ...state, isLoading: true };

      case GET_PRODUCTS_SUCCESS:
        return { ...state, isLoading: false, products: action.payload };
        
      case GET_PRODUCT_DETAILS_SUCCESS:
        return { ...state, isLoading: false, productdata: action.payload };
        
      case GET_PRODUCTS_FAILURE:
      case GET_PRODUCT_DETAILS_FAILURE:
        return { ...state, isLoading: false, error: action.payload };

      case GET_SUGGESTIONS_REQUEST:
        return { ...state, isSuggestionsLoading: true };

      case GET_SUGGESTIONS_SUCCESS:
        return { ...state, isSuggestionsLoading: false, suggestions: action.payload || [] };

      case GET_SUGGESTIONS_FAILURE:
        return { ...state, isSuggestionsLoading: false, suggestions: [], error: action.payload };

      case CLEAR_SUGGESTIONS:
        return { ...state, suggestions: [] };

      default:
        return state;
    }
}




