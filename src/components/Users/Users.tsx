import styles from "./Users.module.scss";
import Pagination from "../common/Pagination/Pagination";
import User from "./User/User";
import { UserType } from "../../redux/types";
import { FC } from "react";

type PropsType = {
    users: Array<UserType>, 
    totalUsersCount: number, 
    pageSize: number, 
    currentPage: number, 
    onPageChanged: (pageNumber: number) => void, 
    follow: (id: number) => void
    unFollow: (id: number) => void
    isFollowing: Array<number>
}

const Users: FC<PropsType> = ({ users, totalUsersCount, pageSize, currentPage, onPageChanged, follow, unFollow, isFollowing }) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
        let i, pages = [];
        for(i = 1; i <= pagesCount; i += 1) {
            pages.push(i);
        }

    return (
        <section className={styles.users}>
            <Pagination currentPage={currentPage} onPageChanged={onPageChanged} pagesNumbers={pages}/>
            <ul className={styles.userList}>
                {users.map(user => {                                                
                    return (
                            <User userState={user} key={user.id} follow={follow} unFollow={unFollow} isFollowing={isFollowing}/>
                            )
                })}
            </ul>
            {currentPage !== pages.length && (
            <div className={styles.showMore}>
                <button onClick={() => {
                    onPageChanged(currentPage + 1)
                    window.scrollTo(0, 0)
                    }}>Show more...</button>
            </div>
            )}
        </section>
    )
}

export default Users;