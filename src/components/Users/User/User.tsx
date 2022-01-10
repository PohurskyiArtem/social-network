import styles from "./User.module.scss";
import Icon from "../../common/Icon/Icon";
import defaultAvatar from "../../../assets/images/defaultAvatar.png"
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { UserType } from "../../../redux/types";
import { FC } from "react";

type PropsType = {
    userState: UserType
    isFollowing: Array<number>

    follow: (id: number) => void
    unFollow: (id: number) => void
}

const User:FC<PropsType> = ({userState, isFollowing, follow, unFollow}) => {
    let {name, id, followed, status, photos} = userState;

    return (
        <li className={styles.user}>
            <div className={styles.userLeft}>
                <img src={photos.small ?? defaultAvatar} alt="avatar" />
                {followed ? <button disabled={isFollowing.some(userId => userId === id )} className={cn(styles.followBtn, styles.followed)} onClick={() => unFollow(id)}> <Icon name="unfollow"/>Unfollow</button>
                          : <button disabled={isFollowing.some(userId => userId === id )} className={cn(styles.followBtn, styles.unfollowed)} onClick={() => follow(id)}> <Icon name="follow"/>Follow</button>}
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