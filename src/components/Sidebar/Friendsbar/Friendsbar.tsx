import React, { FC } from 'react';
import styles from "./Friendsbar.module.scss";
import Friend from "./Friend/Friend";
import { FriendType } from '../../../redux/types';

type PropsType = {
    friendsList: Array<FriendType>
}

const Friendsbar:FC<PropsType> = ({friendsList}) => {
    return (
       <div className={styles.friendsbar}>
           <h3>Friends</h3>
           <ul className={styles.friends_list}>
               {
                   friendsList.map((friend:FriendType) => <Friend name={friend.name} key={friend.id}/>)
               }
           </ul>
       </div>
    )
}

export default Friendsbar;