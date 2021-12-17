import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router"

export const WithAuthRedirect = Component => {
    
    const RedirectComponent = ({isAuth, ...props}) => {
            if(!isAuth) return <Redirect to={'/login'} />
            return <Component {...props} />
    }

    let ConnectedRedirectAuthComponent = connect(state => ({isAuth: state.auth.isAuth})) (RedirectComponent)

    return ConnectedRedirectAuthComponent;
}