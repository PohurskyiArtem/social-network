import { NavLink } from "react-router-dom";
import avatar from "../../../assets/images/defaultAvatar.png"
import style from "./../Dialogs.module.scss";

const Dialog = (props: {id: number, name: string}) => {
    let path = "/dialogs/" + props.id;

    return (
        <li className={style.dialog}>
            <img src={avatar} alt="avatar" className={style.avatar}/>
            <NavLink to={path} activeClassName={style.active}>{props.name}</NavLink>
        </li>
    )
}


export default Dialog;
