import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { saveProfile } from "../../redux/profile-reducer";
import styles from "./Settings.module.scss";
import Loader from "../common/Loader/Loader";
import ProfileEditor from "./ProfileEditor";
import { CloseSidebar } from "../../hoc/CloseSidebar";
import { FC, useEffect, useState } from "react";
import { ProfileType } from "../../redux/types";
import { AppStateType } from "../../redux/store";

type PropsType = {
    profile: ProfileType,
    saveProfile: () => void
}

const Settings:FC<PropsType> = ({profile, saveProfile}) => {   
    const [isProfileLoaded, setProfileLoaded] = useState(false);
    
    useEffect(() => {
        if(profile) {
            setProfileLoaded(profile.hasOwnProperty("aboutMe"));
        }
    }, [profile])

    return (
        !isProfileLoaded 
        ? <Loader />
        : (
            <section className={styles.settings}>
                <ProfileEditor profile={profile} saveProfile={saveProfile}/>
            </section>
        )
        
    )
}

const mapStateToProps = (state:AppStateType) => ({
    userId: state.auth.userId,
    profile: state.profilePage.ownerProfile
})

export default compose(
    connect(mapStateToProps, {saveProfile}),
    WithAuthRedirect,
    CloseSidebar
)(Settings)