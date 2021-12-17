import Icon from "../Icon/Icon";
import styles from "./Info.module.scss";
import cn from "classnames";

const Info = ({text}) => {

    return (
        <div className={cn(styles.container, "info")}>
            <Icon name={"error_info"}/>
            <span>{text}</span>
        </div>
    )
}

export default Info;