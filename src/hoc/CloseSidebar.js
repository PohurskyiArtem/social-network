import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleSidebar } from "../redux/sidebar-reducer.ts";

export const CloseSidebar = Component => {
    
    const CloseSidebarComponent = ({toggleSidebar, ...props}) => {
        useEffect(() => {
            toggleSidebar(false);
        }, [toggleSidebar])

        return <Component {...props} />
    }

    let ConnectedCloseSidebarComponent = connect(() => ({}), {toggleSidebar}) (CloseSidebarComponent)

    return ConnectedCloseSidebarComponent;
}