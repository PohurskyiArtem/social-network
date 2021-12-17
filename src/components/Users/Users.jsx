import styles from "./Users.module.scss";
import Pagination from "../common/Pagination/Pagination";
import User from "./User/User";

const Users = ({ users, totalUsersCount, pageSize, currentPage, onPageChanged, follow, unFollow, isFollowing }) => {
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