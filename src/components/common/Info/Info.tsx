import Icon from "../Icon/Icon";
import styles from "./Info.module.scss";
import cn from "classnames";
import { FC } from "react";

const Info: FC<{text: string}> = ({text}) => {

    return (
        <div className={cn(styles.container, "info")}>
            <Icon name={"error_info"}/>
            <span>{text}</span>
        </div>
    )
}

export default Info;