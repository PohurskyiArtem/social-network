import { useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from "./Profile";
import Loader from "../common/Loader/Loader";
import { getUserProfile, getUserStatus, updateStatus, uploadPhoto, setUserProfile } from "../../redux/profile-reducer";
import { withRouter } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { CloseSidebar } from '../../hoc/CloseSidebar';

const ProfileContainer = ({match, getUserProfile, getUserStatus, dispatch, setUserProfile, isProfileLoading, profile, ownerProfile, ...props}) => {
    
    const userID = match.params.userID;

    useEffect( () => { 
        if(userID){
            getUserProfile(userID);
            getUserStatus(userID);
        }
        return () => dispatch(setUserProfile(null))
    }, [userID, getUserProfile, getUserStatus, dispatch, setUserProfile])

    return isProfileLoading
        ? <Loader /> 
        : <Profile 
            {...props}
            profile={profile ?? ownerProfile}
            isOwner={!match.params.userID}
            />
}

const mapStateToProps = state => ({
        profile: state.profilePage.profile,
        ownerProfile: state.profilePage.ownerProfile,
        isProfileLoading: state.profilePage.profileIsLoading,
        userId: state.auth.userId
})

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateStatus, uploadPhoto, setUserProfile }),
    withRouter,
    WithAuthRedirect,
    CloseSidebar
)(ProfileContainer);