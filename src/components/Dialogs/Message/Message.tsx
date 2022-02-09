import style from "./../Dialogs.module.scss";
import cn from 'classnames';
import { FC } from "react";

type PropsType = {
    isOwner: boolean,
    message: string
}

const Message: FC<PropsType> = ({isOwner, message}) => {
    return (
        <div className={cn({[style.message]: true, [style.ownMessage]: isOwner, [style.notOwnMessage]: !isOwner})}>
            <span>{message}</span>
        </div>
    )
}

export default Message;
