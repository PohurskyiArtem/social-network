import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import Icon from "../common/Icon/Icon";
import MenuButton from '../common/MenuButton/MenuButton';
import cn from "classnames";

const Header = ({isAuth, userName, logout, isOpen, toggleSidebar, isVisible, setVisible}) => {
    return (
        <header className={cn({[styles.header]: true, [styles.hide]: isVisible})}>
            <MenuButton isOpen={isOpen} onClickFunction={toggleSidebar} />
            <h1 className={styles.title}><span>S</span>ocial N<span></span>etwor<span>k</span></h1>
            <h1 className={styles.shortTitle}><span>S</span>N</h1>

            <div className={styles.loginBlock}>
                {isAuth ? 
                (
                    <div className={styles.loginPanel}>
                        <NavLink to={'/profile'} className={styles.userInfo}>
                            <span className={styles.userName}>{userName}</span>
                        </NavLink>
                        <span style={{margin: "0 5px"}}>|</span>
                        <button onClick={logout}><Icon name="logout"/><span>Logout</span></button>
                    </div>
                ) : <NavLink to={'/login'} className={styles.loginLink}><Icon name="login" /><span>Login</span></NavLink>}          
            </div>
        </header>
    )
}

export default Header;