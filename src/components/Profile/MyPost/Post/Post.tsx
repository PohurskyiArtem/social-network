import React, { FC } from 'react';
import { PostType } from '../../../../redux/types';
import styles from'./Post.module.scss';

const Post:FC<PostType> = ({postText, image}) => {
    return (
        <li className={styles.post}>
            <img className={styles.avatar} src={image} alt="avatar" />
            <p className={styles.message}>{postText}</p>
        </li>
    )
}

export default Post;