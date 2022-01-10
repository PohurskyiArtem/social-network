import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

import Icon from '../../common/Icon/Icon';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <ul className="list">
                <li className={styles.item}>
                    <Icon name="profile" />
                    <NavLink to="/profile" className={styles.link} activeClassName={styles.current}>Profile</NavLink>
                </li>
                <li className={styles.item}>
                    <Icon name="messages" />
                    <NavLink to="/dialogs" className={styles.link} activeClassName={styles.current}>Messages</NavLink>
                </li>
                <li className={styles.item}>
                    <Icon name="news" />
                    <NavLink to="/news" className={styles.link} activeClassName={styles.current}>News</NavLink>
                </li>
                <li className={styles.item}>
                    <Icon name="users" />
                    <NavLink to="/users" className={styles.link} activeClassName={styles.current}>Users</NavLink>
                </li>
                <li className={styles.item}>
                    <Icon name="settings" />
                    <NavLink to="settings" className={styles.link} activeClassName={styles.current}>Settings</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;