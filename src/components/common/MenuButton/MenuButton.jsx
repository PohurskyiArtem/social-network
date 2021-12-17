import style from "./MenuButton.module.scss";
import cn from "classnames";

const MenuButton = ({onClickFunction, isOpen}) => {
    return (
        <div onClick={onClickFunction} className={style.menu}>
            <span className={cn({[style.menuBtn]: true, [style.isOpen]: isOpen})}>
                <span className={style.menuBurger}></span>
                <span className={style.menuExit}></span>
            </span>
        </div>
    )
}

export default MenuButton;