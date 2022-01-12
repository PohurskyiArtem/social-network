import React from 'react';
import styles from './Profile.module.scss';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from './MyPost/MyPosts';

const Profile = ({profile, isOwner, ...props }) => {
    return (
        <section className={styles.profile}>
            <ProfileInfo isOwner={isOwner} profile={profile} {...props}/>
            {isOwner && <MyPosts profile={profile}/>}
        </section>
    )
}

export default Profile;