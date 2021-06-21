import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { appReducers } from  './reducers/Index';
import thunk from 'redux-thunk';


const refreshAuthTokenMiddleware = store => next => action => {

    
    console.info("fuera de la validación");


    //Si el tipo de acción es una funcion
    if (typeof action === 'function') {       

        const { dispatch } = store;

        
        const apiAuthenticate = store.getState().LoginReducer.apiAuthenticate

        

        //Si el usuario esta logueado
        if (apiAuthenticate && apiAuthenticate.access_token) {

             
            console.info("Entro a la validación", apiAuthenticate);

            // //Calculamos las fechas para verificar si el token ya ha expirado
            // let utcDate = apiAuthenticate.issuedUtc
            // let dateInit = new Date(utcDate)
            // dateInit.setSeconds(dateInit.getUTCSeconds() + apiAuthenticate.expires_in)
            // let utcDateString = new Date(new Date().toUTCString()).toISOString()
            // let dateVigency = new Date(utcDateString)

            // //Si el token ya expiró => pedimos otro token
            // if (dateVigency > dateInit) {            

            //     dispatch({ type: ACTION_TYPES.GET_USER_REFRESH_TOKEN_REQUEST })

            //     return LoginServices.Login().getRefreshToken({
            //         RefreshToken: apiAuthenticate.refresh_token
            //     }).then(
            //         response => {
            //             dispatch({
            //                 type: ACTION_TYPES.GET_USER_REFRESH_TOKEN_SUCCESS,
            //                 payload: response.data
            //             })
            //             next(action)
            //         }                    
            //     ).catch(
            //         (error) => dispatch({ type: ACTION_TYPES.GET_USER_REFRESH_TOKEN_FAILURE, payload: error })
            //     )
            // }            
        }
    }

    return next(action);
};


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['LoginReducer'] 
}

const persistedReducer = persistReducer(persistConfig, appReducers);


export const store = createStore(
    persistedReducer,
    compose(        
        composeWithDevTools(
            applyMiddleware(refreshAuthTokenMiddleware, thunk),            
        )
    )
);

export const persistor = persistStore(store);


