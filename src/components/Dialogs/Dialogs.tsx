import style from "./Dialogs.module.scss";
import Chat from "./Message/Chat";
import Dialog from "./Dialog/Dialog";
import Image from "../common/Image/Image";
import cn from "classnames";
import Icon from "../common/Icon/Icon";

import ChatImg from "../../assets/images/messages.png";
import { DialogsMapStatePropsType } from "./DialogsContainer";
import { Dispatch, FC, SetStateAction } from "react";

type PropsType = DialogsMapStatePropsType & MobilePropsType & {
    selectedDialog: null | number,
    isDialogsListOpen: boolean,
    addMessage: (data: {newMessageBody: string}) => void,
    
}

type MobilePropsType = {
    selectedDialogName: string | boolean
    toggleDialogsList: Dispatch<SetStateAction<boolean>>
}

const MobileScreenHeader: FC<MobilePropsType> = ({selectedDialogName, toggleDialogsList}) => {
    return (
        <div className={style.mobileHeader}>
            <button onClick={() => toggleDialogsList(true)}><Icon name="left-arrow"/></button>
            <span>{selectedDialogName || null}</span>
        </div>
    )
}

const Dialogs: FC<PropsType> = ({addMessage, dialogs, messages, selectedDialog, ownerId, isDialogsListOpen, ...props}) => {
    return (
        <section className={style.dialogs}>
            <ul className={cn({[style.dialogs__list]: true, [style.active]: isDialogsListOpen})}>
                {dialogs.map( d => <Dialog name={d.name} id={d.id} key={d.id}/>)}
            </ul>     
            { selectedDialog 
                ? (
                    <>
                        <MobileScreenHeader {...props}/>
                        <Chat addMessage={addMessage} messages={messages} ownerId={ownerId}/>
                    </>
                )
                :  (
                    <>
                        <MobileScreenHeader {...props}/>
                        <div className={style.unselectedDialog}>
                        <p  onClick={() => props.toggleDialogsList(true)}>Select a dialogue to start a conversation</p>
                        <Image src={ChatImg} alt={"Chat image"} className={style.chatImage}/>
                    </div>
                    </>
                )
            }
        </section>
    )
}

export default Dialogs;
