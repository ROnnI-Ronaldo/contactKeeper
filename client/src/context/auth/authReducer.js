import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case REGISTER_SUCCESS :
            //set the token to localStorage
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated : true,
                loading: false
            }
        case REGISTER_FAILED : 
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                user: null,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS : 
            return {
                ...state,
                error: null
            }
        default: return state
    }
}

