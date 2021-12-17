import styles from "./Page404.module.scss";
import { NavLink } from "react-router-dom";

const Page404 = props => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <b className={styles.b}>404</b>
                <br/>
                <span>Page not found</span>
                <br/>
                <br/>
                <br/>
                <NavLink to={"/profile"}>Go to Profile page...</NavLink>
            </div>
        </div>
    )
}

export default Page404