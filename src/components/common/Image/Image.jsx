import cn from "classnames";
import def from "../../../assets/images/placeholder-image.png"
import styles from "./Image.module.scss";

const Image = ({src, alt, className}) => {
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