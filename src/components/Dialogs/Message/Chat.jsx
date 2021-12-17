import style from "../Dialogs.module.scss";
import Message from "./Message";
import { useForm } from "react-hook-form";
import cn from "classnames";
import { Textarea } from "../../common/formsControls/FormsControls";
import { maxLenghtCreator } from "../../../utils/validators/index";
import Image from "../../common/Image/Image";

import ChatImg from "../../../assets/images/messages.png";
import { useRef, useEffect} from "react";

const AddMessageForm = ({addMessage}) => {
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
    const onSubmit = (data) => {
        addMessage(data);
        reset();
    }
    return (
        <form className={style.newMessage} onSubmit={handleSubmit(onSubmit)}>
            <Textarea
                register={register}
                errors={errors}
                required
                maxLength={maxLenghtCreator(750)}
                placeholder="Message text..."
                label={"newMessageBody"}
                onBlur={() => clearErrors()} 
                onKeyPress={event => event.key === 'Enter' && handleSubmit(onSubmit)()}
            />
            <button className={cn(style.newMessage__add, "submit_btn")}>Send</button>
        </form>
    )
}

const Chat = ({addMessage, messages, ownerId}) => {
    const scrollRef = useRef(null); 

    useEffect(() => {
        if(scrollRef.current) {
            const executeScroll = () => {
                scrollRef.current.scrollIntoView()
            }
    
            executeScroll();
        }
    })

    return (
        <div className={style.chat}>
            {
                messages.length > 0 ? 
                (
                    <>
                        <div className={style.chat__messages}>
                                {messages.map( m => <Message message={m.messageText} id={m.messageId} isOwner={ownerId === m.userId} key={m.messageId + "m"}/>)}
                                <div ref={scrollRef}></div>
                        </div>
                    </>
                ) : 
                (
                    <div className={style.unselectedDialog}>
                        <p>No messages yet...</p>
                        <Image src={ChatImg} alt={"Chat image"} className={style.chatImage}/>
                    </div>
                )
            }
            <AddMessageForm addMessage={addMessage}/>
        </div>
    )
}

export default Chat;
