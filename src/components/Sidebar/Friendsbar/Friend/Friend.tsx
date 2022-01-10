import React, { FC } from 'react';
import styles from './Friend.module.scss';
import defaultAvatar from "../../../../assets/images/defaultAvatar.png"

type PropsType = {
    name: string
}

const Friend:FC<PropsType> = ({name}) => {
    return (
        <li className={styles.friend}>
            <a href="/profile" className={styles.friendLink}>
                <img src={defaultAvatar} alt="avatar" className={styles.avatar} />
                <span className={styles.name}>{name}</span>
            </a>
        </li>
    )
}

export default Friend;