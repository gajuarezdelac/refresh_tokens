import axios from 'axios';
import  {ACTION_TYPES} from '../constants/UserConst';

export const login = (formValues) => async dispatch => {

    try {
        dispatch({type: ACTION_TYPES.GET_USER_TOKEN_REQUEST})
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data } = await axios.post('/auth/login', formValues,config)
   
        dispatch({
            type: ACTION_TYPES.GET_USER_TOKEN_SUCCESS,
            payload: data
        })

        dispatch(getUserProfile(data.access_token));

      } catch (error) {
          console.log( error.response);
          dispatch({
              type: ACTION_TYPES.GET_USER_TOKEN_FAILURE
          })
      }
}

export const getUserProfile = (token) => async dispatch => {

    try {
        dispatch({type: ACTION_TYPES.GET_USER_PROFILE_REQUEST})
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            }
        }
        const {data } = await axios.get('/auth/user',config)
   
        dispatch({
            type: ACTION_TYPES.GET_USER_PROFILE_SUCCESS,
            payload: data
        })


      } catch (error) {
          dispatch({
              type: ACTION_TYPES.GET_USER_PROFILE_FAILURE,
              payload: error.response.data.message
          })
      }
}

export const refreshToken = (token) => async dispatch => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const {data } = await axios.get('/auth/user',token,config)
   
        dispatch({
            type: ACTION_TYPES.GET_USER_PROFILE_SUCCESS,
            payload: data
        })


      } catch (error) {
          dispatch({
              type: ACTION_TYPES.GET_USER_PROFILE_FAILURE,
              payload: error.response.data.message
          })
      }   
}

export const logoutUser = () => ({
    type: ACTION_TYPES.LOGOUT_USER
})

 