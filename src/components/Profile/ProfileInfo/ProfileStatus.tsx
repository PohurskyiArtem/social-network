import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from "./ProfileInfo.module.scss";

type PropsType = {
    status: string | null,
    isOwner: boolean,
    updateStatus: (status: string) => Promise<any>
}

const ProfileStatusWithHooks: FC<PropsType> = ({status, isOwner, updateStatus}) => {
   
    let [editMode, setEditMode] = useState<boolean>(false);
    let [localStatus, setLocalStatus] = useState<string>(status!);

    const activateEditMode = () => {
        setEditMode(true); 
        },

        deactivateEditMode = () => {
            setEditMode(false);
            if(status !== localStatus) {
                updateStatus(localStatus).catch(() => setLocalStatus(status!));
            }
        },

        onStatusChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setLocalStatus(e.target.value);
        };

    useEffect( () => {
        setLocalStatus(status!);
    }, [status] )


    return (
        <div>
            {!editMode ?
                (
                    <div className={styles.statusContainer}>
                        <span className={!localStatus ? styles.noStatus : undefined } onDoubleClick={isOwner ? activateEditMode : undefined}>{ localStatus || "Set status... (double click here)" }</span>
                    </div>
                ) : 
                (
                    
                    <div>
                        <textarea className={styles.newStatusInput} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={localStatus} />
                    </div>  
                )
            }
        </div>
    )
}

export default ProfileStatusWithHooks;