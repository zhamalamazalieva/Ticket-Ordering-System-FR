import {
    USER_SUCCESS,
    USER_LOADING,
    USER_FAIL,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERROR
} from '../types/authTypes';


const initialState = {
    accessToken: localStorage.getItem('access_token_pansion'),
    refreshToken: localStorage.getItem('refresh_token_pansion'),
    isAuthenticated: false,
    user: null,
    error:null,
    isUserLoading: true,
    isLoginLoading: false,

}

export default function authReducer( state = initialState, action ){
    switch (action.type){
        
        case USER_LOADING:
            return{
                ...state,
                error: null,
                isUserLoading: true,
                isAuthenticated: true

            };


        case LOGIN_LOADING:
            return{
                ...state,
                error: null,
                isLoginLoading: true
            };


        case USER_SUCCESS:
            localStorage.setItem('access_token_pansion', action.payload.accessToken)
            return{
                ...state,
                isAuthenticated:true,
                user: action.payload.user,
                accessToken:action.payload.accessToken,
                isUserLoading: false,
                error:null
            }


        case LOGIN_SUCCESS:
            localStorage.setItem('access_token_pansion', action.payload.accessToken)
            localStorage.setItem('refresh_token_pansion', action.payload.refreshToken)
            return{
                ...state,
                user:action.payload.user,
                isAuthenticated:true,
                isLoginLoading: false, 
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                error:null
            }


        case USER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access_token_pansion')
            localStorage.removeItem('refresh_token_pansion')
            return{
                ...state,
                accessToken:null,
                refreshToken:null,
                user:null,
                isAuthenticated: false,
                isLoginLoading: false,
                isUserLoading: false,
                error: action.payload || null
            };


        case CLEAR_ERROR:
            return {
                ...state,
                error:null,
            };

        default: 
            return {...state}
    }
}