import React, { FC } from 'react';
import styles from './Profile.module.scss';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from './MyPost/MyPosts';
import { ProfileType } from '../../redux/types';
import { ProfileMDPType } from './ProfileContainer';

type PropsType = {
    profile: ProfileType,
    isOwner: boolean
} & Pick<ProfileMDPType, 'uploadPhoto' | 'updateStatus'>

const Profile: FC<PropsType> = ({profile, isOwner, ...props }) => {
    return (
        <section className={styles.profile}>
            <ProfileInfo isOwner={isOwner} profile={profile} {...props}/>
            {isOwner && <MyPosts profile={profile}/>}
        </section>
    )
}

export default Profile;