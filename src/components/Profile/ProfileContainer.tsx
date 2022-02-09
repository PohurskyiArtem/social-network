import { ComponentType, FC, useEffect } from 'react';
import { connect } from 'react-redux';
import Profile from "./Profile";
import Loader from "../common/Loader/Loader";
import { getUserProfile, getUserStatus, updateStatus, uploadPhoto, actions  } from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { CloseSidebar } from '../../hoc/CloseSidebar';
import { AppStateType } from '../../redux/store';
import { ProfileType } from '../../redux/types';

type MapStatePropsType = ReturnType<typeof mapStateToProps>

export type ProfileMDPType = {
    getUserProfile: (id: number) => void,
    getUserStatus: (userId: number) => void,
    setUserProfile: (profile: ProfileType | null) => void,
    uploadPhoto: (photo: File) => void,
    updateStatus: (status: string) => Promise<any>
}

type PathParamsType = {
    userID: string
}

const ProfileContainer: FC<MapStatePropsType & ProfileMDPType & RouteComponentProps<PathParamsType>> = ({match, getUserProfile, getUserStatus, setUserProfile, isProfileLoading, profile, ownerProfile, ...props}) => {
    
    const userID = match.params.userID;

    useEffect( () => { 
        if(userID){
            getUserProfile(+userID);
            getUserStatus(+userID);
        }
        return () => setUserProfile(null)
    }, [userID, getUserProfile, getUserStatus, setUserProfile])

    return isProfileLoading
        ? <Loader /> 
        : <Profile 
            {...props}
            profile={profile ? profile : ownerProfile as ProfileType}
            isOwner={!match.params.userID}
            />
}

const mapStateToProps = (state: AppStateType) => ({
        profile: state.profilePage.profile,
        ownerProfile: state.profilePage.ownerProfile,
        isProfileLoading: state.profilePage.profileIsLoading,
        userId: state.auth.userId
})

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateStatus, uploadPhoto, setUserProfile: actions.setUserProfile }),
    withRouter,
    WithAuthRedirect,
    CloseSidebar
)(ProfileContainer) as ComponentType;