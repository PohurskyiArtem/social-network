import { connect } from 'react-redux';
import Header from "./Header";
import { logout } from "../../redux/auth-reducer";
import { toggleSidebar } from  "../../redux/sidebar-reducer"; 
import { FC, useEffect, useState } from 'react';
import { AppStateType } from '../../redux/store';

export type HeaderPropsType = ReturnType<typeof mapStateToProps> & {
    logout: () => void,
    toggleSidebar: (isOpen: boolean) => void
}

const HeaderContainer:FC<HeaderPropsType> = props => {
    const [isVisible, setVisible] = useState(false);
    const [scrollPos, setScrollPos] = useState(window.scrollY);

    useEffect(() => {
        const onScroll = () => {
            if(window.scrollY > scrollPos) {
                setVisible(true);
                setScrollPos(window.scrollY);
            } else if(window.scrollY < scrollPos) {
                setVisible(false);
                setScrollPos(window.scrollY);
            }
        }

        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [scrollPos])

    return (
        <Header {...props} isVisible={isVisible}/>
    )
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        userName: state.auth.login,
        isOpen: state.sidebar.isSidebarOpen
    }
}

export default connect(mapStateToProps, { logout, toggleSidebar })(HeaderContainer)