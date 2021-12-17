import React from 'react';
import styles from "./Friendsbar.module.scss";
import Friend from "./Friend/Friend";

const Friendsbar = props => {
    return (
       <div className={styles.friendsbar}>
           <h3>Friends</h3>
           <ul className={styles.friends_list}>
               {
                   props.friendsList.map(friend => <Friend id={friend.id} name={friend.name} key={friend.id}/>)
               }
           </ul>
       </div>
    )
}

export default Friendsbar;