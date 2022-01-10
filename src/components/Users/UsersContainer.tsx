import { FC, useEffect, useState } from "react";
import Users from "./Users";
import Loader from "../common/Loader/Loader";
import { connect } from 'react-redux';
import { follow, unFollow, setCurrentPage, requestUsers } from './../../redux/users-reducer';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getFollowingInProgress } from "../../redux/users-selectors";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { CloseSidebar } from "../../hoc/CloseSidebar";
import { UserType } from "../../redux/types";
import { AppStateType } from "../../redux/store";

type MapStatePropsType = {
    currentPage: number, 
    pageSize: number, 
    users: Array<UserType>, 
    totalUsersCount: number
    isFollowing: Array<number>
}

type MapDispatchPropsType = {
    setCurrentPage: (pageNumber: number) => void,
    requestUsers: (currentPage: number, pageSize: number) => any
    follow: (id: number) => void
    unFollow: (id: number) => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const UsersContainer: FC<PropsType> = ({currentPage, setCurrentPage, pageSize, users, requestUsers, ...props}) => {

    const [isFetching, toggleIsFetching] = useState<boolean>(false);

    useEffect(() => {
        if(users.length === 0) {
            toggleIsFetching(true);
            requestUsers(currentPage, pageSize)
                .then(() => toggleIsFetching(false));
        }
    }, [currentPage, pageSize, users, toggleIsFetching, requestUsers])

    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        requestUsers(pageNumber, pageSize)
    }

    return isFetching ? <Loader /> : 
            <Users 
                onPageChanged={onPageChanged} 
                users={users} 
                currentPage={currentPage}
                pageSize={pageSize}
                {...props}
            />

}

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFollowing: getFollowingInProgress(state)
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        follow,
        unFollow,
        setCurrentPage,
        requestUsers
        }),
    WithAuthRedirect,
    CloseSidebar
)(UsersContainer)