import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { saveProfile } from "../../redux/profile-reducer";
import styles from "./Settings.module.scss";
import Loader from "../common/Loader/Loader";
import ProfileEditor from "./ProfileEditor";
import { CloseSidebar } from "../../hoc/CloseSidebar";
import { useEffect, useState } from "react";

const Settings = ({profile, saveProfile}) => {   
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

const mapStateToProps = state => ({
    userId: state.auth.userId,
    profile: state.profilePage.ownerProfile
})

export default compose(
    connect(mapStateToProps, {saveProfile}),
    WithAuthRedirect,
    CloseSidebar
)(Settings)