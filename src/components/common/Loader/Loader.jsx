import styles from "./Loader.module.scss";

const Loader = props => {

    return (
        <div className={styles.container}>
            <div className={styles.lds_facebook}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader;