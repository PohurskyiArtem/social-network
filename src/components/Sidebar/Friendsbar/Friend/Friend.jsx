import React from 'react';
import styles from './Friend.module.scss';
import defaultAvatar from "../../../../assets/images/defaultAvatar.png"

const Friend = props => {
    return (
        <li className={styles.friend}>
            <a href="/profile" className={styles.friendLink}>
                <img src={defaultAvatar} alt="avatar" className={styles.avatar} />
                <span className={styles.name}>{props.name}</span>
            </a>
        </li>
    )
}

export default Friend;