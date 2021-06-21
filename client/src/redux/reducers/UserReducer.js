import {ACTION_TYPES } from  '../constants/UserConst';
import { message } from 'antd';

const initialState =  {

  apiAuthenticate: {},
  userInfo: {},
  
  isAuthenticated: false,
  isLoading: false,
}

export const LoginReducer = (state = initialState,action ) => {

  switch (action.type) {

    // Login
    case ACTION_TYPES.GET_USER_TOKEN_REQUEST:
        return {
            ...state,
            isLoading: true,
            isAuthenticated: initialState.isAuthenticated
    }
    case ACTION_TYPES.GET_USER_TOKEN_SUCCESS:
    return {
            ...state,
            apiAuthenticate: action.payload,
            isAuthenticated: true,
            isLoading: false,
            
    }
    case ACTION_TYPES.GET_USER_TOKEN_FAILURE:
        message.error("Datos incorrectos")
        return {
            ...state,
            apiAuthenticate: initialState.apiAuthenticate,
            isAuthenticated: initialState.isAuthenticated,
            isLoading: false
    }


    // Get User Profile
    case ACTION_TYPES.GET_USER_PROFILE_REQUEST:
        return {
            ...state,
            isLoading: true
    }
    case ACTION_TYPES.GET_USER_PROFILE_SUCCESS:
        return {
            ...state,
            userInfo: action.payload,
            isLoading: false
    }
    case ACTION_TYPES.GET_USER_PROFILE_FAILURE:
        return {
            ...state,
            isLoading: false
    }
    
    // RefreshToken 
    case ACTION_TYPES.GET_REFRESH_TOKEN_SUCCESS:
        return {
            ...state,
            apiAuthenticate: action.payload,
            isLoading: false
    }
    case ACTION_TYPES.GET_REFRESH_TOKEN_FAILURE:
      return {
          ...state,
          isLoading: false
   }

   // Logout User
   case ACTION_TYPES.LOGOUT_USER:
        return {
            ...state,
            apiAuthenticate: initialState.apiAuthenticate,
            userInfo: initialState.userInfo,
            isLoading: initialState.isLoading,
            isAuthenticated: initialState.isAuthenticated
    }
    default: 
       return state;
   
  }
}