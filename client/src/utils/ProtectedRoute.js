import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    

    const isAuthenticated = useSelector(store => store.LoginReducer.isAuthenticated);
    
    return (
        <Route
            {...rest}
            render={props => {
                if (isAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    )

}