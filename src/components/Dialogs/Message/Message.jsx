import style from "./../Dialogs.module.scss";
import cn from 'classnames';

const Message = ({id, isOwner, message}) => {
    return (
        <div className={cn({[style.message]: true, [style.ownMessage]: isOwner, [style.notOwnMessage]: !isOwner})}>
            <span>{message}</span>
        </div>
    )
}

export default Message;
