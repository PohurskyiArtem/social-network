import React from 'react';
import styles from'./Post.module.scss';

const Post = props => {
    return (
        <li className={styles.post} id={props.id}>
            <img className={styles.avatar} src={props.imgUrl} alt="avatar" />
            <p className={styles.message}>{props.message}</p>
        </li>
    )
}

export default Post;