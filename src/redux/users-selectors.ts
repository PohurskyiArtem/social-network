import { createSelector } from 'reselect';
import { AppStateType } from './store';

const getUsersSelector = (state: AppStateType) => state.usersPage.users;
export const getUsers = createSelector(getUsersSelector, (users) => users.filter(() => true))

export const getPageSize = (state: AppStateType) => state.usersPage.pageSize;
export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount;
export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage;
export const getFollowingInProgress = (state: AppStateType) => state.usersPage.followingInProgress;
