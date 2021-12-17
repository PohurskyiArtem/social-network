import { useEffect, useState } from 'react';
import styles from "./ProfileInfo.module.scss";

const ProfileStatusWithHooks = ({status, isOwner, updateStatus}) => {
   
    let [editMode, setEditMode] = useState(false);
    let [localStatus, setLocalStatus] = useState(status);

    const activateEditMode = () => {
        setEditMode(true); 
        },

        deactivateEditMode = () => {
            setEditMode(false);
            updateStatus(localStatus).catch(() => setLocalStatus(status));
        },

        onStatusChange = (e) => {
            setLocalStatus(e.target.value);
        };

    useEffect( () => {
        setLocalStatus(status);
    }, [status] )


    return (
        <div>
            {/* <ToastContainer /> */}
            {!editMode ?
                (
                    <div className={styles.statusContainer}>
                        <span className={!localStatus ? styles.noStatus : null } onDoubleClick={isOwner ? activateEditMode : null}>{ localStatus || "Set status... (double click here)" }</span>
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