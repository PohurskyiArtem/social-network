import styles from "./User.module.scss";
import Icon from "./../Icon/Icon";
import defaultAvatar from "../../../assets/images/defaultAvatar.png"
import { NavLink } from "react-router-dom";
import cn from "classnames";

const User = props => {
    let {name, id, followed, status, photos} = props.userState;

    return (
        <li className={styles.user}>
            <div className={styles.userLeft}>
                <img src={photos.small ?? defaultAvatar} alt="avatar" />
                {followed ? <button disabled={props.isFollowing.some(userId => userId === id )} className={cn(styles.followBtn, styles.followed)} onClick={() => props.unFollow(id)}> <Icon name="unfollow"/>Unfollow</button>
                          : <button disabled={props.isFollowing.some(userId => userId === id )} className={cn(styles.followBtn, styles.unfollowed)} onClick={() => props.follow(id)}> <Icon name="follow"/>Follow</button>}
            </div>
            <div className={styles.userRight}>
                <h4 className={styles.userName}>{name}</h4>
                {status && <p className={styles.userStatus}>{status}</p> }
            </div>
            <NavLink to={'/profile/' + id}/>
        </li>
    )
}

export default User;