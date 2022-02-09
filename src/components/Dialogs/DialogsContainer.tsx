import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { useState, useEffect, FC, ComponentType } from 'react';

import Dialogs from "./Dialogs";
import { createMessage } from '../../redux/dialogs-reducer';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import Loader from '../common/Loader/Loader';
import { CloseSidebar } from '../../hoc/CloseSidebar';
import { AppStateType } from '../../redux/store';
import { DialogType, MessageType } from '../../redux/types';

export type DialogsMapStatePropsType = {
    messages: Array<MessageType>,
    dialogs: Array<DialogType>,
    ownerId: number
}

type DialogsMapDispatchPropsType = {
    createMessage: (dialogsId:number, messageText: string) => void
}

type PathParamsType = {
    dialogID: string
}

type PropsType = DialogsMapStatePropsType & DialogsMapDispatchPropsType & RouteComponentProps<PathParamsType>

const DialogsContainer: FC<PropsType> = ({match, messages, createMessage, dialogs, ...props}) => {
    const selectedDialogId = match.params.dialogID || null;

    const [isDialogsListOpen, toggleDialogsList] = useState(false);

    const addMessage = (data: {newMessageBody: string}) => {
        createMessage(+selectedDialogId!, data.newMessageBody);
    }

    const filteredMessages = messages.filter(message => message.dialogsId === +selectedDialogId! );
    const selectedDialog = dialogs.filter(dialog => dialog.id === +selectedDialogId!);

    useEffect( () => {
        toggleDialogsList(false)
    }, [selectedDialogId])
    
    return <Dialogs 
                {...props} 
                dialogs={dialogs} 
                isDialogsListOpen={isDialogsListOpen} 
                toggleDialogsList={toggleDialogsList} 
                addMessage={addMessage} 
                messages={filteredMessages} 
                selectedDialog={+selectedDialogId!} 
                selectedDialogName={selectedDialog.length > 0 && selectedDialog[0].name}
            /> || <Loader />
}


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogsData,
        messages: state.dialogsPage.messagesData,
        ownerId: state.auth.userId
    }
}

export default compose(
    connect(mapStateToProps, { createMessage }),
    withRouter,
    WithAuthRedirect,
    CloseSidebar
)(DialogsContainer) as ComponentType