import styles from "./ProfileInfo.module.scss";
import avatar from '../../../assets/images/defaultAvatar.png';
import ProfileStatus from "./ProfileStatus";
import { NavLink } from "react-router-dom";
import Icon from "../../common/Icon/Icon";
import cn from "classnames";
import Contacts from "./Contacts/Contacts";
import { ProfileType } from "../../../redux/types";
import { ChangeEvent, FC } from "react";
import { removeNullUndefined } from "../../../utils/functions/removeNullProps";

type PropsType = {
    profile: ProfileType,
    isOwner: boolean

    uploadPhoto: (photo: File) => void,
    updateStatus: (status: string) => Promise<any>
}

const ProfileInfo: FC<PropsType & {}> = ({profile: {photos, fullName, lookingForAJob, lookingForAJobDescription, aboutMe, contacts, status}, isOwner, uploadPhoto, updateStatus }) => {
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            uploadPhoto(e.target.files[0]);
        }
    }

    const validContacts = removeNullUndefined(contacts);

    return (
        <section className={styles.profile}>
            <div className={styles.userInfo}>
                <div className={styles.avatar}>
                    <img src={photos.large ?? avatar} alt="avatar" />
                    {isOwner && (
                        <label className={styles.changeAvatar}>
                            <span>Update photo</span>
                            <Icon name={"upload"}/>
                            <input type="file" onChange={onMainPhotoSelected}/>
                        </label>
                    )}
                </div>
                <div className={styles.description}>

                    {isOwner && <NavLink to="/settings" className={styles.settingsLink}><Icon name="edit"/>Edit profile</NavLink>}

                    <h3 className={styles.name}>{fullName}</h3>

                    {!status && !isOwner ? null : <ProfileStatus status={status} updateStatus={updateStatus} isOwner={isOwner}/>}

                    <div className={cn(styles.lookingWork, {[styles.lookingWork_true]: lookingForAJob, [styles.lookingWork_false]: !lookingForAJob })}>
                        {lookingForAJob ? (
                                <>
                                    <b>Looking for a job...</b>
                                    <br/><br/>
                                    <span>My professional skills:</span>
                                    <p>{lookingForAJobDescription}</p>
                                </>
                            )   
                            : (
                                <span>Not looking for a job</span>
                            )
                        }
                    </div>
                </div>
                {aboutMe && (
                    <div className={styles.about}>
                        <span>About me:</span>
                        <p>{aboutMe}</p>
                    </div>
                )}
            </div>
            {Object.keys(validContacts).length > 0 && <Contacts contacts={validContacts}/>}
        </section>
    )
}

export default ProfileInfo;