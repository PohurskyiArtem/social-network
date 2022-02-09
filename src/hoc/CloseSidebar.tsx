import { ComponentType, FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { toggleSidebar } from "../redux/sidebar-reducer";
import { AppStateType } from '../redux/store';

type MDTPType = {
    toggleSidebar: (isOpen: boolean) => void
}

export function CloseSidebar<WCP> (Component: ComponentType<WCP>) {
    
    const CloseSidebarComponent: FC<{} & MDTPType> = ({toggleSidebar, ...props}) => {
        useEffect(() => {
            toggleSidebar(false);
        }, [toggleSidebar])

        return <Component {...props as WCP} />
    }

    let ConnectedCloseSidebarComponent = connect<{}, MDTPType, {}, AppStateType >(() => ({}), {toggleSidebar}) (CloseSidebarComponent)

    return ConnectedCloseSidebarComponent;
}