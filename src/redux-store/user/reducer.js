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





} from "./actiontype";



const initialState = {
    user: null,
    data: [],
    loading: false,
    error: null,

}
export default function UserReducer(state = initialState, action) {

    switch (action.type) {

        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            case LOGOUT_USER_REQUEST:
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case LOGOUT_USER_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
        case DELETE_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null
            }

        case LOGIN_USER_FAILURE:
            case REGISTER_USER_FAILURE:
            case UPDATE_USER_FAILURE:
            case DELETE_USER_FAILURE:
            case LOGOUT_USER_FAILURE:
            case GET_USER_FAILURE:
                
            return {
                ...state,
                user: null,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}