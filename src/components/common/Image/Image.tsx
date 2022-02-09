import cn from "classnames";
import { FC } from "react";
import def from "../../../assets/images/placeholder-image.png"
import styles from "./Image.module.scss";

type PropsType = {
    src: string,
    alt: string,
    className: string
}

const Image: FC<PropsType> = ({src, alt, className}) => {
    const classes = cn(className);

    return (
        <img 
            src={src || def}
            alt={alt || "image"}
            className={classes || styles.defaultImage}
        />
    )
}

export default Image;