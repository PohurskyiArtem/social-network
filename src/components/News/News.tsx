import styles from "./News.module.scss";
import Info from "../common/Info/Info";
import {CloseSidebar} from  "../../hoc/CloseSidebar";

const News = () => {
    return (
        <>
        <h2 className={styles.news}>News</h2>
        <Info text={"This is a test component. Current version of API not supporting this functional yet"}/>
        </>
    )
}

export default CloseSidebar(News);