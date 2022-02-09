import { ComponentType, FC } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router"
import { AppStateType } from '../redux/store';

export function WithAuthRedirect<WCP> (WrappedComponent: ComponentType<WCP>) {
    
    const RedirectComponent: FC<{isAuth: boolean} & {}> = ({isAuth, ...props}) => {
        if(!isAuth) return <Redirect to={'/login'} />
        
        return <WrappedComponent {...props as WCP} />
    }

    let ConnectedRedirectAuthComponent = connect<{isAuth: boolean}, {}, WCP, AppStateType>
        (((state: AppStateType) => ({isAuth: state.auth.isAuth})), {})
    (RedirectComponent)

    return ConnectedRedirectAuthComponent;
}

